import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/auth";

export const execLogin = async (email, password) => {
    return await axiosInstance.post(baseURL + "/login", { email, password }).then((response) => {
        return response.data;
    }).catch((error) => {
        //throw error;
		//console.log(error);
		return null;
    })
}

export const execRegister = async (id, email, password, role) => {
    return await axiosInstance.post(baseURL + "/register", { id, email, password, role })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
			//console.log(error);
			return null;
        })
}

export const execUpdateUser = async (email) => {
    return await axiosInstance.post(baseURL + "/update-user", { email })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error
			//console.log(error);
			return null;
        })
}

export const execUpdateUserStatus = async (id, status) => {
    return await axiosInstance.post(baseURL + "/update-user-status", { id, status })
        .then((response) => {
            return true;
        }).catch((error) => {
            //throw error
            //console.log(error);
            return null;
        })
}

export const execGetPasswordFromEmail = async (email) => {
    return await axiosInstance.post(baseURL + "/password", { email })
        .then((response) => {
            return response.data.password;
        }).catch((error) => {
            //throw error;
			//console.log(error);
            return null;
        })
}

// Called from pages/forgot_password.jsx
export const execSaveResetPasswordToken = async (token, email, expirationDate, expirationTime, link) => {
    return await axiosInstance.post(baseURL + "/save-reset-password-token", { token, email, expirationDate, expirationTime, link })
        .then((response) => {
			return response.message;
        }).catch((error) => {
            //throw error;
			//console.log(error);
            return null;
        })
}

// Called from pages/change_password/[resetToken].jsx
export const execGetResetPasswordToken = async (token) => {
    return await axiosInstance.post(baseURL + "/get-reset-password-token", { token })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
			//console.log(error);
            return null;
        })
}

// Called from pages/change_password/[resetToken].jsx
export const execChangePassword = async (email, password) => {
    return await axiosInstance.post(baseURL + "/change-password", { email, password })
        .then((response) => {
            return response;
        }).catch((error) => {
            //throw error;
			//console.log(error);
			return null;
        })
}

// Called from pages/register.jsx
// The return value from post request will be the email associated with the id if
//   it was found or false if it wasn't (or error)
export const execIdSearch = async (id) => {
    return await axiosInstance.post(baseURL + "/id-search", { id })
        .then((response) => {
			if (response.data.email === false)
			{
				return 'Not found';
			}
			else
			{
				return response.data.email;
			}
        }).catch((error) => {
            //throw error;
			//console.log(error);
			return null;
        })
}

// Called from pages/register.jsx
// The return value from post request will be the id associated with the email if
//   it was found or false if it wasn't (or error)
export const execEmailSearch = async (email) => {
    return await axiosInstance.post(baseURL + "/email-search", { email })
        .then((response) => {
            if (response.data.id === false)
			{
				return 'Not found';
			}
			else
			{
				return response.data.id;
			}
        }).catch((error) => {
            //throw error;
			//console.log(error);
			return null;
        })
}
