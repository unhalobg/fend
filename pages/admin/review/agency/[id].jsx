import React, { useState } from 'react';
import { Button, Grid, Table, TableBody, TableContainer, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { retrieveAgencyApplicationFormByFormId, updateAgencyApplicationStatus } from '../../../../api/agency_application_api';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row';
import { dangerColor, primaryColor, successColor } from '../../../../utils/colors';
import { useRouter } from 'next/router';
import { execUpdateUserStatus } from '../../../../api/auth_api';
import { notifyAgencyAboutAgencyApplication } from '../../../../api/notifications_api';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';

/**
 * @param {Object} formData agency application
 */
function Agency({ token, user, formData }) {
    const router = useRouter();

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    var buttonAction = async (e, status) => {
        e.preventDefault();
        const s1 = await updateAgencyApplicationStatus(token, formData.formId, status);
        if (s1) {
            const s2 = await notifyAgencyAboutAgencyApplication(token, formData, status);
            if (s2) {
                var s3 = null;
                if (status == 'approved') {
                    s3 = await execUpdateUserStatus(formData.agencyId, status);
                } else {
                    s3 = await execUpdateUserStatus(formData.agencyId, 'applied');
                }
                if (s3) {
                    setSuccessMessage('Successfully updated agency application status');
                    setTimeout(() => {
                        router.push('/admin/agencies/');
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

    if (formData && formData?.agencyId) {
        return (
            <Grid container justifyContent={"center"} style={{ margin: "3% 0%" }}>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />
                <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                    <Typography >
                        <h2>Application Status</h2>
                    </Typography>

                    <Grid container>
                        <Typography >
                            <h3>Agency Information </h3>
                        </Typography>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    <CustomTableRow title={"Agency ID"} value={formData.agencyId} />
                                    <CustomTableRow title={"Ageny Name"} value={formData.name} />
                                    <CustomTableRow title={"Ageny Type"} value={formData.type} />
                                    <CustomTableRow title={"Email"} value={formData.email} />
                                    <CustomTableRow title={"Phone"} value={formData.phone} />
                                    <CustomTableRow title={"Fax"} value={formData.fax ?? "N/A"} />
                                    <CustomTableRow title={"Website"} value={formData.website ?? "N/A"} />
                                    <CustomTableRow title={"Business Address"} value={JSON.parse(formData.businessAddress).street + " " + JSON.parse(formData.businessAddress).unit
                                        + ", " + JSON.parse(formData.businessAddress).city + ", " + JSON.parse(formData.businessAddress).state + " " + JSON.parse(formData.businessAddress).zipcode + ", " + JSON.parse(formData.businessAddress).country
                                    } />
                                    <CustomTableRow title={"Mailing Address"} value={JSON.parse(formData.mailingAddress).street + " " + JSON.parse(formData.mailingAddress).unit
                                        + ", " + JSON.parse(formData.mailingAddress).city + ", " + JSON.parse(formData.mailingAddress).state + " " + JSON.parse(formData.mailingAddress).zipcode + ", " + JSON.parse(formData.mailingAddress).country
                                    } />
                                    <CustomTableRow title={"Preferred Contacts"} value={JSON.parse(formData.prefferedContacts).filter((item) => item.checked).map((item, index) => {
                                        return <Grid key={index} item> - {item.title} </Grid>
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

                    <Grid container>
                        <Typography sx={{ marginTop: '3%' }}>
                            <h3>Agent Information </h3>
                        </Typography>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    {/* <CustomTableRow title={"Agent ID"} value={formData.agencyId} /> */}
                                    <CustomTableRow title={"Full Name"} value={(formData.agentMiddleName) ? `${formData?.agentFirstName} ${formData?.agentMiddleName} ${formData?.agentLastName}` : `${formData?.agentFirstName} ${formData?.agentLastName}`} />
                                    <CustomTableRow title={"Email"} value={formData.agentEmail} />
                                    <CustomTableRow title={"Phone"} value={formData.agentPhone} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                {
                    formData.applicationStatus == "approved" ?
                        <Grid container xs={0} justifyContent={"center"}>
                            <Grid justifyContent={"center"} style={{ width: "60%", marginTop: '2%' }}>
                                <center>Agency has already been approved</center>
                                { /* <Button fullWidth onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                                    Cancel Approval
                                </Button> */ }
                            </Grid>
                        </Grid>  :
                        formData.applicationStatus == "rejected" ?
                            <Grid container xs={0} justifyContent={"center"}>
                                <Grid justifyContent={"center"} style={{ width: "60%", marginTop: '2%' }}>
                                    <center>Agency has already been rejected</center>
                                    { /* <Button fullWidth onClick={async (e) => { buttonAction(e, "pending") }} variant='contained' sx={{ backgroundColor: dangerColor }}>
                                        Cancel Rejection
                                    </Button> */ }
                                </Grid>
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
            </Grid >
        )
    } else {
        return (
            <center>
                <h1>Could not retrieve agency data</h1>
            </center>
        )
    }
}

export default Agency;


Agency.getInitialProps = async ({ req, query }) => {
    var id = null;
    if (query.id) {
        id = query.id;
    }
    const { token, user } = getUserAndTokenFromCookies(req);
    var formData = null;
    if (token && id) {
        formData = await retrieveAgencyApplicationFormByFormId(token, id);
    }
    return { token, user, formData };
}