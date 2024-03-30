
import { apiKey } from "../utils/secret";
import { axiosInstance } from "./interceptor";

const baseURL = "http://localhost:8080/api/v1/timesheet";

/*
 *  http://localhost:8080/api/v1/timesheet/create
 */
export const createTimesheet = async (token, studentId, fieldInstructorId, desc, hours, startDate, endDate) => {
    return await axiosInstance.post(baseURL + "/create", { studentId, fieldInstructorId, desc, hours, startDate, endDate }/*, {
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

/*
 *  http://localhost:8080/api/v1/timesheet/retrieve-timesheets
 *  Get all timesheets for a specific field instructor that haven't been approved/denied yet 
 */
export const retrieveTimesheetsByInstructorId = async (token, fieldInstructorId) => {
    return await axiosInstance.post(baseURL + "/retrieve/instructorid", { fieldInstructorId }/*, {
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

/*
 * http://localhost:8080/api/v1/timesheet/set/status
 * Set timesheet_entry status and instructorMessage given the timesheet_entry's id
 */
export const setTimesheetStatus = async (token, id, status, message) => {
    return await axiosInstance.post(baseURL + "/set/status", { id, status, message }/*, {
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

