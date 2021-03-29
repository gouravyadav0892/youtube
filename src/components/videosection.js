import React, {Component} from 'react'

export default class VideoListSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            thumbnail_class:"col-sm-6"
        }
    }

    _toggleThumbnailSize = (classname) => {
        this.setState({
            thumbnail_class: classname
        })
    }

    _handleClick = (index) => {
        this.props.changeVideo(index)
    }

    render() {
        var data = this.props.data;
        var thumbnails = data.map((item, index)=> {
            return <div key={"video_thumb_" + item.id} className={this.state.thumbnail_class}> 
                <VideoThumbnail data={item.thumbnail} select={this._handleClick.bind(this, index)} />
            </div>
        })

      return <div className="video-section">
          <div className="video-thumbnail-size-list">
                <div onClick={this._toggleThumbnailSize.bind(this, "col-sm-12")} 
                    className={"thumb-size glyphicon glyphicon-th-list " + (this.state.thumbnail_class == "col-sm-12" ? "selected" : "" )}
                />
                <div onClick={this._toggleThumbnailSize.bind(this, "col-sm-6")} 
                    className={"thumb-size glyphicon glyphicon-th-large " + (this.state.thumbnail_class == "col-sm-6" ? "selected" : "" )}
                />
                <div onClick={this._toggleThumbnailSize.bind(this, "col-sm-4")} 
                    className={"thumb-size glyphicon glyphicon-th " + (this.state.thumbnail_class == "col-sm-4" ? "selected" : "" )}
                />
          </div>
          <div className="video-list row">
                {thumbnails}
          </div>
      </div>
    }
}

class VideoThumbnail extends Component {

    _handleClick = () => {
        this.props.select()
    }

    render() {
        var data = this.props.data
        return <div className="video-thumbnail" onClick={this._handleClick}>
            <img src={data} />
        </div>
    }
}