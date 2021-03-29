import React, { Component } from 'react'
import {fetchVideoResults, loadAPIScript} from '../api/searchAPI'
import VideoPlayer from './videoplayer'
import SearchContainer from './search'
import CommentSection from './comments'
import VideoListSection from './videosection'

export default class Home extends Component {

    constructor(props) {
      super(props)
      this.state = {
        darkTheme: JSON.parse(localStorage.getItem("darkTheme")),
        videos: [],
        selectedVideo: 0
      }
    }


    componentDidMount = () => {
      loadAPIScript(this._setSearchPage)
    }

    _toggleTheme = () => {
      this.setState({
        darkTheme: !this.state.darkTheme
      }, () => {
          localStorage.setItem("darkTheme", this.state.darkTheme)  
      })
      
    }

    _setSearchPage = (response) => {
      if(response == "Success") {
        console.log("Start search")
      } else {
        console.log("Search API not loaded")
      }
    }

    _handleSearch = async search_query => {

        var response = await fetchVideoResults(search_query.trim())
        
        this.setState({
          videos: response,
          selectedVideo: 0
        })

    }

    _changeVideoSelection = (item) => {
      this.setState({
        selectedVideo: item
      })
    }


    render() {

      var mainContent
      if(this.state.videos.length) {
        mainContent = <>
          <div className="col-sm-12 col-md-8" >
            <VideoPlayer data={this.state.videos[this.state.selectedVideo]} />
            <CommentSection />
          </div>
          <div className="col-sm-12 col-md-4">
            <VideoListSection data={this.state.videos} changeVideo={this._changeVideoSelection}/>
          </div>
        </>
      }

        return <div className={"container-fluid " + (this.state.darkTheme ? "dark-theme" : "light-theme")}>
            <div className="dark-theme-btn" onClick={this._toggleTheme}>Change Theme</div>
            <div className="container">
              
              <div className="col-sm-12">
                <SearchContainer _handleSearch={this._handleSearch} />  
              </div>
              {mainContent}
            </div>
        </div>
    }
}