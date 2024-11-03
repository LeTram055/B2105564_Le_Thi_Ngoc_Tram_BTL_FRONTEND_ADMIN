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

    async getEmployees() {
        try {
            const data = (await this.api.get("/")).data
            return {
                status: "success",
                message: data.message || "Employees retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async createEmployee(publisher) {
        try {
            const data = (await this.api.post("/", publisher)).data
            return {
                status: "success",
                message: data.message || "Employee created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateEmployee(id, publisher) {
        try {
            const data = (await this.api.put(`/${id}`, publisher)).data
            return {
                status: "success",
                message: data.message || "Employee updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteEmployee(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "Employee deleted successfully",
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
