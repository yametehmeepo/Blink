import {config} from '../config.js'

const errTips = {
    1: "出现错误",
    1000: "输入参数错误",
    1001: "输入的json格式不正确",
    1002: "找不到资源",
    1003: "未知错误",
    1004: "禁止访问",
    1005: "不正确的开发者key",
    1006: "服务器内部错误",
    2000: "你已经点过赞了",
    2001: "你还没点过赞",
    3000: "该期内容不存在"
}

export class HTTP {
    request({url, data = {}, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    _request(url, resove, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.baseurl + url,
            method,
            data,
            header: {
                "Content-Type": "application/json",
                "appkey": config.appkey
            },
            success: (res) => {
                const httpcode = res.statusCode.toString()
                if (httpcode.startsWith('2')) {
                    resove(res.data)
                } else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_errorMsg(error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_errorMsg(1)
            }
        })
    }

    _show_errorMsg(error_code = 1) {
        const tip = errTips[error_code]
        wx.showToast({
            title: tip ? tip : errTips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

