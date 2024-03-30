import { Container } from '@mui/system';
import React from 'react';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { fetchStudentByStudentId } from '../../../api/student_application_api';
import { Typography, TableContainer, Table, TableBody } from '@mui/material';
import CustomTableRow from '../../../components/custom_table_row/custom_table_row';
import Paper from '@mui/material/Paper';

/**
 * @param {Object} student student application
 */
function StudentDetail({ token, user, student }) {
    if (student?.firstName) {
        return (
            <Container>
                <Typography >
                    <h3>Student Information </h3>
                </Typography>
                <TableContainer component={Paper} elevation={3} sx={{ mb: '2%' }}>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <TableBody>
                            <CustomTableRow title={"Full Name"} value={student.firstName + " " + student.middleName + " " + student.lastName} />
                            <CustomTableRow title={"UTA ID"} value={student.studentId} />

                            <CustomTableRow title={"Email"} value={student.email} />
                            <CustomTableRow title={"Phone"} value={student.phone} />
                            <CustomTableRow title={"Mobile"} value={student.mobile} />
                            <CustomTableRow title={"Mailing Address"} value={
                                JSON.parse(student.mailingAddress).street + " " + JSON.parse(student.mailingAddress).unit
                                + ", " + JSON.parse(student.mailingAddress).city + ", " + JSON.parse(student.mailingAddress).state
                                + " " + JSON.parse(student.mailingAddress).zipcode + ", " + JSON.parse(student.mailingAddress).country
                            } />
                            <CustomTableRow title={"Degree Level"} value={student.degreeLevel.toUpperCase()} />
                            <CustomTableRow title={"Preferred Placement Types"} value={
                                <div>
                                    <p>1. {student.agencyTypeOne}</p>
                                    <p>2. {student.agencyTypeTwo}</p>
                                    <p>3. {student.agencyTypeThree}</p>
                                </div>

                            } />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    } else {
        return (
            <center>
                <h1>Could not retrieve student information</h1>
            </center>
        )
    }
}

export default StudentDetail;

StudentDetail.getInitialProps = async ({ req, query }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var id = null;
    if (query.id) {
        id = query.id;
    }
    var student = null;
    if (token && id) {
        student = await fetchStudentByStudentId(token, id);
    }
    return { token, user, student };
}