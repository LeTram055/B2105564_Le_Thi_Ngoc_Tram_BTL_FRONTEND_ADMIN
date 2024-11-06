<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <book-form :book="book" @submit="handleSubmit" class="mb-5"></book-form>
    </div>
</template>

<script>
import BookForm from "@/components/Book/BookForm.vue";
import TitleForm from "@/components/Layouts/TitleForm.vue";
import bookService from "@/services/book.service";

export default {
    components: {
        BookForm,
        TitleForm
    },
    data() {
        return {
            title: "Thêm sách",
            book: null,
        }
    },
    beforeMount: async function() {
        const id = this.$route.params.id
        if (id) {
            this.title = "Cập nhật sách"
            const res = await bookService.getBookById(id)
            if (res.status === "success") {
                this.book = res.data
            } else {
                alert(res.message)
            }
        }
    },
    methods: {
        async handleSubmit(data) {
            const { file, ...bookData } = data;

            // Tạo một FormData để gửi dữ liệu
            const formData = new FormData();
            for (const key in bookData) {
                formData.append(key, bookData[key]);
            }

            // Chỉ thêm file vào formData nếu có
            if (file) {
                formData.append("image", file);
            } else if (!bookData.image) {
                
                alert("Hình ảnh là bắt buộc!");
                return;
            }

            let resBook = null
            if (!this.$route.params.id) {
                resBook = await bookService.createBook(formData)
            } else {
                resBook = await bookService.updateBook(this.$route.params.id, formData)
            }
            alert(resBook.message)
            if (resBook.status == "success") {
                this.$router.push({ name: "books" })
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>