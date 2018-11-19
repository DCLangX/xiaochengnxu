import { config } from '../config.js'
const tips = {
  1005: 'appkey无效',
  3000: '期刊不存在'
}
class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let err_code = res.data.error_code;
          this._show_error(err_code);
        }
      },
      fail: (err) => {
        this._show_error(err);
      }
    })
  }

  _show_error(error_code) {
    let msg = tips[error_code] ? tips[error_code] : '未知错误';
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }