<template>
    <div class="home-page">
        <greeting :title="tilte"></greeting>
    </div>
</template>

<script>
import Greeting from "@/components/Layouts/Greeting.vue";
export default {
    data() {
        return {
            tilte: "Chào mừng bạn đến với trang quản trị!",
        };
    },
    components: {
        Greeting,
    },
}
</script>

<style scoped>

.home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
}
</style>