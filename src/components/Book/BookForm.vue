<template>
    <form class="border border-primary rounded p-3" enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên sách</label>
            <input type="text" placeholder="Nhập tên sách" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="image">Hình ảnh</label>
            <br>
            <input type="file" ref="file" @change="onSelect" />
            <div class="message text-danger">
                <p>{{ message }}</p>
            </div>
            <div v-if="image">
                <!-- Hiển thị ảnh đã chọn hoặc ảnh hiện tại trong chế độ chỉnh sửa -->
                <img :src="image.startsWith('data:') ? image : `${BASE_URL}${image}`" alt="Ảnh đã chọn" class="image-loaded" />
            </div>
        </div>

        <div class="form-group">
            <label for="price">Giá</label>
            <input type="text" placeholder="Nhập giá sách" class="form-control" id="price" v-model="price">
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <input type="text" placeholder="Nhập số lượng sách" class="form-control" id="quantity" v-model="quantity">
        </div>

        <div class="form-group">
            <label for="publishYear">Năm xuất bản</label>
            <input type="text" placeholder="Nhập năm xuất bản" class="form-control" id="publishYear" v-model="publishYear">
        </div>

        <div class="form-group">
            <label for="publisherId">Nhà xuất bản</label>
            <select class="form-control" id="publisherId" v-model="publisherId">
                <option value="" disabled selected>Chọn nhà xuất bản</option>
                <option v-for="publisher in publishers" :key="publisher._id" :value="publisher._id">
                    {{ publisher.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="author">Tên tác giả</label>
            <input type="text" placeholder="Nhập tác giả" class="form-control" id="author" v-model="author">
        </div>

        <div class="form-group">
            <label for="describe">Mô tả</label>
            <textarea class="form-control" placeholder="Nhập mô tả" id="describe" v-model="description" style="height: 160px"></textarea>
        </div>

        <div class="submit-form">
            <btn @submit="handleSubmit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue";
import publisherService from "@/services/publisher.service";

export default {
    props: {
        book: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    data() {
        return {
            _id: null,
            name: "",
            price: null,
            quantity: null,
            publishYear: null,
            publisherId: "",
            description: "",
            author: "",
            file: null,
            image: null,
            message: "",
            BASE_URL: import.meta.env.VITE_APP_BASE_URL,
            publishers: [],
        }
    },
    components: {
        Btn,
    },
    watch: {
        book(newVal, oldVal) {
            this.formData(newVal);
        }
    },
    created() {
        this.getPublisher();
    },
    methods: {
        formData(book) {
            if (book) {
                this.name = book.name;
                this.price = book.price;
                this.quantity = book.quantity;
                this.publishYear = book.publishYear;
                this.publisherId = book.publisherId._id;
                this.description = book.description;
                this.author = book.author;
                this.image = book.image;
                if (book._id)
                    this._id = book._id;
            }
        },
        onSelect() {
            this.message = "";
            this.file = null;
            this.image = "";

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Loại file không đúng, vui lòng tải lại file!";
                return;
            }
            if (file.size > 10000000) {
                this.message = "Kích thước file tối đa 1000kb, vui lòng tải lại file!";
                return;
            }
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.image = await theReader.result;
            };
            theReader.readAsDataURL(file);
        },
        async handleSubmit(event) {
            event.preventDefault();
            const data = {
                name: this.name,
                price: this.price,
                quantity: this.quantity,
                publishYear: this.publishYear,
                publisherId: this.publisherId,
                description: this.description,
                author: this.author,
                image: this.image,
                ...(this.file && { file: this.file }),
            }
            this.$emit("submit", data);
        },
        async getPublisher() {
            const res = await publisherService.getPublishers();
            if (res.status == "error") {
                alert(res.message);
                return;
            }
            this.publishers = res.data;
        }
    },
}


</script>

<style scoped>
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.image-loaded {
    width: 150px;
    height: 200px;
}
</style>