import {HTTP} from "../../util/http-p.js"

export class SearchModel extends HTTP {
    getHotSearch() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }

    _setHotSearchStorage(hotlist) {
        wx.setStorageSync('hot_keyword', hotlist);
    }

    _getHotSearchStorage() {
        return wx.getStorageSync('hot_keyword');
    }
}