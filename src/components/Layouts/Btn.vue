<template>
    <button type="submit" :class="'btn ' + styleBtn" @click="handleSubmit"> {{ nameBtn }}</button>
</template>

<script>
export default {
    props: {
        nameBtn: {
            type: String,
            default: 'Lưu'
        },
        styleBtn: {
            type: String,
            default: 'btn-primary'
        }
    },
    emits: ['submit'],
    methods: {
        handleSubmit(event) {
            this.$emit('submit', event);
        }
    }
}
</script>

<style scoped>
button {
    min-width: 80px;
}
</style>