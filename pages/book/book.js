import {BookModel} from '../../models/book.js'
import {SearchModel} from "../../component/models/search.js"

const bookModel = new BookModel()
const sarchModel = new SearchModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        isSearchPanelShow: false,
        trigger: false
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
    },
    onReachBottom() {
        this.setData({
            trigger: !this.data.trigger
        })
    },
    onSearchbooks(e) {
        // let content = e.detail.content
        // let historylist = searchModel._getHistorySearchStorage() || []
        // if (historylist.indexOf(content) == -1) {
        //     historylist.unshift(content)
        //     searchModel._setHistorySearchStorage(historylist)
        // }
        // wx.showLoading()
        // this.setData({
        //     searching: true,
        //     historySearchList: historylist
        // })
        // searchModel.searching(value.trim())
        //     .then(res => {
        //         this.setData({
        //             resultList: res.books || [],
        //             total: res.total || 0,
        //             searchingFinished: true
        //         })
        //         wx.hideLoading()
        //     })
    },
    onSearchTap(e) {
        this.setData({
            isSearchPanelShow: true
        })
    },
    closeSearchPanel(e) {
        this.setData({
            isSearchPanelShow: false
        })
    }
})