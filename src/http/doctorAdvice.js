import api from './api';
 

//修改
export const doctorAdviceUpdate = (params) => api.post(`doctorAdvice/update`, params)
//新建
export const doctorAdviceInsert = (params) => api.post(`doctorAdvice/insert`, params)




//按名字或id查找
export const doctorAdviceSearch = (params) => api.get(`doctorAdvice/search`,{params})
//删除
export const doctorAdviceDelet = (params) => api.get(`doctorAdvice/delete`,{params})
//分页查询信息
export const doctorAdvicePaging = (params) => api.get(`doctorAdvice/paging`,{params})

