import { TableContainer, Grid, Table, TableBody, Typography } from '@mui/material';
import { Container } from '@mui/system';
import moment from 'moment';
import React from 'react';
import { retrieveAgencyApplicationFormByAgencyId } from '../../../api/agency_application_api';
import { retrievePlacementByStudentId } from '../../../api/placement_api';
import CustomTableRow from '../../../components/custom_table_row/custom_table_row';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import Paper from '@mui/material/Paper';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * @param {Object} placement student's placement
 * @param {Object} agency the application of the agency this student was placed with
 */
function StudentPlacement({ token, user, placement, agency }) {
    /*agencyAddress = JSON.parse(agency.businessAddress).street + " " + JSON.parse(agency.
        businessAddress).unit + ", " + JSON.parse(agency.businessAddress).city + ", " + 
        JSON.parse(agency.businessAddress).state + " " + JSON.parse(agency.businessAddress)
        .zipcode + ", " + JSON.parse(agency.businessAddress).country;*/

    // Only show the student placement data if the user has been placed
    if (placement && agency) {
        return (
            <Container>
                <Typography align='center'>
                    <h2>Placement Information</h2>
                </Typography>
                <Grid container justifyContent={"center"}>
                    <Grid container justifyContent={"center"} style={{ width: "65%" }}>
                        <TableContainer component={Paper} elevation={3} sx={{ mb: '10px' }}>
                            <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                                <TableBody>
                                    <CustomTableRow title={"Agency Name"} value={agency.name} />
                                    <CustomTableRow title={"Agency Email"} value={agency.email} />
                                    <CustomTableRow title={"Agency Phone"} value={agency.phone} />
                                    <CustomTableRow title={"Agency Address"} value={
                                        JSON.parse(agency.businessAddress).street + (JSON.parse(agency.businessAddress).unit ? ", ": "") + JSON.parse(agency.businessAddress).unit
                                        + ", " + JSON.parse(agency.businessAddress).city + ", " + JSON.parse(agency.businessAddress).state
                                        + " " + JSON.parse(agency.businessAddress).zipcode + ", " + JSON.parse(agency.businessAddress).country
                                    } />
                                    <CustomTableRow title={"Agency Website"} value={<a href={agency.website}>{agency.website}</a>} />
                                    <CustomTableRow title={"Placement Type"} value={agency.type} />
                                    <CustomTableRow title={"Placed Date"} value={moment(placement.createdAt).format('MM/DD/YYYY hh:mm A')} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        )
    } else {
        return (
            <Grid container justifyContent="center">
                <Grid item component={Paper} elevation={3} sx={{ margin: '20px', padding: '20px' }}>
                    <Grid container sx={{ flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            <ErrorIcon fontSize="large" />
                            <Typography fontWeight="bold" fontSize={36} sx={{ mx: '4px' }}>You have not been placed yet.</Typography>
                        </Grid>
                        <Typography>Please wait for an administrator to match you with an agency.</Typography>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default StudentPlacement

StudentPlacement.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req)

    var placement = null;
    if ((token && user) && user.id) {
        placement = await retrievePlacementByStudentId(token, user.id)
    }
    var agency = null;

    if (placement) {
        agency = await retrieveAgencyApplicationFormByAgencyId(token, placement.agencyId);
    }
    
    return { token, user, placement, agency }
}