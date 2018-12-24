// component/classical/button/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true
    },
    properties: {
        openType: String
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        getuserinfo(e) {
            const userInfo = e.detail.userInfo
            this.triggerEvent('getuserinfo', {userInfo}, {})
        }
    }
})
