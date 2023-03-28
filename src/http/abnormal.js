import api from './api';
 

//修改
export const abnormalUpdate = (params) => api.post(`abnormal/update`, params)
//新建 
export const abnormalInsert = (params) => api.post(`abnormal/insert`, params)




//按名字或id查找
export const abnormalSearch = (params) => api.get(`abnormal/search`,{params})
//分页查询
export const abnormalPaging = (params) => api.get(`abnormal/paging`,{params})
//删除
export const abnormalDelet = (params) => api.get(`abnormal/delete`,{params})

