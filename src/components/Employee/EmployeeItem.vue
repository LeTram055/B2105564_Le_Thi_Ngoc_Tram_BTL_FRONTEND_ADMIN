<template>
    <tr>
        
        <td>
            {{ employee.name }}
        </td>
        <td>
            {{ employee.position }}
        </td>
        <td>
            {{ employee.address }}
        </td>
        <td>
            {{ employee.phone }}
        </td>
        <td>
            {{ employee.email }}
        </td>
        
        <td class=" d-flex justify-content-center ">
            <btn nameBtn="Sửa" styleBtn="btn-warning" @click="handleUpdate" class="btn-item"></btn>
            <btn nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete" class="btn-item"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"

export default {
    props: {
        employee: {
            type: Object,
            required: true
        }
    },
    
    emits: ['deleteEmployee', 'updateEmployee'],
    components: {
        Btn,
    },
    methods: {
        handleDelete() {
            this.$emit('deleteEmployee', this.employee);
        },
        handleUpdate() {
            console.log(this.employee);
            this.$emit('updateEmployee', this.employee);

        }
    }
};
</script>

<style scoped>

.btn-item {
    margin-top: 4px;
    margin-right: 4px;
    margin-left: 4px;
    display: block;
}

</style>