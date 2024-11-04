import createApiClient from "./api.service"

class PublisherService {
    constructor(baseUrl = "/api/publishers") {
        this.api = createApiClient(baseUrl)
    }

    async getPublishers() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Nhà xuất bản đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createPublisher(publisher) {
        try {
            const data = (await this.api.post("/", publisher)).data
            return {
                status: "success",
                message: data.message || "Nhà xuất bản đã được thêm thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getPublisherById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Nhà xuất bản đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updatePublisher(id, publisher) {
        try {
            const data = (await this.api.put(`/${id}`, publisher)).data
            return {
                status: "success",
                message: data.message || "Nhà xuất bản đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deletePublisher(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Nhà xuất bản đã được xóa thành công",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new PublisherService()
