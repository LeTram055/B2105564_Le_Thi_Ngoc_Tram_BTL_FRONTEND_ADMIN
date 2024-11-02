<template>
    <div class="container">
        <login :isRegister="isRegister" :titleForm="titleForm"></login>
    </div>
</template>

<script>
import Login from "@/components/Auth/Auth.vue";

export default {
    data() {
        return {
            isRegister: true,
            titleForm: 'Đăng ký',
        };
    },
    components: {
        Login,
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>