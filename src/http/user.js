// // 引入 封装的api 
import api from './api';
 
//下面是简写的形式
// getXXX 自定义的接口名字
//登录
export const Login = (params) => api.post(`login`, params)
//修改用户信息
export const Update = (params) => api.post(`user/update`, params)
//新建用户
export const Insert = (params) => api.post(`user/insert`, params)



//获取权限
export const Reacquire = (params) => api.get(`user/Reacquire`,{params})
//按名字或id查找对应用户信息
export const Search = (params) => api.get(`user/search`,{params})
//分页查询用户信息
export const Paging = (params) => api.get(`user/paging`,{params})
//删除用户
export const Delet = (params) => api.get(`user/delete`,{params})
//根据token获取用户
export const GetName = (params) => api.get(`user/getName`,{params})





// export const getXXX = (params) => api.get(`/apigb/v1/component`, { params})
// export const postXXX = (params) => api.post(`/apigb/v1/component/update-info`, params)
 
 
// // 下面是详细的写法
// export const xxxx = (params) => api({
//     url: '', // 请求地址
//     method: 'post', // 请求方式
//     // data: params, // (一般post请求，我们习惯使用 data属性来传参)
//     params: params //(一般get请求，我们习惯使用params属性来传参）
//     // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
// })