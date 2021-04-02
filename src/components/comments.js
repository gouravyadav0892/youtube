import React, {Component} from 'react'

export default class CommentSection extends Component {

    constructor() {
        super()
        this.state = {
            video_id: null,
            comments: []
        }
    }

    componentDidMount = () => {
        console.log("Did Mount")
        window.addEventListener("beforeunload", this._saveComments)
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(nextProps.videoId !== prevState.video_id) {
            var comments = localStorage.getItem("comments_" + nextProps.videoId) || '[]'
            return {
                video_id: nextProps.videoId,
                comments: JSON.parse(comments)
            }
        }
        return null
    }

    componentDidUpdate = (prevProps, prevState) => {
        // debugger
        if(prevProps.videoId !== this.props.videoId) {
            this._saveComments(prevState.video_id, prevState.comments)
            var comments = localStorage.getItem("comments_" + this.props.videoId)
            if(comments) {
                this.setState({
                    comments: JSON.parse(comments),
                    video_id: this.props.videoId
                })
            } else {
                this.setState({
                    comments: [],
                    video_id: this.props.videoId
                })
            }
        }
    }

    _saveComments = (video_id, comments) => {
        if(comments.length) {
            localStorage.setItem("comments_" + video_id, JSON.stringify(comments))
        }
    }
    

    componentWillUnmount = () => {
        debugger
        this._saveComments(this.state.video_id, this.state.comments)
        window.removeEventListener("beforeunload", this._saveComments)
    }

    _like = (index, value) => {
        if(value) {
            this.state.comments[index].likes +=1
            this.state.comments[index].isLiked = 1
        } else {
            this.state.comments[index].likes -=1
            this.state.comments[index].isLiked = 0
        }
        this.setState({})
    }

    _dislike = (index, value) => {
        if(value) {
            this.state.comments[index].dislikes +=1
            this.state.comments[index].isLiked = -1
        } else {
            this.state.comments[index].dislikes -=1
            this.state.comments[index].isLiked = 0
        }
        this.setState({})
    }

    _addComment = (event) => {
        var keyCode = event.keyCode || event.which; 
        if(keyCode == 13) {
            event.preventDefault()

            this.state.comments.unshift({
                author: "Default User",
                isLiked: 0,
                likes: 0,
                dislikes: 0,
                comment: event.target.value
            })
            this.setState({})
            event.target.value = ""
        }
    }


    render() {
        var comments = this.state.comments.map((item, index) => {
            return <Comment key={"comments_" + index} data={item} 
                like={this._like.bind(this, index)} dislike={this._dislike.bind(this, index)} 
            />
        })

      return <div className="comments-section">
          
          <div className="form-group has-feedback">
              <input type="text" className="form-control" id="search_item" placeholder="Add Comment" 
                  onKeyPress={this._addComment} />
          </div>
          {comments}
      </div>
    }
}


class Comment extends Component {

    _handlelike = () => {
        switch(this.props.data.isLiked) {
            case 0:
                this.props.like(true)
                break;
            case 1:
                this.props.like(false)
                break;
            case -1:
                this.props.dislike(false)
                this.props.like(true)
                break;
        }
    }

    _handleDislike = () => {
        switch(this.props.data.isLiked) {
            case 0:
                this.props.dislike(true)
                break;
            case 1:
                this.props.like(false)
                this.props.dislike(true)
                break;
            case -1:
                this.props.dislike(false)
                break;
        }
    }

    render() {

        var data = this.props.data

        return <div className="comment-box">
            <div className="author">{data.author}</div>
            <div className="comment">{data.comment}</div>
            <i className={"likes glyphicon glyphicon-thumbs-up " + (this.props.data.isLiked == 1 ? "selected" : "")}
                onClick={this._handlelike}
            >&nbsp;{data.likes}</i>
            <i className={"dislikes glyphicon glyphicon-thumbs-down " + (this.props.data.isLiked == -1 ? "selected" : "")}
                onClick={this._handleDislike}
            >&nbsp;{data.dislikes}</i>
        </div>
    }
}