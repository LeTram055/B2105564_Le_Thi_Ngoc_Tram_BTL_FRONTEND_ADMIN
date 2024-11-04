import { defineStore } from 'pinia'

const authStore = defineStore('auth', {
    state: () => ({
        role: "guest",
        user: null,
    }),
    getters: {
        getRole() {
            return this.role
        },
        getUser() {
            return this.user
        }
    },
    actions: {
        setRole(role) {
            this.role = role
            localStorage.setItem("userRole", role)
        },
        removeRole() {
            this.role = "guest"
            localStorage.removeItem("userRole")
        },
        setUser(user) {
            this.user = user
        },
        resetUser() {
            this.user = null
        },
        loadRoleFromLocalStorage() {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            this.role = storedRole;
        }
    }
    },
})

export default authStore