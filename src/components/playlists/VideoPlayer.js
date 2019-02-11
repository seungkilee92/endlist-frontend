import React, { Component } from 'react'
import YouTube from 'react-youtube'
 
class VideoPlayer extends Component {
  render() {
    const opts = {
      width: '100%',
      flexGrow: 1,
      playerVars: {
        autoplay: 1
      }
    };
 
    return (
        // Place Holder ID
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onEnd={this.props.setNextVideo}
      />
    );
  }
}

export default VideoPlayer