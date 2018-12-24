import {ClassicalModel} from '../../../models/classical.js'
import {LikeModel} from "../../../models/like.js"


let classicalmodel = new ClassicalModel()
let likemodel = new LikeModel()
const BAPManager = wx.getBackgroundAudioManager()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {id, type} = options
        classicalmodel.getCurrent(type, id, (res) => {
            this.setData({...res})
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
    like: function (e) {
        let behavior = e.detail.like
        likemodel.like(behavior, this.data.id, this.data.type, () => {
            wx.showToast({
                title: behavior ? '点赞成功' : '取消点赞',
                icon: 'none',
                duration: 1500
            })
            classicalmodel.getCurrent(this.data.type, this.data.id, res => {
                this.setData({...res})
            })
        })
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