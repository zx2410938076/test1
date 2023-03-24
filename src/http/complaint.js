import api from './api';
 

//修改
export const complaintUpdate = (params) => api.post(`complaint/update`, params)
//新建
export const complaintInsert = (params) => api.post(`complaint/insert`, params)




//按名字或id查找
export const complaintSearch = (params) => api.get(`complaint/search`,{params})
//删除
export const complaintDelet = (params) => api.get(`complaint/delete`,{params})

