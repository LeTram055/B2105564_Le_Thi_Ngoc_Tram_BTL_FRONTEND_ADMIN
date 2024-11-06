import createApiClient from "./api.service.js"

class BorrowTrackingService {
    constructor(baseUrl = "/api/borrowTrackings") {
        this.api = createApiClient(baseUrl)
    }


    async updateBorrowTracking({id, status, employeeId}) {
        try {    
            
            const data = (await this.api.put(`/admin/${id}`, {status, employeeId})).data
            return {
                status: "success",
                message: data.message || "Yêu cầu mượn sách đã được cập nhật thành công",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBorrowTrackings() {
        try {
            const data = (await this.api.get("/admin")).data
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

    async getBorrowTracking(borrowId) {
        try {
            
            const data = (await this.api.get(`/${borrowId}`)).data
            
            return {
                status: "success",
                message: data.message || "Theo dõi mượn sách đã được tìm thấy",
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

export default new BorrowTrackingService()