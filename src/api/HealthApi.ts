import api from "./GetApi"

export const getConnection = async() => {
    try {
        await api.get("/health")
        return true
    } catch (error) {
        return false
    }
}