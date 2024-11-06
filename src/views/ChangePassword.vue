<!-- Vue.js -->
<template>
    <div class="container">
        
        
            <title-form :title="titleForm"></title-form>
            <form class="border border-primary rounded p-3" @submit.prevent="changePassword">
                <div class="form-group">
                    <label for="oldPassword">Mật khẩu cũ</label>
                    <input class="form-control" v-model="oldPassword" type="password" id="oldPassword" placeholder="Nhâp mật khẩu cũ" required />
                </div>
                <div class="form-group">
                    <label for="newPassword">Mật khẩu mới</label>
                    <input class="form-control" v-model="newPassword" type="password" id="newPassword" placeholder="Nhâp mật khẩu mới" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Xác nhận mật khẩu mới</label>
                    <input class="form-control" v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Xác nhận mật khẩu" required />
                </div>
                <div class="d-flex justify-content-center">
                    <btn name-btn="Đổi mật khẩu" type="submit"></btn>
                </div>
                
            </form>
        
</div>
</template>

<script>
import EmployeeService from "@/services/employee.service";
import TitleForm from "@/components/Layouts/TitleForm.vue";
import Btn from "@/components/Layouts/Btn.vue";
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        TitleForm,
        Btn,
    },
    data() {
        return {
            titleForm: "Đổi mật khẩu",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        };
    },
    methods: {
        async changePassword() {
            event.preventDefault();
            
            
        if (this.newPassword !== this.confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp");
            return;
        }
        const response = await EmployeeService.changePassword(this.authStore.getUser._id, this.oldPassword, this.newPassword);
        if (response.status === "success") {
            alert("Mật khẩu đã được thay đổi");

            localStorage.removeItem("role")
            localStorage.removeItem("user")
            this.authStore.setRole(this.guestRole)
            this.role = this.guestRole
            if (this.$route?.meta?.requiresAuth) {
                this.$router.push({ name: "login" })
            }
        } else {
            alert(response.message);
        }
        },
    },
};
</script>
