<template>
    <form class="border border-primary rounded p-3" enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên nhân viên</label>
            <input type="text" placeholder="Nhập tên nhân viên" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="position">Chức vụ</label>
            <input type="text" placeholder="Nhập chức vụ nhân viên" class="form-control" id="position" v-model="position">
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input type="text" placeholder="Nhập địa chỉ" class="form-control" id="address" v-model="address">
        </div>

        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input type="text" placeholder="Nhập số điện thoại" class="form-control" id="phone" v-model="phone">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" placeholder="Nhập email" class="form-control" id="email" v-model="email">
        </div>

        <div class="form-group" v-if="!_id">
            <label for="password">Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" class="form-control" id="password" v-model="password">
        </div>

        <div class="submit-form">
            <btn @submit="handleSubmit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue";

export default {
    props: {
        employee: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    data() {
        return {
            _id: null,
            name: "",
            position: null,
            address: null,
            phone: null,
            email: "",
            password: "",
            
        }
    },
    components: {
        Btn,
    },
    watch: {
        employee(newVal, oldVal) {
            this.formData(newVal);
        }
    },
    created() {
        if (this.employee) {
            this.formData(this.employee);
        }
    },
    methods: {
        formData(employee) {
            if (employee) {
                this.name = employee.name;
                this.position = employee.position;
                this.address = employee.address;
                this.phone = employee.phone;
                this.email = employee.email;
                this.password = employee.password;
                if (employee._id)
                    this._id = employee._id;
            }
        },
        
        async handleSubmit(event) {
            event.preventDefault();
            const data = {
                name: this.name,
                position: this.position,
                address: this.address,
                phone: this.phone,
                email: this.email,
                password: this.password,
            }
            
            this.$emit("submit", data);
        },
    },
}


</script>

<style scoped>
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.image-loaded {
    width: 150px;
    height: 200px;
}
</style>