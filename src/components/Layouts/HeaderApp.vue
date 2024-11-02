<template>
        
    <nav class="navbar navbar-expand-lg navbar-dark fixed-navbar" style="background-color: blue;">
        <router-link :to="{ name: 'adminHome' }" class="navbar-brand">
            <img src="../../../src/assets/images/logo.png" width="30" height="30" class="navbar-logo" alt="Logo">
        </router-link>
        <nav-item :title="'Trang chủ'" :routerName="'adminHome'" class="navbar-brand"></nav-item>
        <!-- <nav-item :title="'Sách'" :routerName="'productPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Nhà xuất bản'" :routerName="'publisherPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Duyệt đơn hàng'" :routerName="'orderPage'" class="navbar-brand"></nav-item> -->
        <div class="btn-group dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                aria-expanded="false">
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <div v-if="role==guestRole" class="dropdown-item login-btn" @click="login">Đăng nhập</div>
                <div v-if="role==adminRole || role==employeeRole" class="dropdown-item logout-btn" @click="logout">Đăng xuất</div>
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
    height: 50px; /* Chọn chiều cao phù hợp */
    padding: 0 10px;
}

/* Tăng kích thước hình ảnh mà không làm tăng kích thước navbar */
.navbar-logo {
    width: 50px; /* Điều chỉnh kích thước phù hợp */
    height: auto;
}

.dropdown {
    margin-left: auto;
}
.login-btn:hover, .logout-btn:hover {
    cursor: pointer;
}
</style>
