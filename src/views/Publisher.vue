<template>
    <div class="container">
        <div class="row my-2 justify-content-center">
            <greeting :title="title"></greeting>
        </div>

        <div class="row my-2 justify-content-between pd">
            <div>
                <btn nameBtn="Thêm" @click="addPublisher"></btn>
            </div>
            <div>
                <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
            </div>
        </div>

        <div class="row my-2">
            <publisher-card 
                 
                v-for="publisher in filterPublishers" 
                :item="publisher" 
                :key="publisher.__uniqueKey || publisher._id"
                @update="handleUpdate"
                @delete="handleDelete"
                >
            </publisher-card>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import Btn from '@/components/Layouts/Btn.vue';
import InputSearch from '@/components/Layouts/InputSearch.vue';
import PublisherCard from '@/components/Publisher/PublisherCard.vue';
import publisherService from '@/services/publisher.service';

export default {
    data() {
        return {
            title: 'Quản lý nhà xuất bản',
            publishers: [],
            filterPublishers: [],
            searchBy: "Tìm kiếm theo tên, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        Greeting,
        Btn,
        InputSearch,
        PublisherCard,
    },
    beforeMount: async function() {
        await this.getPublishers()
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterPublishers = this.publishers;
            else
                this.filterPublishers = this.publishers.filter(publisher => {
                    return publisher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        publisher.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterPublishers = this.filterPublishers.map(publisher => {
                publisher.__uniqueKey = new Date()
                return publisher
            })
        },
        async reset() {
            await this.getPublishers()
            this.filter()
        },
        async getPublishers() {
            const res = await publisherService.getPublishers();
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.publishers = res.data;
                this.filterPublishers = this.publishers;
            }
            this.filterPublishers = this.publishers;
        },
        addPublisher() {
            this.$router.push({
                name: 'createPublisher',
            });
        },
        handleUpdate(publisher) {
            this.$router.push({
                name: 'updatePublisher',
                params: {
                    id: publisher._id,
                },
            });
        },
        async handleDelete(publisher) {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                const resDeletePublisher = await publisherService.deletePublisher(publisher._id)
                if (resDeletePublisher.status == "error")
                    alert(resDeletePublisher.message)
                await this.reset()
            }
        },
    },
}
</script>

<style scoped>
.pd {
    padding: 0 15px;
}

</style>