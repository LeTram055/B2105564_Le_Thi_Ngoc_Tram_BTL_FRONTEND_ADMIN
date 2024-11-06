import createApiClient from "./api.service.js"

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl)
    }

    async getUserById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getUsers() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Người đọc đã được tìm thấy",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

}

export default new UserService()
