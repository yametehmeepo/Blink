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
    request(parm) {
        if (!parm.method) {
            parm.method = 'GET'
        }
        wx.request({
            url: config.baseurl + parm.url,
            method: parm.method,
            data: parm.data,
            header: {
                "Content-Type": "application/json",
                "appkey": config.appkey
            },
            success: (res) => {
                let httpcode = res.statusCode.toString()
                if (httpcode.startsWith('2')) {
                    parm.success && parm.success(res.data)
                } else {
                    let error_code = res.data.error_code
                    this._show_errorMsg(error_code)
                }
            },
            fail: (err) => {
                this._show_errorMsg(1)
            }
        })
    }

    _show_errorMsg(error_code) {
        wx.showToast({
            title: errTips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

