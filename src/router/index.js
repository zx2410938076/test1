import Vue from "vue";
import Router from 'vue-router'
import Home from '../components/common/Home'
import PhysicalExamination from '../components/pages/Doctor/PhysicalExamination'
import MedicalRecord from '../components/pages/Doctor/MedicalRecord'
import MakeAppointment from '../components/pages/Doctor/MakeAppointment'
import FirstPage from "../components/pages/Administrator/FirstPage";
import Login from "@/components/common/Login"
import OldMan from "@/components/pages/Administrator/OldMan"
import Dishes from "@/components/pages/Canteen/Dishes"
import Complaint from "@/components/pages/Complaint"
import Request from "@/components/pages/Administrator/Request"
import Abnormal from "@/components/pages/Doctor/Abnormal"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',// 主路由
            component: Home,
            redirect:"FirstPage",
            children: [
                {
                    path: '/FirstPage',
                    name: 'FirstPage',
                    component: FirstPage
                },
                {
                    path: '/OldMan',
                    name: 'OldMan',
                    component: OldMan
                },
                {
                    path: '/PhysicalExamination',
                    name: 'PhysicalExamination',
                    component: PhysicalExamination
                },
                {
                    path: '/MedicalRecord',
                    name: 'MedicalRecord',
                    component: MedicalRecord
                },
                {
                    path: '/MakeAppointment',
                    name: 'MakeAppointment',
                    component: MakeAppointment
                },
                {
                    path:'/Dishes',
                    name: 'Dishes',
                    component:Dishes
                },
                {
                    path:'/Complaint',
                    name: 'Complaint',
                    component:Complaint
                },
                {
                    path:'/Request',
                    name: 'Request',
                    component:Request
                },
                {
                    path:'/Abnormal',
                    name: 'Abnormal',
                    component:Abnormal
                }
            ]
        },
        ,
        {
            path: '/Login',
            name: 'login',// 主路由
            component: Login,
        }
    ]
})