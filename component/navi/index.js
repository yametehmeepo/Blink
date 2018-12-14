// component/navi/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        hasPrev: Boolean,
        hasNext: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        prevSrc: '/component/images/prev.png',
        prevDisSrc: '/component/images/prev.disabled.png',
        nextSrc: '/component/images/next.png',
        nextDisSrc: '/component/images/next.disabled.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPrev: function (e) {
            if (this.properties.hasPrev) {
                this.triggerEvent('prev', {}, {})
            }
        },
        onNext: function (e) {
            if (this.properties.hasNext) {
                this.triggerEvent('next', {}, {})
            }
        }
    }
})
