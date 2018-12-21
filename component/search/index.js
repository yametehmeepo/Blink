import {SearchModel} from "../models/search.js"
import {Pagination} from "../pagination-BEH.js"

const searchModel = new SearchModel()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [Pagination],
    properties: {
        trigger: {
            type: Boolean,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        searchValue: '',
        searchFocus: true,
        hotSearchList: [],
        historySearchList: [],
        searching: false,
        searchingFinished: false,
        // resultList: [],
        // total: 0,
        loading: false
    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached() {
            let hotSearchList = searchModel._getHotSearchStorage() || []
            let historySearchList = searchModel._getHistorySearchStorage() || []
            if (!hotSearchList.length) {
                searchModel.getHotSearch()
                    .then(res => {
                        let hotlist = res.hot || []
                        this.setData({
                            hotSearchList: hotlist
                        })
                        searchModel._setHotSearchStorage(hotlist)
                    })
            }
            this.setData({hotSearchList, historySearchList})
        }
    },
    methods: {
        searchconfirm(e) {
            let value = e.detail.value
            if (!value || !value.trim()) {
                return
            }
            /*this.triggerEvent('searchbooks',{
                content: value.trim()
            },{})*/
            searchModel._setHistorySearchStorage(value.trim())
            let historylist = searchModel._getHistorySearchStorage() || []
            wx.showLoading()
            this.setData({
                searching: true,
                historySearchList: historylist
            })
            searchModel.searching(value.trim()).then(res => {
                this.setData({
                    searchingFinished: true
                })
                this.setTotal(res.total || 0)
                this.setList(res.books || [])
                wx.hideLoading()
            })

        },
        searchinput(e) {
            this.setData({
                searchValue: e.detail.value
            })
        },
        onCancelTap(e) {
            this.triggerEvent("cancel", {}, {})
        },
        onClear(e) {
            this.setData({
                searchValue: '',
                searching: false,
                searchingFinished: false,
                searchFocus: true
            })
            this._unloading()
            this.init()
        },
        onSearchTap(e) {
            let content = e.detail.content
            this.setData({
                searching: true,
                searchValue: content,
                searchFocus: false
            })
            wx.showLoading()
            searchModel.searching(content).then(res => {
                let list = res.books || []
                let total = res.total || 0
                this.setTotal(total)
                this.setList(list)
                this.setData({
                    searchingFinished: true
                })
                wx.hideLoading()
            })
        },
        loadMore() {
            const {searchValue} = this.data
            const current = this.getCurrentStart()
            if (this._isloading() || !searchValue || !this.hasMore()) {
                return
            }
            this._loading()
            searchModel.searching(searchValue, current).then(res => {
                let resultList = this.data.resultList
                let moreList = res.books || []
                if (moreList.length) {
                    this.setList([...resultList, ...moreList])
                }
                this._unloading()
            }, () => {
                this._unloading()
            }).catch(() => {
                this._unloading()
            })
        },
        _isloading() {
            return this.data.loading
        },
        _loading() {
            wx.showNavigationBarLoading()
            this.setData({
                loading: true
            })
        },
        _unloading() {
            wx.hideNavigationBarLoading()
            this.setData({
                loading: false
            })
        }
    }
})
