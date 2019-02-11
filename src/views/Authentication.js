import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import '../assets/css/Authentication.css'
import { LogoLight } from '../assets/icons/brandIcons'

import Login from '../components/authentication/Login'
import Registration from '../components/authentication/Registration'

class Authentication extends Component {
    constructor() {
        super()
        this.state = { login: true }
    }

    changePage = () => {
        this.setState({
            login: !this.state.login
        })
    }

    render() {
        return (
            <div className="authentication">
                <div className="title-bar" />
                <div className="branding-lg">
                    <h2>
                        <LogoLight />Endlist
                    </h2>
                    <h4>A collaborative playlist application.</h4>
                </div>
                {this.state.login ? <Login /> : <Registration />}
                {this.state.login ? (
                    <button onClick={() => this.changePage()}>
                        <p>New user? Register</p>
                    </button>
                ) : (
                        <button onClick={() => this.changePage()}>
                            <p>Already registered? Login</p>
                        </button>
                    )}

                {/* Redirects to the dashboard once we have a token stored */}
                {this.props.username && <Redirect to="/" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.auth.username
})

export default connect(mapStateToProps)(Authentication)