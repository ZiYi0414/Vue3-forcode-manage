import axios from 'axios'
import { ElNotification } from 'element-plus'
//import { localGet } from './index'

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = '/core-api/auditor'
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true
// 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。

axios.interceptors.response.use(
  (response) => {
    const res = response.data //console.log("后置拦截")
    // 当结果的code是否为200的情况
    if (res.code === 200) {
      return response
    } else {
      // 弹窗异常信息
      // 直接拒绝往下面返回结果信息
      ElNotification({ title: `${res.code}`, message: res.resultMsg })
      return Promise.reject(response)
    }
  },
  (error) => {
    const data = {
      message: error.response.data.resultMsg || '请重试',
      code: error.response.data.code
    }
    throw data
  }
)

export default axios
