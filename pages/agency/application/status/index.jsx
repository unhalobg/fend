import { Grid, Table, TableBody, TableContainer, Typography } from '@mui/material'
import React from 'react'
import { retrieveAgencyApplicationFormByAgencyId } from '../../../../api/agency_application_api'
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row'
import { primaryColor, successColor, dangerColor } from '../../../../utils/colors'
import { getUserAndTokenFromCookies } from '../../../../utils/secret'
import Paper from '@mui/material/Paper';

/**
 * @param {Object} formData agency application
 */
function AgencyApplicationStatus({ token, user, formData }) {
    if (formData) {
        return (
            <Grid container justifyContent={"center"} style={{ marginTop: "1%" }}>
    
                <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                    <Typography >
                        <h2 style={{ marginBottom: "0px" }}>Application Status</h2>
                    </Typography>
                    <Grid container>
                        <h3>Agency Information </h3>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    <CustomTableRow title={"Agency ID"} value={formData.agencyId} />
                                    <CustomTableRow title={"Agency Name"} value={formData.name} />
                                    <CustomTableRow title={"Agency Type"} value={formData.type} />
                                    <CustomTableRow title={"Email"} value={formData.email} />
                                    <CustomTableRow title={"Phone"} value={formData.phone} />
                                    <CustomTableRow title={"Fax"} value={formData.fax ?? "N/A"} />
                                    <CustomTableRow title={"Website"} value={formData.website ?? "N/A"} />
                                    <CustomTableRow title={"Business Address"} value={JSON.parse(formData.businessAddress).street + (JSON.parse(formData.businessAddress).unit ? ", ": "") + JSON.parse(formData.businessAddress).unit
                                        + ", " + JSON.parse(formData.businessAddress).city + ", " + JSON.parse(formData.businessAddress).state + " " + JSON.parse(formData.businessAddress).zipcode + ", " + JSON.parse(formData.businessAddress).country
                                    } />
                                    <CustomTableRow title={"Mailing Address"} value={JSON.parse(formData.mailingAddress).street + (JSON.parse(formData.mailingAddress).unit ? ", ": "") + JSON.parse(formData.mailingAddress).unit
                                        + ", " + JSON.parse(formData.mailingAddress).city + ", " + JSON.parse(formData.mailingAddress).state + " " + JSON.parse(formData.mailingAddress).zipcode + ", " + JSON.parse(formData.mailingAddress).country
                                    } />
                                    <CustomTableRow title={"Preferred Contacts"} value={JSON.parse(formData.prefferedContacts).filter((item) => item.checked).map((item, index) => {
                                        return <Grid key={index} item> - {item.title} </Grid>
                                    })} />
                                    <CustomTableRow title={"Application Status"} value={<p style={{
                                        color: formData.applicationStatus == "pending" ? primaryColor : formData.applicationStatus == "rejected" ?
                                            dangerColor : successColor,
                                    }}>{formData.applicationStatus.toUpperCase()}</p>} />
                                </TableBody>
    
                            </Table>
                        </TableContainer>
                    </Grid>
    
                    <Grid container sx={{ marginTop: '1%' }}>
                        <h3>Agent Information </h3>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    {/* <CustomTableRow title={"Agent ID"} value={formData.agencyId} /> */}
                                    <CustomTableRow title={"Full Name"} value={formData.agentTitle + ". " + formData.agentFirstName + " " + formData.agentMiddleName + " " + formData.agentLastName} />
                                    <CustomTableRow title={"Email"} value={formData.agentEmail} />
                                    <CustomTableRow title={"Phone"} value={formData.agentPhone} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <h3 style={{
                        color: formData.applicationStatus == "pending" ? primaryColor : formData.applicationStatus == "rejected" ?
                            dangerColor : successColor,
                    }}>{formData.applicationStatus == "pending" ? "Your application is under review." :
                        formData.applicationStatus == "rejected" ?
                            "Your application is rejected." :
    
                            "You application has been approved."}
                    </h3>
                </Grid>
            </Grid >
        )
    } else {
        return (
            <center>
                <h1>No application found</h1>
            </center>
        )
    } 
}

export default AgencyApplicationStatus;

AgencyApplicationStatus.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formData = null;
    if ((token && user) && user.id) {
        formData = await retrieveAgencyApplicationFormByAgencyId(token, user.id);
    }
    return { token, user, formData };
}