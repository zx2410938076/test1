import api from './api';
 

//修改
export const hospitalAppointmentUpdate = (params) => api.post(`hospitalAppointment/update`, params)
//新建
export const hospitalAppointmentInsert = (params) => api.post(`hospitalAppointment/insert`, params)




//按名字或id查找
export const hospitalAppointmentSearch = (params) => api.get(`hospitalAppointment/search`,{params})
//删除
export const hospitalAppointmentDelet = (params) => api.get(`hospitalAppointment/delete`,{params})
//分页查询信息
export const hospitalAppointmentPaging = (params) => api.get(`hospitalAppointment/paging`,{params})

