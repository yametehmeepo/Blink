import {ClassicalModel} from '../../models/classical.js'
import {LikeModel} from "../../models/like.js"


let classicalmodel = new ClassicalModel()
let likemodel = new LikeModel()
const BAPManager = wx.getBackgroundAudioManager()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasNext: false,
        hasPrev: true,
        isPlay: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicalmodel.getLatest(res => {
            this.setData({
                ...res,
                hasPrev: classicalmodel._hasPrev(res.index)
            })
        })
        BAPManager.onPlay(() => {
            let currentPlay = BAPManager.src == this.data.url
            this.setData({
                isPlay: true,
                currentPlay: currentPlay
            })
        })
        BAPManager.onPause(() => {
            this.setData({
                isPlay: false,
                currentPlay: false
            })
        })
        BAPManager.onStop(() => {
            this.setData({
                isPlay: false,
                currentPlay: false
            })
        })
        BAPManager.onEnded(() => {
            this.setData({
                isPlay: false,
                currentPlay: false
            })
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    like: function (e) {
        let behavior = e.detail.like
        likemodel.like(behavior, this.data.id, this.data.type, () => {
            wx.showToast({
                title: behavior ? '点赞成功' : '取消点赞',
                icon: 'none',
                duration: 1500
            })
            classicalmodel.getCurrent(this.data.index, this.data.type, this.data.id, res => {
                this.setData({...res})
            })
        })
    },
    onNextTap: function (e) {
        let index = this.data.index + 1
        if (this._check(index)) {
            return
        }
        this._updateClassical('next')
    },
    onPrevTap: function (e) {
        let index = this.data.index - 1
        if (this._check(index)) {
            return
        }
        this._updateClassical('previous')
    },
    _updateClassical(NextOrPrev) {
        classicalmodel.getClassical(this.data.index, NextOrPrev, res => {
            let currentPlay = BAPManager.src == res.url && this.data.isPlay
            this.setData({
                ...res,
                hasPrev: classicalmodel._hasPrev(res.index),
                hasNext: classicalmodel._hasNext(res.index),
                currentPlay: currentPlay
            })
        })
    },
    _check(index) {
        let res = classicalmodel._checkStorage(index)
        if (res) {
            let currentPlay = BAPManager.src == res.url && this.data.isPlay
            this.setData({
                ...res,
                hasPrev: classicalmodel._hasPrev(res.index),
                hasNext: classicalmodel._hasNext(res.index),
                currentPlay: currentPlay
            })
            return true
        } else {
            return false
        }
    },
    play() {
        const {isPlay, currentPlay, title, url} = this.data
        if (isPlay) {
            if (currentPlay) {
                BAPManager.pause()
                this.setData({
                    isPlay: false,
                    currentPlay: false
                })
            } else {
                BAPManager.title = this.data.title
                BAPManager.src = this.data.url
                this.setData({
                    isPlay: true,
                    currentPlay: true
                })
            }
        } else {
            BAPManager.title = this.data.title
            BAPManager.src = this.data.url
            this.setData({
                isPlay: true,
                currentPlay: true
            })
        }

    }
})