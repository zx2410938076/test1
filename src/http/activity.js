import api from './api';





//修改信息
export const activityUpdate = (params) => api.post(`activity/update`, params)
//新建
export const activityInsert = (params) => api.post(`activity/insert`, params)





//分页查询信息
export const activityPaging = (params) => api.get(`activity/paging`,{params})
//删除
export const activityDelet = (params) => api.get(`activity/delete`,{params})