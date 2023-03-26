import api from './api';
 

//修改
export const makeAppointmentUpdate = (params) => api.post(`makeAppointment/update`, params)
//新建
export const makeAppointmentInsert = (params) => api.post(`makeAppointment/insert`, params)




//按名字或id查找
export const makeAppointmentSearch = (params) => api.get(`makeAppointment/search`,{params})
//删除
export const makeAppointmentDelet = (params) => api.get(`makeAppointment/delete`,{params})

