import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from "react-redux"
import { Snackbar } from "react-md"
import { 
  fetchToken, 
  fetchOwnedPlaylists, 
  fetchJoinedPlaylists, 
  fetchInvites,
  deleteToken, 
  dismissToast } from "../actions"

import '../assets/css/App.css'
import Authentication from './Authentication'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.loadApplication()
  }

  loadApplication = async () => {
    // Checks for user in localstorage
    await this.props.fetchToken()
    // If the token is invalid, get rid of it
    if (this.props.status === 401)
      this.props.deleteToken()
    else {
      this.props.fetchOwnedPlaylists(this.props.auth.username)
      this.props.fetchJoinedPlaylists(this.props.auth.username)
      this.props.fetchInvites(this.props.auth.id)
    }
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch className="app-container">
            <Route path="/auth" exact component={Authentication} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>

        {/* Snackbars handled and displayed by this component */}
        <Snackbar
          toasts={this.props.toasts}
          autohide={true}
          onDismiss={this.props.dismissToast}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toasts: state.toasts,
  auth: state.auth,
  status: state.auth.status
})

const mapDispatchToProps = dispatch => ({
  fetchToken: () => dispatch(fetchToken(null)),
  fetchOwnedPlaylists: username => dispatch(fetchOwnedPlaylists(username)),
  fetchJoinedPlaylists: username => dispatch(fetchJoinedPlaylists(username)),
  fetchInvites: id => dispatch(fetchInvites(id)),
  deleteToken: () => dispatch(deleteToken()),
  dismissToast: (text, action) => dispatch(dismissToast(text, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
