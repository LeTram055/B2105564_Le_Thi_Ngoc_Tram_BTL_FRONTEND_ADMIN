import createApiClient from "./api.service.js"

class bookService {
    constructor(baseUrl = "/api/books") {
        this.api = createApiClient(baseUrl)
    }

    async createBook(book) {
        try {
            const data = (await this.api.post("/", book, {
                headers: {
                'Content-Type': 'multipart/form-data'
            }
            })).data
            return {
                status: "success",
                message: data.message || "Book created successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBooks() {
        try {
            const data = (await this.api.get("/admin")).data
            return {
                status: "success",
                message: data.message || "Books retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async getBookById(id) {
        try {
            const data = (await this.api.get(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "book retrieved successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async updateBook(id, book) {
        try {
            const data = (await this.api.put(`/${id}`, book,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )).data
            return {
                status: "success",
                message: data.message || "book updated successfully",
                data: data.data,
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }

    async deleteBook(id) {
        try {
            const data = (await this.api.delete(`/${id}`)).data
            return {
                status: "success",
                message: data.message || "book deleted successfully",
            }
        } catch (err) {
            return {
                status: "error",
                message: err.response.data.message,
            }
        }
    }
}

export default new bookService()
