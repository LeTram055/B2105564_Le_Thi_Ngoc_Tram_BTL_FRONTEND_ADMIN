<template>
    <div class="container">
        <div class="row my-3 justify-content-center">
            <greeting :title="title"></greeting>
        </div>
        <div class="row>">
            <table class="table table-bordered table-responsive-lg">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" class="text-center align-middle">Sách</th>
                        <th scope="col" class="text-center align-middle">Giá</th>
                        <th scope="col" class="text-center align-middle">Số lượng</th>
                        <th scope="col" class="text-center align-middle">Thành tiền</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <borrow-detail-item 
                        v-for="borrowDetail in borrowTrackingItems" 
                        :key="borrowDetail._id" 
                        :borrow-detail="borrowDetail"
                    >
                    </borrow-detail-item>
                </tbody>
                
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import borrowTrackingService from '@/services/borrowTracking.service';
import BorrowDetailItem from '@/components/BorrowTracking/BorrowDetailItem.vue';

export default {
    components: {
        Greeting,
        BorrowDetailItem,
    },
    data() {
        return {
            title: 'Chi tiết mượn sách',
            borrowTrackingItems: [],
            
        };
    },
    beforeMount: async function () {
        const id = this.$route.params.id;
        const res = await borrowTrackingService.getBorrowTracking(id);
        if (res.status == "error") {
            alert(res.message);
            this.$router.push({
                name: "borrowTrackings",
            });
        }
        
        this.borrowTrackingItems = res.data.borrowDetails;
        
    }
};
</script>

<style scoped>
</style>