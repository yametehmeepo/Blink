// component/book/bookItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        image: String,
        title: String,
        author: String,
        like: Number,
        bookid: Number
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onBookTap(e) {
            const id = this.properties.bookid
            wx.navigateTo({
                url: '/pages/book/bookDetail/bookDetail?id=' + id
            })
        }
    }
})
