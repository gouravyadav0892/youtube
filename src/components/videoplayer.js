import React, { Component } from 'react'

export default class VideoPlayer extends Component {
    render() {
      var videoData = this.props.data
      if(videoData) {
        var videoSrc = `https://www.youtube.com/embed/${videoData.id}?autoplay=1`
        return <div className="youtubeVideoPlayer">
            <iframe className="youtube_iframe" src={videoSrc} allowFullScreen title='Video player'/>
            <div className="title">{videoData.title}</div>
            <div className="description">{videoData.desc}</div>
            <div className="date">{videoData.publishDate}</div>
        </div>
      } else {
        return null
      }
  
      
    }
  }