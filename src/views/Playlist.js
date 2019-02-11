import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlaylist, createInvite, addToast } from '../actions'

import socket from "../components/common/Socket"
import SearchBar from '../components/playlists/VideoSearchBar'
import VideoPlayer from '../components/playlists/VideoPlayer'

import '../assets/css/Playlist.css'

class Playlist extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            recipient: "", 
            inRoom: [], 
            videoIndex: 0
        }
        this.props.fetchPlaylist(this.props.match.params.id)
    }

    componentDidMount() {
        this.setPhoenixChannel()
    }

    componentWillUnmount() {
        if (this.state.channel)
            this.state.channel.leave()
    }

    setPhoenixChannel = () => {
        let channel = socket.channel("room:" + this.props.match.params.id, {})
        this.setState({ channel: channel })
    
        channel.join()
            .receive("ok", resp => console.log("joined the room channel", resp))
            .receive("error", reason => console.log("join failed", reason))

        channel.push("user_joined", {user: this.props.username})
            .receive("error", e => console.log(e))

        channel.on("user_joined", resp => {
            this.setState({ inRoom: [] })
            channel.push("in_room", {user: this.props.username})
        })
        channel.on("in_room", resp => this.setState({ inRoom: [ ...this.state.inRoom, resp.user ] }))
        channel.on("user_left", resp => this.setState({ inRoom: this.state.inRoom.filter(el => el !== resp.user) }))

        channel.on("refresh_room", resp => this.props.fetchPlaylist(this.props.match.params.id))
    }

    setNextVideo = () => {
        this.setState({ videoIndex: (this.state.videoIndex + 1) % this.props.playlists.curr.videos.length })
    }

    handleChange = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        const invite = {
            playlist_id: this.props.playlists.curr.id,
            username: this.state.recipient
        }

        this.props.createInvite(invite).then(() => {
            if (this.props.status === 201)
                this.props.addToast("Invite sent")
            else
                this.props.addToast("Request failed. Make sure username is correct.")
        })

        this.setState({ recipient: "" })
        event.preventDefault() // Prevents page from reloading on submit
    }

    render() {
        return (
            <div className="playlist">
                {this.props.playlists.curr ?
                <div className="playlist">
                    <h2>{this.props.playlists.curr.title}</h2>

                    <div className="playlist-sections">
                        <div className="playlist-videos">
                            {this.props.playlists.curr.videos.length > 0 ? 
                                <VideoPlayer 
                                    videoId={this.props.playlists.curr.videos[this.state.videoIndex].url} 
                                    channel={this.state.channel}
                                    setNextVideo={this.setNextVideo} /> 
                                : null
                            }
                            
                            <SearchBar id={this.props.match.params.id} channel={this.state.channel} />
                            <div className="video-list">
                                {this.props.playlists.curr.videos.length > 0 && this.props.playlists.curr.videos.map((video, i) =>
                                    <p key={i}>{video.title}</p>)
                                }
                            </div>
                        </div>

                        <div className="playlist-users">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    name="recipient"
                                    placeholder="Invite a user"
                                    value={this.state.recipient}
                                    onChange={this.handleChange}
                                />
                                <button className="submit" type="submit">
                                    Submit
                                </button>
                            </form>
                            <div className="user-list">
                                <h4>Users in Room: </h4>
                                {this.state.inRoom && this.state.inRoom.map((user, i) =>
                                    <p key={i}>{user}</p>    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.auth.username,
    playlists: state.playlists,
    status: state.invites.status
})

const mapDispatchToProps = dispatch => ({ 
    fetchPlaylist: id => dispatch(fetchPlaylist(id)),
    createInvite: invite => dispatch(createInvite(invite)),
    addToast: (text, action) => dispatch(addToast(text, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
