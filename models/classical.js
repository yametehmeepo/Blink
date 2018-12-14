import {HTTP} from '../util/http.js'

export class ClassicalModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: '/classic/latest',
            success: res => {
                callback(res)
                this._setLatestIndex(res.index)
                let classicals = this._getClassicals('classicals')
                if (!classicals.length) {
                    this._setClassicals([res])
                }
            }
        })
    }

    getCurrent(index, type, id, callback) {
        this.request({
            url: `/classic/${type}/${id}`,
            success: res => {
                callback(res)
                let classicals = this._getClassicals('classicals')
                let filterclassicals = classicals.filter(i => i.index != index)
                this._setClassicals([...filterclassicals, res])
            }
        })
    }

    getClassical(index, NextOrPrev, callback) {
        this.request({
            url: `/classic/${index}/${NextOrPrev}`,
            success: res => {
                callback(res)
                let classicals = this._getClassicals('classicals')
                this._setClassicals([...classicals, res])
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

    _getClassicals() {
        return wx.getStorageSync('classicals');
    }

    _setClassicals(arr) {
        wx.setStorageSync('classicals', arr);
    }

    _checkStorage(index) {
        let classicals = this._getClassicals('classicals')
        return classicals.find(i => i.index == index)
    }
}