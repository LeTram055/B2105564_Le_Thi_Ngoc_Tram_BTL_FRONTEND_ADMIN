<template>
        
    <nav class="navbar navbar-expand-lg navbar-dark fixed-navbar">
        <router-link :to="{ name: 'adminHome' }" class="navbar-brand">
            <img src="../../../src/assets/images/logo.png" width="30" height="30" class="navbar-logo" alt="Logo">
        </router-link>
        <button class="navbar-toggler mb-3 mr-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse nav-bg" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <nav-item :title="'Trang chủ'" :routerName="'adminHome'" class="navbar-brand"></nav-item>
                </li>
                <li class="nav-item">
                    <nav-item :title="'Sách'" :routerName="'books'" class="navbar-brand"></nav-item>
                </li>
                <li class="nav-item">
                    <nav-item :title="'Nhà xuất bản'" :routerName="'publishers'" class="navbar-brand"></nav-item>
                </li>
                <li class="nav-item">
                    <nav-item v-if="role == adminRole" :title="'Nhân viên'" :routerName="'employees'" class="navbar-brand"></nav-item>
                </li>
                <li class="nav-item">
                    <nav-item :title="'Duyệt đơn mượn'" :routerName="'borrowTrackings'" class="navbar-brand"></nav-item>
                </li>
            </ul>
        <div class="ml-auto mr-2">
            <button v-if="role === guestRole" class="btn btn-light login-btn" @click="login">
                Đăng nhập
            </button>
            <button v-else-if="role === employeeRole || role === adminRole" class="btn btn-light logout-btn" @click="logout">
                Đăng xuất
            </button>
        </div>
        </div>
    </nav>
</template>

<script>
import NavItem from "@/components/Layouts/NavItem.vue";

export default {
    components: {
        NavItem,
    },
    props: {
        role: {
            type: String,
            default: "guest"
        }
    },
    emits: ['login', 'logout'],
    data() {
        return {
            guestRole: "guest",
            employeeRole: "employee",
            adminRole: "admin"            
        }
        
    },
    methods: {
        login() {
            this.$emit('login');
        },
        logout() {
            this.$emit('logout');
        }
    }
}
</script>

<style scoped>
.fixed-navbar {
    height: 55px;
    padding: 0px;
    background-color: blue;
   
}

/* Tăng kích thước hình ảnh mà không làm tăng kích thước navbar */
.navbar-logo {
    width: 50px; /* Điều chỉnh kích thước phù hợp */
    height: auto;
    margin-left: 5px;
}

.nav-bg {
    
    background-color: blue;
}
@media (max-width: 986px) {
    .navbar-brand, .login-btn, .logout-btn {
        margin: 0px 10px 10px 15px;
        
    }
}
</style>
