<template>
    <h2 class="title">
        {{ title }}
    </h2>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    
    }
};
</script>

<style scoped>
.title {
    text-align: center;
    padding: 20px 8px;
}
</style>