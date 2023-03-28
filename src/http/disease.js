import api from './api';





//修改信息
export const diseaseUpdate = (params) => api.post(`disease/update`, params)
//新建
export const diseaseInsert = (params) => api.post(`disease/insert`, params)





//分页查询信息
export const diseasePaging = (params) => api.get(`disease/paging`,{params})
//删除
export const diseaseDelet = (params) => api.get(`disease/delete`,{params})
//按名字或id查找
export const diseaseSearch = (params) => api.get(`disease/search`,{params})
