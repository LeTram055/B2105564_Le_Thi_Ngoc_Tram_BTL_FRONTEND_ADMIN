import createApiClient from "./api.service.js"

class AuthService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl)
    }

    async login(user) {
        try {
            const data = (await this.api.post("login", user)).data
            return {
                status: "success",
                message: data.message || "Người dùng đăng nhập thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
    
    async register(user) {
        try {
            const data = (await this.api.post("register", user)).data
            return {
                status: "success",
                message: data.message || "Người dùng đăng ký thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async logout() {
        try {
            const data = (await this.api.post("logout")).data
            return {
                status: "success",
                message: data.message || "Người dùng đăng xuất thành công",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new AuthService()