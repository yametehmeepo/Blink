// component/preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: Boolean,
        count: Number,
        text: String,
        img: String,
        type: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            // wx.navigateTo({
            //     url: '/pages/classical/classicalDetail/classicalDetail'
            // })
            this.triggerEvent('favor',{},{})
        }
    }
})
