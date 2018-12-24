import {HTTP} from '../util/http-p.js'

export class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        })
    }

    getDetail(id) {
        return this.request({
            url: `/book/${id}/detail`
        })
    }

    getComment(id) {
        return this.request({
            url: `/book/${id}/short_comment`
        })
    }

    getLike(id) {
        return this.request({
            url: `/book/${id}/favor`
        })
    }

    addComment(id, content) {
        return this.request({
            url: '/book/add/short_comment',
            data: {
                book_id: id,
                content: content
            },
            method: "POST"
        })
    }

    getBookCount() {
        return this.request({
            url: '/book/favor/count'
        })
    }

    getMyFavor() {
        return this.request({
            url: '/classic/favor'
        })
    }
}