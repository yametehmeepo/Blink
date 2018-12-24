import {BookModel} from "../../models/book.js"

const bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatar: '',
        nickname: '',
        bookCount: 0,
        myFavorClassicals: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userAuthorize()
        this.getBookCount()
        this.getMyFavor()
    },
    onPullDownRefresh() {
        this.userAuthorize()
        this.getBookCount()
        this.getMyFavor()
        wx.stopPullDownRefresh()
    },
    userAuthorize() {
        wx.getSetting({
            success: data => {
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatar: res.userInfo.avatarUrl,
                                nickname: res.userInfo.nickName
                            })
                        }
                    })
                }
            }
        })
    },
    getMyFavor() {
        bookModel.getMyFavor().then(res => {
            this.setData({
                myFavorClassicals: res || []
            })
        })
    },
    getUserInfo(e) {
        if (e.detail.userInfo) {
            this.setData({
                avatar: e.detail.userInfo.avatarUrl || '',
                nickname: e.detail.userInfo.nickName || ''
            })
        }
    },
    getBookCount() {
        bookModel.getBookCount().then(res => {
            this.setData({
                bookCount: res.count || 0
            })
        })
    },
    onAboutTap(e) {
        wx.navigateTo({
            url: '/pages/about/about'
        })
    },
    onFavorTap(e) {
        const id = e.currentTarget.dataset.item.id
        const type = e.currentTarget.dataset.item.type
        wx.navigateTo({
            url: `/pages/classical/classicalDetail/classicalDetail?id=${id}&type=${type}`
        })
    }
})