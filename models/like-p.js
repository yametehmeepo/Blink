import {HTTP} from "../util/http-p.js"

export class LikeModel extends HTTP {
    like(behavior, id, category) {
        const url = behavior ? '/like' : '/like/cancel'
        return this.request({
            url: url,
            data: {
                "art_id": id,
                "type": category
            },
            method: "POST"
        })
    }
}