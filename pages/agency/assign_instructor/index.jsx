// @ts-check

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { retrieveStudentsByAgencyId, retrievePlacementsByInstructorId, setInstructorId } from '../../../api/placement_api';
import { retrieveInstructorApplicationsByAgencyId } from '../../../api/instructor_application_api';
import { execUpdateUserStatus } from '../../../api/auth_api';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { Button, Grid, Table, TableBody, TableContainer,/* Select, InputLabel, MenuItem, FormControl, FormControlLabel,*/ Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import CustomTableRow from '../../../components/custom_table_row/custom_table_row';
import { dangerColor, primaryColor, successColor } from '../../../utils/colors';
import ErrorDialog from '../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../components/notification_toast/notification_toast';

function AssignInstructor({ user, token, students, instructors, instructorStrings }) {
    const router = useRouter();

    if ((JSON.stringify(instructors) === JSON.stringify([]) || JSON.stringify(instructorStrings) === JSON.stringify([])) ||
        JSON.stringify(students) === JSON.stringify([])) {
        return (
            <center>
                <h1>No instructors/students found</h1>
            </center>
        )
    } else {

        const [successMessage, setSuccessMessage] = useState(null);
        const [errorMessage, setErrorMessage] = useState(null);

		const [items, setItems] = useState(students);
		const [index, setIndex] = useState(0);

        // Called after successfully assigning an instructor to a student. Removes that student
        //   from the page
        const remove = (item) => {
            setItems(items.filter((el) => el !== item));
        };
		
        return (
            <center>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />
                <h2>Students without a field instructor</h2>
                {items.map((item, index) => (
                    <center key={index}>
                        <br></br>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    <CustomTableRow title={"Student Name"} value={(item.middleName) ? `${item?.firstName} ${item?.middleName} ${item?.lastName}` : `${item?.firstName} ${item?.lastName}`} />
                                    <CustomTableRow title={"Student Email Address"} value={item?.email} />
                                    <CustomTableRow title={"Student Phone Number"} value={(item.phone) ? item.phone : 'None provided'} />
                                    <CustomTableRow title={"Student Mobile Number"} value={(item.mobile) ? item.mobile : 'None provided'} />
                                    <CustomTableRow title={"Student Degree Level"} value={item?.degreeLevel} />
                                    <CustomTableRow title={"Student Mailing Address"} value={(item.mailingAddress) ? `${JSON.parse(item.mailingAddress).street} ${JSON.parse(item.mailingAddress).unit} ${JSON.parse(item.mailingAddress).city}, ${JSON.parse(item.mailingAddress).state} ${JSON.parse(item.mailingAddress).zipcode}` : 'None provided'} />
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br></br>
                        <label style={{'fontSize': '24px'}}>Instructor to assign</label>
                        <br></br>
                        <select onChange={e => setIndex(instructorStrings.indexOf(e.target.value))}>
                            {instructorStrings.map(opt => <option>{opt}</option>)}
                        </select>
                        <br></br>
                        <Button onClick={async (e) => {
                            e.preventDefault();
                            // Confirm that they want to assign the chosen field instructor to that student
                            const instructorName = (instructorStrings[index].split('\n'))[0];
                            if (navigator.onLine) {
                                if (confirm(`Are you sure you want to assign instructor ${instructorName}
                                    to student ${item.firstName} ${item.lastName}?`))
                                {
                                    const s1 = await setInstructorId(token, instructors[index].instructorId, item.studentId);
                                    const s2 = await execUpdateUserStatus(instructors[index].instructorId, 'matched');
                                    if (s1 && s2) {
                                        setSuccessMessage(`Successfully assigned instructor ${instructorName}
                                            to student ${item.firstName} ${item.lastName}.`);
                                        // Add 1 to the instructor's current number of students
                                        if (Number.isInteger(instructorStrings[index].substr(instructorStrings.length - 1, 1))) {
                                            var split = instructorStrings[index].split(': ');
                                            if (Number.isInteger(split[split.length - 1])) {
                                                const n = parseInt(split[split.length - 1], 10) + 1;
                                                instructorStrings[index] = split[0] + ': ' + n.toString();
                                            } else {
                                                instructorStrings[index] = split[0] + ': unknown';
                                            }
                                        }
                                        remove(item);
                                    } else {
                                        setErrorMessage('Could not connect to the database.');
                                    }
                                }
                            }
                        }}>Assign Field Instructor</Button>
                    </center>
                ))}
            </center>
        )
    }
}

export default AssignInstructor;

AssignInstructor.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
	
	var students = [];
	
	// Example element: 'Gary Trey Williams\nCurrent number of students: 5'
	var instructorStrings = [];
	
	var instructors = [];
	
	if ((token && user) && user.id) {
		// Each element contains studentId, title, firstName, middleName (may be NULL), lastName, degreeLevel,
		//   email, phone, mobile, mailingAddress, and fieldInstructorId
		students = await retrieveStudentsByAgencyId(token, user.id);
		
		// Filter so that it only shows students who don't have a field instructor assigned to them yet
		if ((students && Array.isArray(students)) && students.length > 0) {
			students = students.filter(student => student.fieldInstructorId == null);
		} else {
			students = [];
		}

		instructors = await retrieveInstructorApplicationsByAgencyId(token, user.id);
		
		// Get the number of students each instructor is currently assigned to by getting the number of
		//   placements for each instructor
		if ((instructors && Array.isArray(instructors)) && instructors.length > 0) {
			for (let i = 0; i < instructors.length; ++i) {
				if (instructors[i].middleName) {
					instructorStrings.push(`${instructors[i].firstName} ${instructors[i].middleName} ${instructors[i].lastName}
						\nCurrent number of students: `);
				} else {
					instructorStrings.push(`${instructors[i].firstName} ${instructors[i].lastName}
						\nCurrent number of students: `);
				}
				const placements = await retrievePlacementsByInstructorId(token, instructors[i].fieldInstructorId);
				if ((placements && Array.isArray(placements)) && placements.length > 0) {
					instructorStrings[i] += (placements.length).toString();
				} else {
                    if ((placements && Array.isArray(placements)) && placements.length == 0) {
                        instructorStrings[i] += '0';
                    } else {
                        instructorStrings[i] += 'unknown';
                    }
				}
			}
		} else {
            instructors = [];
        }
	}
    
    return { user, token, user, students, instructors, instructorStrings };
}