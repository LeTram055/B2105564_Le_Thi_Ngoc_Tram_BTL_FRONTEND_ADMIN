import createApiClient from "./api.service.js"

class EmployeeService {
    constructor(baseUrl = "/api/employees") {
        this.api = createApiClient(baseUrl)
    }

    async getEmployeeById(id) {
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
}

export default new EmployeeService()
