// @ts-check

import React, { useState } from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row';
import { dangerColor, primaryColor, successColor } from '../../../../utils/colors';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import { useRouter } from 'next/router';
import { retrieveStudentApplicationFormByFormId, updateStudentApplicationStatus } from '../../../../api/student_application_api';
import { createPlacement, retrieveMatchings, retrievePlacementByStudentId } from '../../../../api/placement_api';
import { updateNumberOfVacancy } from '../../../../api/agency_student_request_application_api';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { execUpdateUserStatus } from '../../../../api/auth_api';
import { notifyAgencyAboutStudentPlacement, notifyStudentAboutPlacement, notifyStudentAboutStudentApplication } from '../../../../api/notifications_api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

/**
 * @param {Object} formData student application
 * @param {Object} matchedData student's placement
 */
function Student({ token, user, formData, matchedData }) {
    const router = useRouter();

    var [showMatching, setShowMatching] = useState(false);
    var [matchings, setMatchings] = useState([]);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    var buttonAction = async (e, status) => {
        e.preventDefault();
        const s1 = await updateStudentApplicationStatus(token, formData.formId, status);
        if (s1) {
            const s2 = await notifyStudentAboutStudentApplication(token, formData, status);
            if (s2) {
                var s3 = null;
                if (status == "approved") {
                    s3 = await execUpdateUserStatus(formData.studentId, status);
                } else {
                    s3 = await execUpdateUserStatus(formData.studentId, 'applied');
                }
                if (s3) {
                    setSuccessMessage('Successfully updated student application status');
                    setTimeout(() => {
                        router.push('/admin/students/');
                    }, 1000);
                } else {
                    setErrorMessage('Could not connect to the database');
                }
            } else {
                setErrorMessage('Could not connect to the database');
            }
        } else {
            setErrorMessage('Could not connect to the database');
        }
    }

    if (formData && formData?.studentId) {
        return (
            <Grid container justifyContent={"center"} style={{ margin: "3% 0%" }}>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />
                
                <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                    <Typography >
                        <h2>Application Status</h2>
                    </Typography>
                    <TableContainer component={Paper} elevation={3}>
                        <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                            <TableBody>
                                <CustomTableRow title={"Student ID"} value={formData.studentId} />
                                <CustomTableRow title={"Student Name"} value={formData.title + ". " + formData.firstName + " " + formData.middleName + " " + formData.lastName} />
                                <CustomTableRow title={"Email"} value={formData.email} />
                                <CustomTableRow title={"Home Phone"} value={formData.phone} />
                                <CustomTableRow title={"Mobile Phone"} value={formData.mobile} />
                                <CustomTableRow title={"Degree Level"} value={formData.degreeLevel.toUpperCase()} />
                                <CustomTableRow title={"Mailing Address"} value={JSON.parse(formData.mailingAddress).street + " " + JSON.parse(formData.mailingAddress).unit
                                    + ", " + JSON.parse(formData.mailingAddress).city + ", " + JSON.parse(formData.mailingAddress).state + " " + JSON.parse(formData.mailingAddress).zipcode + ", " + JSON.parse(formData.mailingAddress).country
                                } />
                                <CustomTableRow title={"Preferred Agency Types"} value={formData.agencyTypeOne + ", " + formData.agencyTypeTwo + ", " + formData.agencyTypeThree} />
                                <CustomTableRow title={"Preferred Contacts"} value={JSON.parse(formData.prefferedContacts).filter((item) => item.checked).map((item, index) => {
                                    return <Grid key={index} item> - {item?.title} </Grid>
                                })} />
                                <CustomTableRow title={"Application Status"} value={<p style={{
                                    color: formData.applicationStatus == "pending" ? primaryColor :
                                        formData.applicationStatus == "rejected" ? dangerColor :
                                            successColor,
                                }}>{formData.applicationStatus.toUpperCase()}</p>} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
    
                {
                    formData.applicationStatus == "approved" ?
                        <Grid container xs={0} justifyContent={"center"}>
                            <Grid container flexDirection={"row"} flexWrap={"nowrap"} justifyContent={"center"} style={{ width: "60%", marginTop: '2%' }}>
                                <Button fullWidth onClick={async (e) => {
                                    e.preventDefault();
                                    if (showMatching == true) {
                                        setShowMatching(false);
                                        setMatchings([]);
                                    } else {
                                        setShowMatching(true);
                                        const fetchedMatchings = await retrieveMatchings(token, { agencyTypeOne: formData.agencyTypeOne, agencyTypeTwo: formData.agencyTypeTwo, agencyTypeThree: formData.agencyTypeThree, degreeLevel: formData.degreeLevel });
                                        setMatchings(fetchedMatchings);
                                    }
                                }} variant='contained'>{!showMatching ? "Show Matchings" : "Hide Matchings"}</Button>
                                <div style={{ width: "20px" }} />
                                { /* <Button fullWidth onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                                    Cancel Approval
                                </Button> */ }
                                { /* <center>Student has already been approved</center> */ }
                            </Grid>
                        </Grid> :
                        formData.applicationStatus == "rejected" ?
                            <Grid container xs={0} justifyContent={"center"}>
                                <Grid justifyContent={"center"} style={{ width: "60%", marginTop: '2%' }}>
                                    { /* <Button fullWidth onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                                        Cancel Rejection
                                    </Button> */ }
                                    { /* <center>Student has already been rejected</center> */ }
                                </Grid>
                            </Grid>
                            :
                            formData.applicationStatus == "matched" ?
                                <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px", color: successColor }}>
                                    <h3>This student has already been placed with agency <a href={"/admin/review/agency/" + matchedData?.agencyFormId}>{matchedData?.name}</a></h3>
                                </Grid>
                                :
                                <Grid container xs={0} justifyContent={"center"}>
                                    <Grid container flexDirection={"row"} flexWrap={"nowrap"} justifyContent={"center"} style={{ width: "60%", marginTop: '2%' }}>
                                        <Button fullWidth onClick={async (e) => { buttonAction(e, "approved") }} variant='contained'>Approve</Button>
                                        <div style={{ width: "20px" }} />
                                        <Button fullWidth onClick={async (e) => { buttonAction(e, "rejected") }} variant='contained' sx={{ backgroundColor: dangerColor }}>Reject</Button>
                                    </Grid>
                                </Grid>
    
                }
    
                {
                    showMatching ?
                        <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                            <Typography >
                                <h2>Matchings</h2>
                            </Typography>
                            <TableContainer component={Paper} elevation={3}>
                                <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Agency Id</StyledTableCell>
                                            <StyledTableCell align="center">Agency Name</StyledTableCell>
                                            <StyledTableCell align="center">Number Of Vacancy</StyledTableCell>
                                            <StyledTableCell align="center">Agency Type</StyledTableCell>
                                            <StyledTableCell align="center">Review Agency</StyledTableCell>
                                            <StyledTableCell align="center">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {matchings.map((item, index) => (
                                            <StyledTableRow
                                                key={index}>
                                                <StyledTableCell align="center">{item?.agencyId}</StyledTableCell>
                                                <StyledTableCell align="center">{item?.name}</StyledTableCell>
                                                <StyledTableCell align="center">{item?.numberOfVacancy}</StyledTableCell>
                                                <StyledTableCell align="center">{item?.type}</StyledTableCell>
        
                                                <StyledTableCell align="center">
                                                    <Button onClick={(e) => {
                                                        e.preventDefault()
                                                        router.push("/admin/review/agency/" + item?.agencyFormId)
                                                    }}>Review</Button>
                                                </StyledTableCell>
        
                                                <StyledTableCell align="center">
                                                    <Button onClick={async (e) => {
                                                        e.preventDefault();
														const response = await createPlacement(token, { formId: item?.formId, agencyId: item?.agencyId, studentId: formData.studentId }).then(() => {
                                                            setSuccessMessage('Successfully created placement');
                                                            updateStudentApplicationStatus(token, formData.formId, "matched");
                                                            execUpdateUserStatus(formData.studentId, "matched");
                                                            execUpdateUserStatus(item?.agencyId, "matched");
                                                            updateNumberOfVacancy(token, item.formId, item.numberOfVacancy - 1);
                                                            notifyAgencyAboutStudentPlacement(token, item?.formId, item?.agencyId);
                                                            notifyStudentAboutPlacement(token, formData);
                                                            notifyAgencyAboutStudentPlacement(token, item.formId, item.agencyId);
                                                        }).catch((error) => {
                                                            console.log(error);
                                                            setErrorMessage('Could not connect to database');
                                                        })
                                                        router.push('/admin/placements/');
                                                    }}>Match</Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        :
                    <></>
                }
            </Grid >
        )
    } else {
        return (
            <center>
                <h1>Could not retrieve student data</h1>
            </center>
        )
    }
}

export default Student;

Student.getInitialProps = async ({ req, query }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var id = null;
    if (query.id) {
        id = query.id;
    }

    var formData = null;
    var matchedData = null;
    
    if (token && id) {
        formData = await retrieveStudentApplicationFormByFormId(token, id);
    }
    if (token && formData) {
        matchedData = await retrievePlacementByStudentId(token, formData.studentId);
    }

    return { token, user, formData, matchedData };
}