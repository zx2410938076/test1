//对axios进行二次封装,将刚才下载好的axios导入进来
import axios from "axios";
 
 
//2. 利用axios对象的方法create,去创建一个axios实例
//requests就是axios,只不过稍微配置一下
 
const api = axios.create({
    //基础路径
    baseURL: 'http://localhost:9999/', // 所有请求的公共地址部分
    timeout: 3000 // 请求超时时间,这里的意思是当请求时间超过5秒还未取得结果时,提示用户请求超时
})
 
 
// 请求拦截处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
api.interceptors.request.use(config => {
    // 每次发送请求我们都携带token信息
  var token = sessionStorage.getItem('token')
  config.headers['Authorization']=token // 请求头带上Token
  return config;
}, err => {
    // 请求发生错误时的相关处理 抛出错误
    //  //响应失败的返回
    Promise.reject(err)
})
 
 
//响应拦截处理  响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
api.interceptors.response.use(res => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
    console.log(res)
    return res
}, err => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
})
 
 
 
//最后一步 暴露出去实例导出
export default api