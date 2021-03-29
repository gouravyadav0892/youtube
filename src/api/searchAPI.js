import {VideoListMapper} from './dataobjects/DTO'

import {API_KEY, API_URL} from '../config/constants'

export const loadAPIScript = (callback) => {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.onload = () => {
        console.log("Script loaded")
        window.gapi.load("client", loadClient.bind(this, callback))
    }
    script.src = API_URL
    document.getElementsByTagName("head")[0].appendChild(script)
} 

export const loadClient = async (callback) => {
    window.gapi.client.setApiKey(API_KEY);
    window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
            () =>  { 
                console.log("GAPI client loaded for API"); 
                callback("Success")
            },
            err => { 
                console.error("Error loading GAPI client for API", err); 
                callback("Error")
            }
        );
}

export const fetchVideoResults = async search_query => {

    try {

        if(!search_query) {
            return JSON.parse(localStorage.getItem("recentResults"))
        }

        var response = await window.gapi.client.youtube.search.list({
            q: search_query,
            part: "snippet",
            type: "video",
            maxResults: 18
        })
        var results = VideoListMapper(response.result.items)
        localStorage.setItem("recent_query", search_query)
        localStorage.setItem("recentResults", JSON.stringify(results))
        return results
    } catch (err) {
        console.error(err)
        return []
    }
}
