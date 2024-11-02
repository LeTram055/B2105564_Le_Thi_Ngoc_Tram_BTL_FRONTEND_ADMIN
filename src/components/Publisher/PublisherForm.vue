<template>
    <form class="border border-primary rounded p-3" enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <input type="text" class="form-control" id="name" v-model="name" placeholder="Nhập tên nà xuất bản">
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <textarea type="text" class="form-control" id="address" v-model="address" rows="3" placeholder="Nhập địa chỉ"></textarea>
        </div>
        <div class="submit-form">
            <btn @submit="handleSubmit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Layouts/Btn.vue";

export default {
    props: {
        publisher: {
            type: Object,
            default: null,
        }
    },
    emits: ['submit'],
    data() {
        return {
            name: "",
            address: "",
        };
    },
    components: {
        Btn,
    },
    watch: {
        publisher(newVal, oldVal) {
            this.formData(newVal);
        }
    },
    methods: {
        formData(publisher) {
            if (publisher) {
                this.name = publisher.name;
                this.address = publisher.address;
                if (publisher._id) {
                    this._id = publisher._id;
                }
            }
        },
        async handleSubmit(evnet) {
            evnet.preventDefault();
            const data = {
                name: this.name,
                
                address: this.address,
            };
            if (this._id) {
                data._id = this._id;
            }
            this.$emit("submit", data);
        },
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
</style>