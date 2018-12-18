import {HTTP} from "../util/http.js"

export default class LikeModel extends HTTP {
    like(behavior, id, category, callback) {
        const url = behavior ? '/like' : '/like/cancel'
        this.request({
            url: url,
            method: 'POST',
            data: {
                "art_id": id,
                "type": category
            },
            success: () => {
                callback()
            }
        })
    }

    getLikeStatus(id, category, callback) {
        this.request({
            url: `/classic/${category}/${id}/favor`,
            success: (res) => {
                callback(res)
            }
        })
    }
}