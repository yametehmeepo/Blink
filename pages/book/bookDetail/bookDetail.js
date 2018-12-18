import {BookModel} from '../../../models/book.js'

const bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        image: '',
        title: '',
        author: '',
        comments: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const id = options.id
        bookModel.getDetail(id)
            .then(res => {
                this.setData({
                    ...res
                })
            })
        bookModel.getComment(id)
            .then(res => {
                this.setData({
                    comments: res.comments || []
                })
            })
        bookModel.getLike(id)
            .then(res => {
                this.setData({
                    favor: res
                })
            })
    },
    like: function (e) {
        console.log('点赞书籍')
    }
})