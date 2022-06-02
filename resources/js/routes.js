import { createWebHistory, createRouter } from "vue-router";
import Form from "./components/Form.vue";
import List from "./components/List.vue";
import Sidebar from "./components/Sidebar.vue";
import Banklist from "./components/Banklist.vue";
import Bankform from "./components/Bankform.vue";
import AccountList from "./components/AccountList.vue";
import Accountform from "./components/Accountform.vue";
import BranchList from "./components/BranchList.vue";
import Branchform from "./components/Branchform.vue";
import Demo from "./components/Demo.vue";
const routes = [
    {
        name: "List",
        path: "/",
        component: List,
    },
    {
        name: "Banklist",
        path: "/banks",
        component: Banklist,
    },
    {
        name: "Branchlist",
        path: "/branches",
        component: BranchList,
    },
    {
        name: "Accountlist",
        path: "/accounts",
        component: AccountList,
    },
    {
        name: "Form",
        path: "/form/:id?",
        component: Form,
    },
    {
        name: "Bankform",
        path: "/bank/form/:id?",
        component: Bankform,
    },
    {
        name: "Accountform",
        path: "/account/form/:id?",
        component: Accountform,
    },
    {
        name: "Branchform",
        path: "/branch/form/:id?",
        component: Branchform,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export { router };
