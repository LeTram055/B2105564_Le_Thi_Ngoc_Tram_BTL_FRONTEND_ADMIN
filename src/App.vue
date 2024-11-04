<template>

    <header-app :role="role" @login="handleLogin" @logout="handleLogout"></header-app>
    
    <router-view @login="handleLogin"></router-view>
    

    
</template>

<script>
import HeaderApp from "@/components/Layouts/HeaderApp.vue"
import FooterApp from "@/components/Layouts/FooterApp.vue"
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        HeaderApp,
        FooterApp,
    },
    data() {
        return {
            adminRole: "admin",
            employeeRole: "employee",
            guestRole: "guest",
            role: "guest"
        }
    },
    methods: {
        handleLogin() {
            const role = localStorage.getItem("role")
            if (role == this.adminRole) {
                this.authStore.setRole(this.adminRole)
                const admin = JSON.parse(localStorage.getItem("user"))
                this.role = this.adminRole
                this.authStore.setUser(admin)
                this.$router.push({ name: "adminHome" })
                return
            } else if (role == this.employeeRole) { // Kiểm tra vai trò nhân viên
                this.authStore.setRole(this.employeeRole);
                const employee = JSON.parse(localStorage.getItem("user"));
                this.role = this.employeeRole;
                this.authStore.setUser(employee);
                this.$router.push({ name: "adminHome" }); // Chuyển hướng đến trang dành cho nhân viên
                return;
            }
            this.role = this.guestRole
            this.$router.push({ name: "login" })
        },
        handleLogout() {
            localStorage.removeItem("role")
            localStorage.removeItem("user")
            this.authStore.setRole(this.guestRole)
            this.role = this.guestRole
            if (this.$route?.meta?.requiresAuth) {
                this.$router.push({ name: "login" })
            }
        },
        // Hàm này sẽ được gọi trong mounted để khôi phục vai trò từ localStorage
        loadRoleFromLocalStorage() {
            const role = localStorage.getItem("role") || this.guestRole;
            const user = JSON.parse(localStorage.getItem("user") || null);

            if (role === this.userRole) {
                this.authStore.setRole(this.userRole);
                this.role = this.userRole;
                if (user) {
                    this.authStore.setUser(user);
                }
            } else {
                this.authStore.setRole(this.guestRole);
                this.role = this.guestRole;
            }
        }
    },
    mounted() {
        this.loadRoleFromLocalStorage();
    }
}
</script>

<style>

.app-footer {
    width: 1024px;
    bottom: 0;
}
</style>