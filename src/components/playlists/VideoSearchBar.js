import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchPlaylist } from '../../actions'

import '../../assets/css/Search.css'

import SearchResult from '../common/SearchResult'

const baseURL = "http://localhost:4000"

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      query: "",
      max: 10,
      results: []
    }
  }

  // Place Holder
  getResults = async () => {
    const query = {
      query: this.state.query,
      max: this.state.max
    }

    const { data } = await axios.post(baseURL + "/videos/search", query)
    this.setState({ results: data })
  }

  handleInputChange = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
    
    if (this.state.query && this.state.query.length > 1)
      this.getResults()
    else
      this.setState({ results: [] })
  }

  addVideo = async video => {
    const req = {
      title: video.title,
      video: video.id,
      playlist: this.props.id
    }
    await axios.post(baseURL + '/videos', req)
    await this.props.fetchPlaylist(this.props.id)
    this.setState({ query: "", results: [] })

    this.props.channel.push("video_added", null)
  }

  render() {
    return (
      <div className="video-search">
        <form>
          <input
            className="search-bar-input"
            placeholder="Search for YouTube videos to add to the playlist"
            name="query"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>

        {this.state.results.length > 0 ?
          <div className="search-results">
            {this.state.results.length > 0 && this.state.results.map((video, i) => 
              <SearchResult key={i} result={video} addVideo={this.addVideo} />)
            }
          </div>
          : null
        }
      
        
      </div>
    )
  }
}

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({ 
  fetchPlaylist: id => dispatch(fetchPlaylist(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)