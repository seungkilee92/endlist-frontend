import React, { Component } from 'react'

import '../../assets/css/SearchResult.css'

class SearchResult extends Component {
    render() {
        return (
            <div className="search-result">
                {this.props.result.thumbnail ? <img alt={this.props.result.title} src={this.props.result.thumbnail} /> :
                <img alt={this.props.result.title} src="https://semantic-ui.com/images/wireframe/image.png" />}
                <p>{this.props.result.title}</p>
                <button onClick={() => this.props.addVideo(this.props.result)}>+</button>
            </div>
        )
    }
}

export default SearchResult