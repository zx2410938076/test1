import Vue from "vue";
import Router from 'vue-router'
import Home from '../components/common/Home'
import DoctorInformation from '../components/pages/Administrator/DoctorInformation'
import MedicalRecord from '../components/pages/Administrator/MedicalRecord'
import DrugManagement from '../components/pages/Administrator/DrugManagement'
import FirstPage from "../components/pages/Administrator/FirstPage";
import Login from "@/components/common/Login"
import OldMan from "@/components/pages/Administrator/OldMan"

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
                    path: '/DoctorInformation',
                    name: 'DoctorInformation',
                    component: DoctorInformation
                },
                {
                    path: '/MedicalRecord',
                    name: 'MedicalRecord',
                    component: MedicalRecord
                },
                {
                    path: '/DrugManagement',
                    name: 'DrugManagement',
                    component: DrugManagement
                },
            ]
        },
        {
            path: '/Login',
            name: 'login',// 主路由
            component: Login,
        }
    ]
})