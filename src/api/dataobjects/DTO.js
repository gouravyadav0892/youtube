export const VideoListMapper = response => {
    var result = [];
    response.forEach(element => {
        result.push( new VideoMapper(element))
    })
    return result
}


class VideoMapper {
    id = null
    title = null
    desc = null
    thumbnail = null
    publishDate = null
    constructor(data) {
        if(data) {
            if(data.id) {
                this.id = data.id.videoId
            }
            if(data.snippet) {
                this.desc = data.snippet.description
                this.publishDate = data.snippet.publishedAt
                this.title = data.snippet.title
                if(data.snippet.thumbnails) {
                    if(data.snippet.thumbnails.high) {
                        this.thumbnail = data.snippet.thumbnails.high.url
                    } else if (data.snippet.thumbnails.medium) {
                        this.thumbnail = data.snippet.thumbnails.medium.url
                    } else if (data.snippet.thumbnails.default) {
                        this.thumbnail = data.snippet.thumbnails.default.url
                    }
                }
            }
        }
    }
}