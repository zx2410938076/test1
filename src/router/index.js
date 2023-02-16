import Vue from "vue";
import Router from 'vue-router'
import Home from '../components/common/Home'
import IndividualCenter from '../components/pages/IndividualCenter'
import CommunityManagement from '../components/pages/CommunityManagement'
import Service from '../components/pages/Service'
import DoctorInformation from '../components/pages/DoctorInformation'
import MedicalRecord from '../components/pages/MedicalRecord'
import DrugManagement from '../components/pages/DrugManagement'
import Index from "../components/pages/Index";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',// 主路由
            component: Home,
            redirect:"Index",
            children: [
                {
                    path: '/Index',
                    name: 'Index',
                    component: Index
                },
                {
                    path: '/IndividualCenter',
                    name: 'IndividualCenter',
                    component: IndividualCenter
                },
                {
                    path: '/CommunityManagement',
                    name: 'CommunityManagement',
                    component: CommunityManagement
                },
                {
                    path: '/Service',
                    name: 'Service',
                    component: Service
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
            component: Home,
        }
    ]
})