import classcialBeh from '../classical-BEH.js'

const BAPManager = wx.getBackgroundAudioManager()
Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classcialBeh],
    properties: {
        url: String,
        currentPlay: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        playSrc: '/component/images/play.png',
        pauseSrc: '/component/images/pause.png'
    },
    lifetimes: {
        attached() {
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlayTap: function (e) {
            this.triggerEvent('play', {}, {})
        }
    }
})
