import api from './api';
 

//修改
export const physicalExaminationUpdate = (params) => api.post(`physicalExamination/update`, params)
//新建
export const physicalExaminationInsert = (params) => api.post(`physicalExamination/insert`, params)




//按名字或id查找
export const physicalExaminationSearch = (params) => api.get(`physicalExamination/search`,{params})
//分页查询
export const physicalExaminationPaging = (params) => api.get(`physicalExamination/paging`,{params})
//删除
export const physicalExaminationDelet = (params) => api.get(`physicalExamination/delete`,{params})

