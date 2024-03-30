// TODO: Modify this to match what learning contract needs
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/learning_contract";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}

// Called from student/document/upload
export const createLearningContract = async (token, studentId, learningContractName, learningContractData) => {
    return await axiosInstance.post(baseURL + "/create", { studentId, learningContractName, learningContractData }/*, {
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

// export const updateLearningContract = async (token, id, learningContractName, learningContractData) => {
//     return await axiosInstance.post(baseURL + "/update", id, learningContractName, learningContractData/*, {
//         headers: headers(token)
//     }*/)
//         .then((response) => {
//             return response.data;
//         }).catch((error) => {
//             //throw error;
//             console.log(error);
//             return null;
//         })
// }

export const updateLearningContract = async (token, id, studentId, learningContractName, learningContractData) => {
    return await axiosInstance.post(baseURL + "/update", { id, studentId, learningContractName, learningContractData } /*, {
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



export const checkIfStudentExists = async (studentId) => {
    return await axiosInstance.post(baseURL + "/retrieve/studentid", { studentId })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}


export const createOrUpdateLearningContract = async (token, studentId, learningContractName, learningContractData) => {
    const studentExists = await checkIfStudentExists(studentId);
    const endpoint = studentExists  && studentExists.length > 0 ? "/update" : "/create";

    return await axiosInstance.post(baseURL + endpoint, { studentId, learningContractName, learningContractData })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}


// // Called from document/[id]
// export const retrieveLearningContractsByStudentId = async (token, studentId) => {
//     return await axiosInstance.post(baseURL + "/retrieve/studentid", { studentId }/*, {
//         headers: headers(token)
//     }*/)
//         .then((response) => {
//             return response.data;
//         }).catch((error) => {
//             //throw error;
//             console.log(error);
//             return null;
//         })
// }

// export const updateLearningContract = async (token, id, learningContractName, learningContractData) => {
//     return await axiosInstance.post(baseURL + "/update", id, learningContractName, learningContractData/*, {
//         headers: headers(token)
//     }*/)
//         .then((response) => {
//             return response.data;
//         }).catch((error) => {
//             //throw error;
//             console.log(error);
//             return null;
//         })
// }

