<template>

    <div class="col-sm-6 my-2">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text">{{ item.address }}</p>
        <div class="btn-container d-flex justify-content-center">
            <btn nameBtn="Sửa" styleBtn="btn-warning" @click="handleUpdate(item)" class="btn-item"></btn>
            <btn nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete(item)" class="btn-item"></btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue";

export default {
    components: {
        Btn,
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['update', 'delete'],
    methods: {
        handleUpdate() {
            this.$emit('update', this.item);
        },
        handleDelete() {
            this.$emit('delete', this.item);
        }
    }
};
</script>

<style scoped>

.btn-item {
    margin: 4px;
} 

.card-body {
    display: flex;
    flex-direction: column;
}
.btn-container {
    margin-top: auto; 
    
}
</style>