// @ts-check

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import { retrieveAgencyApplicationFormByAgencyId } from '../../../../api/agency_application_api';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import { createPlacementRequest } from '../../../../api/agency_student_request_application_api';
import Paper from '@mui/material/Paper';

/**
 * @param {Object} agencyData agency application
 */
function AgencyStudentApplicationRequest({ token, user, agencyData }) {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    if (agencyData && agencyData?.ein) {
        const [formValue, setFormValue] = useState({
            agencyId: user.id,
            email: user.email,
            ein: agencyData.ein,
            degreeLevel: "any",
            numberOfVacancy: 1,
            requirements: "",
            immunizationRequirements: [
                { title: "Varicella (Chickenpox)", checked: false },
                {
                    title: "Tetanus, diphtheria, acellular pertussis (Tdap)",
                    checked: false,
                },
                { title: "Influenza", checked: false },
                { title: "TB Skin Test (TST)", checked: false },
            ],
            otherReports: [
                { title: "Clear Background Test", checked: false },
                { title: "Sex offender Registery", checked: false },
                { title: "Negative Drug Test", checked: false },
            ],
        });

        const onSubmit = async (e) => {
            e.preventDefault();
            const success = await createPlacementRequest(token, formValue);
            if (success) {
                setSuccessMessage('Successfully submitted application');
                setTimeout(() => {
                    router.push('/agency/placement');
                }, 1000);
            } else {
                setErrorMessage('Could not connect to the database');
            }
        }


        const onChange = (e) => {
            e.preventDefault();
            setFormValue({ ...formValue, [e.target.name]: e.target.value });
        };

        return (
            <Grid container justifyContent={"center"} style={{ marginTop: "20px" }}>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />

                <form onSubmit={onSubmit}>
                    <h2 style={{ textAlign: "center", marginLeft: "40px", marginRight: "40px" }}> Agency Application Request Form</h2>
                    <div style={{ padding: "0px 200px" }} />
                    <Grid elevation={3} component={Paper} style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2px", paddingBottom: "40px" }}>
                        <div>
                            <h4 style={{ textAlign: "start", marginTop: "40px" }}> Agency Information</h4>

                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    label="Agency ID"
                                    fullWidth
                                    value={formValue.agencyId}
                                    name="agencyId"
                                    onChange={onChange}
                                    required
                                    disabled
                                />
                            </Grid>

                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="email"
                                    label="Agency Email"
                                    fullWidth
                                    value={formValue.email}
                                    name="email"
                                    onChange={onChange}
                                    required
                                    disabled
                                />
                            </Grid>

                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    label="EIN"
                                    fullWidth
                                    value={formValue.ein}
                                    name="ein"
                                    onChange={onChange}
                                    required
                                    disabled
                                />
                            </Grid>
                            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                <InputLabel>Degree Level *</InputLabel>
                                <Select
                                    name="degreeLevel"
                                    label="Degree Level *"
                                    value={formValue.degreeLevel}
                                    onChange={onChange}>
                                    <MenuItem key={"bsw"} value={"bsw"}> BSW </MenuItem>
                                    <MenuItem key={"msw"} value={"msw"}> MSW </MenuItem>
                                    <MenuItem key={"any"} value={"any"}> ANY </MenuItem>
                                </Select>
                            </FormControl>

                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="number"
                                    label="Number of Vancancy"
                                    fullWidth
                                    value={formValue.numberOfVacancy}
                                    name="numberOfVacancy"
                                    onChange={onChange}
                                    required
                                    InputProps={{ inputProps: { min: 1 } }}
                                />
                            </Grid>

                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Requirements"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    maxRows={8}
                                    value={formValue.requirements}
                                    name="requirements"
                                    onChange={onChange}
                                />
                            </Grid>


                            <h4 style={{ textAlign: "start", marginTop: "40px" }}> Immunization Requirements </h4>

                            {formValue.immunizationRequirements.map((item, index) => {
                                return <Grid item>
                                    <FormControlLabel
                                        key={index}
                                        value={item.checked}
                                        onChange={(e) => {
                                            item.checked = e.target.checked
                                            console.log(formValue.immunizationRequirements)
                                        }}
                                        control={<Checkbox key={index} />}
                                        label={item.title}
                                        labelPlacement="end"
                                    />
                                </Grid>
                            })}

                            <h4 style={{ textAlign: "start", marginTop: "20px" }}> Other Reports </h4>

                            {formValue.otherReports.map((item, index) => {
                                return <Grid item>
                                    <FormControlLabel
                                        key={index}
                                        value={item.checked}
                                        onChange={(e) => {
                                            item.checked = e.target.checked
                                        }}
                                        control={<Checkbox key={index} />}
                                        label={item.title}
                                        labelPlacement="end"
                                    />
                                </Grid>

                            })}



                        </div>
                    </Grid>

                    <Grid item style={{ margin: "30px 0px" }}>
                        <Button
                            type="submit"
                            variant='contained'
                            fullWidth> Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        )
    } else {
        return (
            <center>
                <h1>Agency application not found</h1>
            </center>
        )
    }
}

export default AgencyStudentApplicationRequest;

AgencyStudentApplicationRequest.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var agencyData = null;
    if ((token && user) && user.id) {
        agencyData = await retrieveAgencyApplicationFormByAgencyId(token, user.id);
    }
    return { token, user, agencyData };
}