import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/notifications";


const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}

export const retrieveNotifications = async (token, userId) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", { userId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const deleteNotification = async (token, id) => {
    return await axiosInstance.post(baseURL + "/delete", { id }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const notifyAdminAboutAgencyApplication = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/notify/admins/agency_application", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const notifyAgencyAboutAgencyApplication = async (token, formData, status) => {
    return await axiosInstance.post(baseURL + "/notify/agency/agency_application", { formData, status }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}




export const notifyAdminAboutStudentApplication = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/notify/admins/student_application", formData, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const notifyStudentAboutStudentApplication = async (token, formData, status) => {
    return await axiosInstance.post(baseURL + "/notify/student/student_application", { formData, status }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}


export const notifyStudentAboutPlacement = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/notify/student/placement", { formData }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const notifyAgencyAboutStudentPlacement = async (token, formId, agencyId) => {
    return await axiosInstance.post(baseURL + "/notify/agency/placement", { formId, agencyId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const notifyAdminsAboutLearningContractUpload = async (token, studentId) => {
    return await axiosInstance.post(baseURL + "/notify/admins/learning_contract_upload", { studentId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}

export const notifyAdminsAboutAgencyContractUpload = async (token, agencyId) => {
    return await axiosInstance.post(baseURL + "/notify/admins/agency_contract_upload", { agencyId }, {
        headers: headers(token)
    })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}
