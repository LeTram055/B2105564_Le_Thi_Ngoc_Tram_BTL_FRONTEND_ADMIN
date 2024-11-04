import { createWebHistory, createRouter } from "vue-router";
import useAuthStore from "@/stores/auth.store.js";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Publisher from "@/views/Publisher.vue";
import UpdatePublisher from "@/views/UpdatePublisher.vue";
import Book from "@/views/Book.vue";
import UpdateBook from "@/views/UpdateBook.vue";
import Employee from "@/views/Employee.vue";
import UpdateEmployee from "@/views/UpdateEmployee.vue";

import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/",
        redirect: "/admin",
    },
    {
        path: "/admin",
        props: true,
        children: [
            {
                path: "",
                component: Home,
                name: "adminHome",
            },
            {
                path: "books",
                children: [
                    {
                        path: "",
                        component: Book,
                        name: "books",
                    },
                    {
                        path: "update-book/:id",
                        component: UpdateBook,
                        name: "updateBook",
                    },
                    {
                        path: "create-book",
                        component: UpdateBook,
                        name: "createBook",
                    },
                ]
            },

            {
                path: "publishers",
                children: [
                    {
                        path: "",
                        component: Publisher,
                        name: "publishers",
                    },
                    {
                        path: "update-publisher/:id",
                        component: UpdatePublisher,
                        name: "updatePublisher",
                    },
                    {
                        path: "create-publisher",
                        component: UpdatePublisher,
                        name: "createPublisher",
                    },
                ]
            },

            {
                path: "employees",
                children: [
                    {
                        path: "",
                        component: Employee,
                        name: "employees",
                    },
                    {
                        path: "update-employee/:id",
                        component: UpdateEmployee,
                        name: "updateEmployee",
                    },
                    {
                        path: "create-employee",
                        component: UpdateEmployee,
                        name: "createEmployee",
                    },
                ]
            },
        ],
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.loadRoleFromLocalStorage();

    if (!to.meta.requiresAuth) {
        return next()
    }

    const role = authStore.getRole
    if (role != to.meta.role) {
        return next({ name: 'login' })
    }
    return next()
});

export default router;