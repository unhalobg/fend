import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/document";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}

// Called from student/document/upload
export const createDocument = async (token, studentId, documentName, documentData) => {
    return await axiosInstance.post(baseURL + "/create", { studentId, documentName, documentData }/*, {
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

// Called from document/[id]
export const retrieveDocumentsByStudentId = async (token, studentId) => {
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

export const updateDocument = async (token, id, documentName, documentData) => {
    return await axiosInstance.post(baseURL + "/update", id, documentName, documentData/*, {
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