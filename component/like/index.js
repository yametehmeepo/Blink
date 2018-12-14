// component/like/like.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean,
            value: true
        },
        count: {
            type: Number,
            value: 12
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: '/component/images/like.png',
        noSrc: '/component/images/none-like.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLikeTap: function (e) {
            let behavior = !this.data.like
            this.triggerEvent('like', {
                like: behavior
            }, {})
        }
    }
})
