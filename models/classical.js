import {HTTP} from '../util/http.js'

export class ClassicalModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: '/classic/latest',
            success: res => {
                callback(res)
                this._setLatestIndex(res.index)
                this._setClassicals(res.index, res)
            }
        })
    }

    getCurrent(index, type, id, callback) {
        this.request({
            url: `/classic/${type}/${id}`,
            success: res => {
                callback(res)
                this._setClassicals(res.index, res)
            }
        })
    }

    getClassical(index, NextOrPrev, callback) {
        this.request({
            url: `/classic/${index}/${NextOrPrev}`,
            success: res => {
                callback(res)
                this._setClassicals(res.index, res)
            }
        })
    }

    _hasNext(index) {
        let latsestIndex = this._getLatestIndex()
        return index != latsestIndex
    }

    _hasPrev(index) {
        return index != 1
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latsestIndex', index);
    }

    _getLatestIndex() {
        return wx.getStorageSync('latsestIndex')
    }

    _getClassicals(index) {
        let key = 'classical-' + index
        return wx.getStorageSync(key);
    }

    _setClassicals(index, value) {
        let key = 'classical-' + index
        wx.setStorageSync(key, value);
    }

    _checkStorage(index) {
        return this._getClassicals(index)
    }
}