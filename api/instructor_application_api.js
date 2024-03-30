
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/application/instructor";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    };
};


export const retrieveInstructorDetail = async (token, instructorId) => {
    return await axiosInstance.post(baseURL + "/retrieve", { instructorId }/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}


export const retrieveInstructorApplicationFormByFormId = async (token, formId) => {
    return await axiosInstance.post(baseURL + "/retrieve/formid", { formId }/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const retrieveInstructorApplicationFormByInstructorId = async (token, instructorId) => {
    return await axiosInstance.post(baseURL + "/retrieve/instructorid", { instructorId }/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const createInstructorApplication = async (token, formData) => {
    return await axiosInstance.post(baseURL + "/create", formData/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const retrieveAllInstructorRequestApplications = async (token) => {
    return await axiosInstance.post(baseURL + "/retrieve/all", {}/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const updateInstructorApplicationStatus = async (token, formId, status, message) => {
    return await axiosInstance.post(baseURL + "/update", { formId, status, message }/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}

export const retrieveInstructorApplicationsByAgencyId = async (token, agencyId) => {
    return await axiosInstance.post(baseURL + "/retrieve/agencyid", { agencyId }/*, {
        headers: headers(token)
    }*/)
        .then((response) => {
            return response.data;
        }).catch((error) => {
            //throw error;
            console.log(error);
            return null;
        })
}
