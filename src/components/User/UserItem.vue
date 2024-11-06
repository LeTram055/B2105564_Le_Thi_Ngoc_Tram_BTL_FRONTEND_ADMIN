<template>
    <tr>
        
        <td>
            {{ user.lastName }} {{ user.firstName }}
        </td>
        <td class="text-center">
            {{ formatDateTime(user.dateOfBirth) }}
        </td>
        <td class="text-center">
            {{ user.gender }}
        </td>
        <td class="text-center">
            {{ user.address }}
        </td>
        <td class="text-center">
            {{ user.phone }}
        </td>
        <td>
            {{ user.email }}
        </td>
        
    </tr>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    
    components: {
        Btn,
    },
    methods: {
        formatDateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
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