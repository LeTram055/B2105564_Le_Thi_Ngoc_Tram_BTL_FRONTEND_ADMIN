<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <employee-form :employee="employee" @submit="handleSubmit" class="mb-5"></employee-form>
    </div>
</template>

<script>
import EmployeeForm from "@/components/Employee/EmployeeForm.vue";
import TitleForm from "@/components/Layouts/TitleForm.vue";
import employeeService from "@/services/employee.service";

export default {
    components: {
        EmployeeForm,
        TitleForm
    },
    data() {
        return {
            title: "Thêm nhân viên",
            employee: null,
        }
    },
    beforeMount: async function() {
        const id = this.$route.params.id
        if (id) {
            this.title = "Cập nhật cập nhật"
            const res = await employeeService.getEmployeeById(id)
            if (res.status === "success") {
                this.employee = res.data
            } else {
                alert(res.message)
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            let resEmployee = null
            if (!this.$route?.params?.id) {
                resEmployee = await employeeService.createEmployee(data)
            } else {
                resEmployee = await employeeService.updateEmployee(this.$route.params.id, data)
            }
            alert(resEmployee.message)
            if (resEmployee.status == "success") {
                this.$router.push({ name: "employees" })
            }
        }
        
    }

}
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>