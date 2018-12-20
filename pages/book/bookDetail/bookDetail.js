import {BookModel} from '../../../models/book.js'
import {LikeModel} from "../../../models/like-p.js"

const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image: '',
        title: '',
        author: '',
        comments: [],
        isMaskShow: false,
        inputvalue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showNavigationBarLoading()
        const id = options.id
        Promise.all([
            this.getBookDetail(id),
            this.getDetailComment(id),
            this.getDetailLike(id)
        ]).then(res => {
            wx.hideNavigationBarLoading()
        }).catch(err => {
            console.log(err)
        })
        /*Promise.all([bookDetailPromise, commentPromise, likePromise]).then(res => {
            this.setData({
                ...res[0],
                comments: res[1].comments || [],
                favor: res[2]
            })
            wx.hideNavigationBarLoading()
        }).catch(err => {
            console.log(err)
        })*/
    },
    like: function (e) {
        let behavior = e.detail.like
        likeModel.like(behavior, this.data.id, 400).then(res => {
            wx.showToast({
                title: behavior ? '点赞成功' : '取消点赞',
                icon: 'none',
                duration: 1000
            })
            this.getDetailLike(this.data.id)
        })
    },
    getBookDetail: function (id) {
        return bookModel.getDetail(id)
            .then(res => {
                this.setData({
                    ...res
                })
            })
    },
    getDetailComment: function (id) {
        return bookModel.getComment(id)
            .then(res => {
                this.setData({
                    comments: res.comments || []
                })
            })
    },
    getDetailLike: function (id) {
        return bookModel.getLike(id)
            .then(res => {
                this.setData({
                    favor: res
                })
            })
    },
    tagcomment: function (e) {
        this.addComment(e.detail.content)
    },
    onCommentTap: function (e) {
        this.setData({
            isMaskShow: true
        })
    },
    onMaskHidden: function (e) {
        this.setData({
            isMaskShow: false
        })
    },
    input: function (e) {
        this.setData({
            inputvalue: e.detail.value
        })
    },
    confirm: function (e) {
        let content = e.detail.value.trim()
        if (!content) {
            return
        }
        this.addComment(content)
    },
    addComment: function (content) {
        this.setData({
            isMaskShow: false,
            inputvalue: ''
        })
        bookModel.addComment(this.data.id, content).then(res => {
            wx.showToast({
                title: '短评添加成功',
                icon: 'none',
                duration: 1000
            })
            let comments = this.data.comments
            /*comments.unshift({
                content: content,
                nums: 1
            })*/
            this.setData({
                comments: [{content: content, nums: 1}, ...comments],
            })
        })

    }

})