// component/classical/movie/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        image: String,
        content: String,
        type: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        movieTag: '/component/images/movie@tag.png',
        musicTag: '/component/images/music@tag.png',
        verseTag: '/component/images/verse@tag.png',
        playSrc: '/component/images/play.png',
        pauseSrc: '/component/images/pause.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {}
})
