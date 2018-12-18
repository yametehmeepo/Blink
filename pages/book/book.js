import {BookModel} from '../../models/book.js'

const bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookModel.getHotList()
            .then(res => {
                this.setData({
                    books: res
                })
            })
    }
})