import React, {Component} from 'react'

export default class CommentSection extends Component {

    constructor() {
        super()
        this.state = {
            comments: []
        }
    }

    componentDidMount = () => {
        // set initial comments from local storage
        var comments  = localStorage.getItem("comments")
        if(comments) {
            this.setState({
                comments: JSON.parse(comments)
            })
        } else {
            // for the first time set comments 
            console.log("Comments ADDED")
            this.setState({
                comments: [
                    {
                        author: "Joffrey Baratheon",
                        isLiked: 1,
                        likes: 12,
                        dislikes: 34,
                        comment: "Out of all the Geralt fan mixes ive reviewed, this video is by far the best. Your respect for the story is fully shown, thank you for using the witcher theme as well surprisingly its hard to find one that does"
                    },
                    {
                        author: "Marie Joseph",
                        isLiked: 0,
                        likes: 12,
                        dislikes: 34,
                        comment: "But you know, Dani can finish the Lannisters in a snap. Like, Cersei is unarmed that moment, no Scorpion to  kill the dragons, one dragon can unman the wall with its fire so the Unsullied and Dothraki can finish the rest of the army unblemished. Cersei has 0% chance of winning in that moment. But then, most will find it boring if that really happens. (But me, I will enjoy it. LOL)."
                    },
                    {
                        author: "Ann Birgets",
                        isLiked: -1,
                        likes: 12,
                        dislikes: 34,
                        comment: "I can't wait for the next season to start - bring on more witcher - loved the books, sucked a bit at playing the games but enjoyed it - watched the original vids,  and season 1 of the series - waiting for more, hopefully not too long or the actors will age too much - tks for this refresher"
                    }
                ]
            })

        }
        window.addEventListener("beforeunload", this._saveComments)
    }

    _saveComments = () => {
        localStorage.setItem("comments", JSON.stringify(this.state.comments))
    }
    

    componentWillUnmount = () => {
        this._saveComments()
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