import {HTTP} from "../../util/http-p.js"

export class SearchModel extends HTTP {
    hot_key = 'hot_keyword'
    history_key = 'history_keyword'
    maxLength = 10

    getHotSearch() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }

    searching(text, start = 0, count = 20) {
        return this.request({
            url: `/book/search?start=${start}&count=${count}&q=${text}`
        })
    }

    _setHotSearchStorage(hotlist) {
        wx.setStorageSync(this.hot_key, hotlist);
    }

    _getHotSearchStorage() {
        return wx.getStorageSync(this.hot_key);
    }

    _setHistorySearchStorage(keyword) {
        let historylist = this._getHistorySearchStorage() || []
        if (!historylist.includes(keyword)) {
            if (historylist.length >= this.maxLength) {
                historylist.pop()
            }
            historylist.unshift(keyword)
            wx.setStorageSync(this.history_key, historylist);
        }
    }

    _getHistorySearchStorage() {
        return wx.getStorageSync(this.history_key);
    }
}