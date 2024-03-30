import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/document/request";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}


export const createDocumentRequest = async (token, agencyId, studentId, documentName) => {
    return await axiosInstance.post(baseURL + "/create", { agencyId, studentId, documentName }/*, {
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

export const retrieveDocumentRequestsByStudentId = async (token, studentId) => {
    return await axiosInstance.post(baseURL + "/retrieve/studentid", { studentId }/*, {
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
