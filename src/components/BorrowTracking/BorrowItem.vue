<template>
    <tr>
        <td> {{ borrow.userId.lastName }} {{ borrow.userId.firstName }} </td>
        <td class="text-center"> {{ formatDateTime(borrow.requestDate) }} </td>
        <td class="text-right"> {{ formatCurrency(borrow.price) }} đồng </td>
        <td class="text-center"> {{ formatDateTime(borrow.borrowDate) }} </td>
        <td class="text-center"> {{ formatDateTime(borrow.expectedReturnDate) }} </td>
        <td class="text-center"> {{ formatDateTime(borrow.actualReturnDate) }} </td>
        <td class="text-center"> {{ borrow.status }} </td>
        <td class="text-center"> {{ borrow.employeeId?.name }} </td>
        <td class="func">
            <div class="btn-container">
                <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-item"></btn>
                <btn v-if="borrow.status !== 'Đã hủy'" nameBtn="Cập nhật" styleBtn="btn-warning" class="btn-item" data-toggle="modal" :data-target="`#modal-${borrow._id}`"></btn>
            </div>
        </td>
    </tr>
    <div class="modal fade" :id="`modal-${borrow._id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Cập nhật trạng thái</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Đã xác nhận" v-model="selectedStatus">
                <label class="form-check-label" for="exampleRadios1">
                    Đã xác nhận
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Đã mượn" v-model="selectedStatus">
                <label class="form-check-label" for="exampleRadios2">
                    Đã mượn
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Đã trả" v-model="selectedStatus">
                <label class="form-check-label" for="exampleRadios3">
                    Đã trả
                </label>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="handleUpdate">Xác nhận</button>
            </div>
            </div>
        </div>
</div>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"
import { mapStores } from 'pinia';
import authStore from '@/stores/auth.store';

export default {
    computed: {
        ...mapStores(authStore),
        
    },
    props: {
        borrow: {
            type: Object,
            required: true
        }
    },
    emits: ['showDetail', 'update'],
    components: {
        Btn,
       
    },
    data() {
        return {
            selectedStatus: '',
            
        }
    },
    
    methods: {
        formatCurrency(amount) {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        formatDateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        shortForm(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        
        handleShowDetail() {
            this.$emit('showDetail', this.borrow)
        },
        handleUpdate() {
            if (this.selectedStatus === 'Đã xác nhận') {
                const employeeId = this.authStore.getUser._id;
            
                this.$emit('update', { id: this.borrow._id, status: this.selectedStatus, employeeId });
            } else {
                this.$emit('update', { id: this.borrow._id, status: this.selectedStatus});
            }
            $(`#modal-${this.borrow._id}`).modal('hide');
        }
    }
};
</script>

<style scoped>
td .btn-container {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 4px;
}

.btn-item {
    min-width: 100px;

    margin-top: 4px;
    display: block;
}
</style>