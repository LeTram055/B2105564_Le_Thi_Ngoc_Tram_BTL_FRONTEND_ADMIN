<template>
    <div class="container">
        <div class="row my-2 justify-content-center">
            <greeting :title="title"></greeting>
            
        </div>

        <div class="row my-2 justify-content-between">
            <div>
                <btn nameBtn="Thêm" @click="createBook"></btn>
            </div>
            <div>
                <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
            </div>
        </div>
        
        <div class="row my-2">
            <table class="table table-bordered table-responsive">
                <thead class="">
                    <tr>
                        <th scope="col" class="text-center align-top">Sách</th>
                        <th scope="col" class="text-center align-top">Giá</th>
                        <th scope="col" class="text-center align-top">Số lượng</th>
                        <th scope="col" class="text-center align-top">Mô tả</th>
                        <th scope="col" class="text-center align-top">Tác giả</th>
                        <th scope="col" class="text-center align-top">Nhà xuất bản</th>
                        <th scope="col" class="text-center align-top">Năm xuất bản</th>
                        <th scope="col" class="text-center align-top">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <book-item v-for="book in filterBooks" :key="book.__uniqueKey || book._id" :book="book"
                        @deleteBook="handleDelete" @updateBook="handleUpdate">
                    </book-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Layouts/Greeting.vue';
import bookService from '@/services/book.service';
import Btn from '@/components/Layouts/Btn.vue';
import BookItem from '@/components/Book/BookItem.vue';
import InputSearch from '@/components/Layouts/InputSearch.vue';


export default {
    data() {
        return {
            title: 'Quản lý sách',
            books: [],
            filterBooks: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo sản phẩm, tác giả, nhà xuất bản"
        };
    },
    components: {
        Greeting,
        Btn,
        BookItem,
        InputSearch
    },
    beforeMount: async function() {
        await this.getBooks();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterBooks = this.books;
            else
                this.filterBooks = this.books.filter(book => {
                    return book.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        book.publisherId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterBooks = this.filterBooks.map(book => {
                book.__uniqueKey = new Date()
                return book
            })
        },
        async getBooks() {
            const res = await bookService.getBooks();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.books = res.data;
            this.books = this.books.reverse();
            this.filterBooks = this.books;
        },

        async reset() {
            await this.getBooks()
            this.filter()
        },

        createBook() {
            this.$router.push({
                name: 'createBook',
            });
        },
        handleUpdate(book) {
            this.$router.push({
                name: 'updateBook',
                params: {
                    id: book._id
                },
            });
        },
        async handleDelete(book) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                await this.deleteBook(book._id);
                await this.reset()
            }
        },
        async deleteBook(id) {
            const res = await bookService.deleteBook(id);
            if (res.status == "error")
                alert(res.message)
            
        },
        
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.input-search {
    margin-bottom: 12px;
}

.list-book {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.btn-add-book {
    margin: 0 auto;
}
</style>