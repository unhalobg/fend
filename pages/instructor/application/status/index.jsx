// @ts-check

import { Grid, Table, TableBody, TableContainer, Typography } from '@mui/material';
import React from 'react';
import { retrieveInstructorApplicationFormByInstructorId } from '../../../../api/instructor_application_api';
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row';
import { primaryColor, successColor, dangerColor } from '../../../../utils/colors';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import Paper from '@mui/material/Paper';

/**
 * @param {Object} formData instructor application
 */
function InstructorApplicationStatus({ token, user, formData }) {
    if (!formData) {
        return (
            <center>
                <h1>Your application was not found</h1>
            </center>
        )
    } else {
        return (
            <Grid container justifyContent={"center"} style={{ marginTop: "1%" }}>

                <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                    <Typography >
                        <h2 style={{ marginBottom: "0px" }}>Application Status</h2>
                    </Typography>
                    <Grid container>
                        <TableContainer component={Paper} elevation={3}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    <CustomTableRow title={"Agency Name"} value={formData.agencyId} />
                                    <CustomTableRow title={"Application Status"} value={<p style={{
                                        color: formData.status == "pending" ? primaryColor : formData.status == "rejected" ?
                                            dangerColor : successColor,
                                    }}>{formData.status.toUpperCase()}</p>} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <h3 style={{
                        color: formData.status == "pending" ? primaryColor : formData.status == "rejected" ?
                            dangerColor : successColor,
                    }}>{formData.status == "pending" ? `Your application for ${formData.agencyName} is under review.` :
                        formData.status == "rejected" ?
                            `Your application for ${formData.agencyName} was rejected.\nReason: ${formData.adminMessage}` :

                            `You application for ${formData.agencyName} was approved.`}
                    </h3>
                </Grid>
            </Grid >
        )
    }  
}

export default InstructorApplicationStatus;


InstructorApplicationStatus.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formData = null;
    if ((token && user) && user.id) {
        formData = await retrieveInstructorApplicationFormByInstructorId(token, user.id);
    }

    return { token, user, formData };
}