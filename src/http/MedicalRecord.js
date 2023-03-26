import api from './api';
 

//修改
export const seeDoctorUpdate = (params) => api.post(`seeDoctor/update`, params)
//新建
export const seeDoctorInsert = (params) => api.post(`seeDoctor/insert`, params)




//按名字或id查找
export const seeDoctorSearch = (params) => api.get(`seeDoctor/search`,{params})
//分页查询
export const seeDoctorPaging = (params) => api.get(`seeDoctor/paging`,{params})
//删除
export const seeDoctorDelet = (params) => api.get(`seeDoctor/delete`,{params})

