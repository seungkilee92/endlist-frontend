import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/css/Tile.css'

class Tile extends Component {
    render() {
        return (
            <Link to={'/playlist/' + this.props.playlist.id} className="playlist-tile">
                {this.props.playlist.icon ? <img alt={this.props.playlist.title} src={this.props.playlist.icon} /> :
                <img alt={this.props.playlist.title} src="https://semantic-ui.com/images/wireframe/image.png" />}
                <p>{this.props.playlist.title}</p>
            </Link>
        )
    }
}

export default Tile