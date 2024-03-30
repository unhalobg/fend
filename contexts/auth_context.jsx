import { Cookies } from "react-cookie";
import { execLogin, execRegister, execUpdateUser } from "../api/auth_api";
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
    const cookies = new Cookies()
    const [authToken, setAuthToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Reset the 'token' and 'user' cookies
    const updateUser = async (email) => {
        setLoading(true)
        try {
            const response = await execUpdateUser(email)
            cookies.set("token", response.token, { maxAge: 60 * 60 })
            cookies.set("user", response.user, { maxAge: 60 * 60 * 1 })
            checkUser()
        } catch (error) {
			setLoading(false)
            return null
        }
		return true
    }

    const login = async (email, password) => {
		var response = null
		setLoading(true)
        try {
            response = await execLogin(email, password)
        } catch (error) {
			setLoading(false)
            return null
        }
		if (response) {
			try {
				cookies.set("token", response.token, { maxAge: 60 * 60 })
				cookies.set("user", response.user, { maxAge: 60 * 60 * 1 })
				checkUser()
				return true
			} catch (error) {
				setLoading(false)
				return null
			}
		}
		setLoading(false)
    }

    const register = async (id, email, password, accessLevel) => {
        try {
            await execRegister(id, email, password, accessLevel)
        } catch (error) {
            return null
        }
    }

    const logout = () => {
        cookies.remove("token")
        cookies.remove("user")
        setAuthToken(null)
        setUser(null)
        setLoading(false)
    }

    var checkUser = () => {
        const token = cookies.get("token")
        const userFromCookie = cookies.get("user")
        setAuthToken(token)
        setUser(userFromCookie)
        setLoading(false)
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, authToken, loading, login, register, logout, updateUser }}>
            {loading ? <h1>Loading....</h1> : children}
        </AuthContext.Provider >
    )

}