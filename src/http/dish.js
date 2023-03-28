import api from './api';
 

//修改
export const dishUpdate = (params) => api.post(`dish/update`, params)
//新建 
export const dishInsert = (params) => api.post(`dish/insert`, params)




//按名字或id查找
export const dishSearch = (params) => api.get(`dish/search`,{params})
//分页查询
export const dishPaging = (params) => api.get(`dish/paging`,{params})
//删除
export const dishDelet = (params) => api.get(`dish/delete`,{params})

