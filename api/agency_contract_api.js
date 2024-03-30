// TODO: Modify this to match what agency contract needs
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/agency_contract";

const headers = (token) => {
    return {
        authorization: "Bearer " + token,
        spsecretkey: apiKey
    }
}

// Called from student/document/upload
export const createAgencyContract = async (token, agencyId, agencyContractName, agencyContractData) => {
    return await axiosInstance.post(baseURL + "/create", { agencyId, agencyContractName, agencyContractData }/*, {
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
// export const retrieveAgencyContractByAgencyId = async (token, agencyId) => {
//     return await axiosInstance.post(baseURL + "/retrieve/agencyid", { agencyId }/*, {
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

// export const updateAgencyContract = async (token, id, agencyContractName, agencyContractData) => {
//     return await axiosInstance.post(baseURL + "/update", id, agencyContractName, agencyContractData/*, {
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

export const updateAgencyContract = async (token, id, agencyId, agencyContractName, agencyContractData) => {
        return await axiosInstance.post(baseURL + "/update", { id, agencyId, agencyContractName, agencyContractData}/*, {
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

export const checkIfAgencyExists = async (agencyId) => {
    return await axiosInstance.post(baseURL + "/retrieve/agencyid", { agencyId })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}


export const createOrUpdateAgencyContract = async (token, agencyId, agencyContractName, agencyContractData) => {
    const agencyExists = await checkIfAgencyExists(agencyId);
    const endpoint = agencyExists  && agencyExists.length > 0 ? "/update" : "/create";

    return await axiosInstance.post(baseURL + endpoint, { agencyId, agencyContractName, agencyContractData })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        })
}