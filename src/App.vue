<template>

    <header-app :role="role" @login="handleLogin" @logout="handleLogout"></header-app>
    <div class="container">
        <router-view @login="handleLogin"></router-view>
    </div>

    
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
        }
    }
}
</script>

<style>
/* .container {
    margin: 0 auto;
    margin-top: 12px;
    min-height: calc(100vh - 60px); 
    padding-top: 60px;
} */

.app-footer {
    width: 1024px;
    bottom: 0;
}
</style>