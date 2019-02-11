import React, { Component } from 'react'
import { connect } from 'react-redux'

import '../assets/css/Home.css'

import CreatePlaylist from '../components/playlists/CreatePlaylistForm'
import Tile from '../components/common/Tile'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {create: false}
    }

    toggle = () => {
        this.setState({create: !this.state.create})
    }

    render() {
        return (
            <div className="homepage">
                {this.state.create ? <CreatePlaylist toggle={this.toggle} /> :
                <div>
                    <div className="owned-playlists">
                        <h2>Owned Playlists</h2>
                        <button onClick={this.toggle}>+</button>
                    </div>
                    <div className="playlist-tile-container">
                        {this.props.playlists && this.props.playlists.owned && this.props.playlists.owned.map((playlist, i) =>
                            <Tile playlist={playlist} key={i} />)
                        }
                    </div>
                    <div className="joined-playlists">
                        <h2>Joined Playlists</h2>
                    </div>
                    <div className="playlist-tile-container">
                        {this.props.playlists && this.props.playlists.joined && this.props.playlists.joined.map((playlist, i) =>
                            <Tile playlist={playlist} key={i} />)
                        }
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    playlists: state.playlists
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
