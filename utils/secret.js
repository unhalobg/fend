import { Cookies } from "react-cookie";

// Maybe store this in .env in backend and get it from there
export const apiKey = 'eyJhbGciOiJIUzI1NiJ9.c21hcnRwbGFjZW1lbnQ.52BzAylAdQ5-bPYh0Y3Dvqxp0tJ0CTHYsPjEbnnqajA'

export const getUserAndTokenFromCookies = (req) => {
    var token;
    var user;
    try {
        if (req) {
            if (req.cookies.user) {
                token = decodeURIComponent(req.cookies.token)
                user = JSON.parse(decodeURIComponent(req.cookies.user))
            }
        } else {
            const cookies = new Cookies()
            token = cookies.get("token")
            user = cookies.get("user")
        }
    } catch (error) {
        throw error
    }
    return { token, user }
}