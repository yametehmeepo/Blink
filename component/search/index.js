import {SearchModel} from "../models/search.js"

const searchModel = new SearchModel()
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        searchValue: '',
        searchFocus: true,
        hotSearchList: [],
        historySearchList: []
    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached() {
            let hotSearchList = searchModel._getHotSearchStorage()
            if (hotSearchList) {
                this.setData({hotSearchList})
            } else {
                searchModel.getHotSearch()
                    .then(res => {
                        this.setData({
                            hotSearchList: res.hot
                        })
                        searchModel._setHotSearchStorage(res.hot)
                    })
            }
        }
    },
    methods: {
        searchconfirm(e) {

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
                searchValue: ''
            })
        }
    }
})
