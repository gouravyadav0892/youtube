import React, {Component} from 'react'

export default class SearchContainer extends Component {

    constructor() {
        super()
        this.state = {
           search_query: ""
        }
    }
  
    _handleChange = event => {
        this.setState({
            search_query: event.target.value
        })
    
    }
  
    _onKeyPress = event => {
        var keyCode = event.keyCode || event.which; 
        if(keyCode == 13) {
            this._onSearchClick(event)
        }
    }
  
    _onSearchClick = event => {
        event.preventDefault()
        this.props._handleSearch(this.state.search_query)
    }
  
    render() {
      return <div className="search-container">
          <div className="form-group has-feedback">
              <input autoComplete="off" type="text" className="form-control" id="search_item" placeholder="Search Videos" 
                  onKeyPress={this._onKeyPress} onChange={this._handleChange} value={this.state.search_query}
              />
              <i className="glyphicon glyphicon-search form-control-feedback cursor-pointer" onClick={this._onSearchClick}></i>
          </div>
      </div>
    }
  }