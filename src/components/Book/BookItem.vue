<template>
    <tr>
        <td>
            <div class="book">
                <img :src="`${BASE_URL}${book.image}`" alt="Sản phẩm" width="100" height="100" class="book-img">
                <p class="book-name">
                    {{ shortText(book.name )}}
                </p>
            </div>
        </td>
        <td class="text-center">
            {{ formatPrice(book.price) }} đồng
        </td>
        <td class="text-center">
            {{ book.quantity }}
        </td>
        <td>
            <button type="button" class="btn btn-outline-secondary btn-description" :data-target="`#modal-${book._id}`" data-toggle="modal">
                Xem
            </button>

            <!-- Modal -->
            <div class="modal fade" :id="`modal-${book._id}`" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">{{ book.name }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body text-justify">
                            {{ book.description }}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </td>
        <td>
            {{ book.author }}
        </td>
        <td>
            {{ book.publisherId.name }}
        </td>
        <td class="text-center">
            {{ book.publishYear }}
        </td>
        <td>
            <btn nameBtn="Sửa" styleBtn="btn-warning" @click="handleUpdate" class="btn-item"></btn>
            <btn nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete" class="btn-item"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue"

export default {
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    data() {
        console.log(import.meta.env.VITE_APP_BASE_URL);
        return {
            
            BASE_URL: import.meta.env.VITE_APP_BASE_URL // Truy cập biến môi trường
        }
    },
    emits: ['deleteBook', 'updateBook'],
    components: {
        Btn,
    },
    methods: {
        formatPrice(price) {
        if (!price) return "0";
        return price.toLocaleString('vi-VN');
        },
        shortText(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        handleDelete() {
            this.$emit('deleteBook', this.book);
        },
        handleUpdate() {
            console.log(this.book);
            this.$emit('updateBook', this.book);

        }
    }
};
</script>

<style scoped>
.book {
    display: flex;
}

.book .book-name {
    margin-left: 10px;
    padding: 0;
    /*font-size: 14px;*/
}

.book .book-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

.btn-item {
    margin-top: 4px;
    display: block;
}

/* .btn-description {
    width: 120px;
} */
</style>