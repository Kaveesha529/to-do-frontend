import api from "./UserApi"

export const signUp = async (
    username: string,
    password: string
) => {
    const { data } = await api.post('/register', {
        username,
        password
    })
    return data
}

export const login = async (
    username: string,
    password: string
) => {
    const { data } = await api.post('/login', {
        username,
        password
    })
    return data
}

export const logout = async () => {
    const { data } = await api.post('/logout')
    return data
}