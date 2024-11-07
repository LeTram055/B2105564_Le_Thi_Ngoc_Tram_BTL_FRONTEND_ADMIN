<template>
    <div class="container">
        <div class="row my-2 justify-content-center">
            <greeting :title="title"></greeting>
            
        </div>

        <div class="row my-2 justify-content-center">
            <div>
                <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
            </div>
        </div>
        
        <div class="row my-2">
            <table class="table table-bordered table-responsive-lg">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="text-center align-top">Tên</th>
                        <th scope="col" class="text-center align-top">Ngày sinh</th>
                        <th scope="col" class="text-center align-top">Giới tính</th>
                        <th scope="col" class="text-center align-top">Địa chỉ</th>
                        <th scope="col" class="text-center align-top">Số điện thoại</th>
                        <th scope="col" class="text-center align-top">Email</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <user-item v-for="user in filterUsers" :key="user.__uniqueKey || user._id" :user="user">
                    </user-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import userService from '@/services/user.service';
import UserItem from '@/components/User/UserItem.vue';
import InputSearch from '@/components/Layouts/InputSearch.vue';


export default {
    data() {
        return {
            title: 'Quản lý người đọc',
            users: [],
            filterUsers: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo tên, địa chỉ người đọc"
        };
    },
    components: {
        Greeting,
        UserItem,
        InputSearch
    },
    beforeMount: async function() {
        await this.getUsers();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterUsers = this.users;
            else
                this.filterUsers = this.users.filter(user => {
                    return user.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        user.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        user.address?.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterUsers = this.filterUsers.map(user => {
                user.__uniqueKey = new Date()
                return user
            })
        },
        async getUsers() {
            const res = await userService.getUsers();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.users = res.data;
            this.users = this.users.reverse();
            console.log(this.users);

            
            this.filterUsers = this.users;
        },
        
    },
}
</script>

<style scoped>
.input-search {
    margin-bottom: 12px;
}

</style>