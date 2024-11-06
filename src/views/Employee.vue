<template>
    <div class="container">
        <div class="row my-2 justify-content-center">
            <greeting :title="title"></greeting>
            
        </div>

        <div class="row my-2 justify-content-between">
            <div>
                <btn nameBtn="Thêm" @click="createEmployee"></btn>
            </div>
            <div>
                <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
            </div>
        </div>
        
        <div class="row my-2">
            <table class="table table-bordered table-responsive-lg">
                <thead class="">
                    <tr>
                        <th scope="col" class="text-center align-top">Tên</th>
                        <th scope="col" class="text-center align-top">Chức vụ</th>
                        <th scope="col" class="text-center align-top">Địa chỉ</th>
                        <th scope="col" class="text-center align-top">Số điện thoại</th>
                        <th scope="col" class="text-center align-top">Email</th>
                        <th scope="col" class="text-center align-top">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <employee-item v-for="employee in filterEmployees" :key="employee.__uniqueKey || employee._id" :employee="employee"
                        @deleteEmployee="handleDelete" @updateEmployee="handleUpdate">
                    </employee-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import employeeService from '@/services/employee.service';
import Btn from '@/components/Layouts/Btn.vue';
import EmployeeItem from '@/components/Employee/EmployeeItem.vue';
import InputSearch from '@/components/Layouts/InputSearch.vue';


export default {
    data() {
        return {
            title: 'Quản lý nhân viên',
            employees: [],
            filterEmployees: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo tên, chức vụ, địa chỉ nhân viên"
        };
    },
    components: {
        Greeting,
        Btn,
        EmployeeItem,
        InputSearch
    },
    beforeMount: async function() {
        await this.getEmployees();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterEmployees = this.employees;
            else
                this.filterEmployees = this.employees.filter(employee => {
                    return employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        employee.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        employee.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterEmployees = this.filterEmployees.map(employee => {
                employee.__uniqueKey = new Date()
                return employee
            })
        },
        async getEmployees() {
            const res = await employeeService.getEmployees();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.employees = res.data;
            this.employees = this.employees.reverse();
            this.filterEmployees = this.employees;
        },

        async reset() {
            await this.getEmployees()
            this.filter()
        },

        createEmployee() {
            this.$router.push({
                name: 'createEmployee',
            });
        },
        handleUpdate(employee) {
            this.$router.push({
                name: 'updateEmployee',
                params: {
                    id: employee._id
                },
            });
        },
        async handleDelete(employee) {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
                await this.deleteEmployee(employee._id);
                await this.reset()
            }
        },
        async deleteEmployee(id) {
            const res = await employeeService.deleteEmployee(id);
            if (res.status == "error")
                alert(res.message)
            
        },
        
    },
}
</script>

<style scoped>
.input-search {
    margin-bottom: 12px;
}

</style>