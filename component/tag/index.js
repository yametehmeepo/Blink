// component/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true
    },
    properties: {
        content: String
    },
    externalClasses: ['tag-class'],
    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTagTap(e) {
            this.triggerEvent('tagcomment', {
                content: this.properties.content
            }, {})
        }
    }
})
