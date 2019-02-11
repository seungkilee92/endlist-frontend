import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteToken, fetchJoinedPlaylists, fetchInvites } from '../actions'
import axios from 'axios'

const baseURL = "http://localhost:4000"

class Invites extends Component {
    reload = () => {
        this.props.fetchJoinedPlaylists(this.props.username)
        this.props.fetchInvites(this.props.id)
    }

    acceptInvite = async event => {
        await axios.put(baseURL + '/invite/' + event.currentTarget.dataset.id)
        this.reload()
    }

    declineInvite = async event => {
        await axios.delete(baseURL + '/invite/' + event.currentTarget.dataset.id)
        this.reload()
    }

    render() {
        return (
            <div className="invites">
                <h4>Pending Playlist Invites</h4>
                {this.props.invites && this.props.invites.length === 0 && <p>No invites pending</p>}

                {this.props.invites && this.props.invites.map((invite, i) =>
                    <div key={i}>
                        <Link to={'/playlist/' + invite.playlist.id}>{invite.playlist.title}</Link>
                        <button onClick={this.acceptInvite} data-id={invite.id}>Accept</button>
                        <button onClick={this.declineInvite} data-id={invite.id}>Decline</button>
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    id: state.auth.id,
    username: state.auth.username,
    invites: state.invites.invites
})

const mapDispatchToProps = dispatch => ({
    deleteToken: () => dispatch(deleteToken()),
    fetchJoinedPlaylists: username => dispatch(fetchJoinedPlaylists(username)),
    fetchInvites: id => dispatch(fetchInvites(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Invites)
