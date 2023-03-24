import api from './api';
 

//修改
export const requestUpdate = (params) => api.post(`request/update`, params)
//新建
export const requestInsert = (params) => api.post(`request/insert`, params)




//按名字或id查找
export const requestSearch = (params) => api.get(`request/search`,{params})
//分页查询
export const requestPaging = (params) => api.get(`request/paging`,{params})
//删除
export const requestDelet = (params) => api.get(`request/delete`,{params})

