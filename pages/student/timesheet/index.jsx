import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import ErrorDialog from '../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../components/notification_toast/notification_toast';
import { retrievePlacementByStudentId } from '../../../api/placement_api';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { createTimesheet } from '../../../api/timesheet_api';

/**
 * @param {int} fieldInstructorId ID of the field instructor assigned to this student
 */
function StudentTimesheet({ token, user, fieldInstructorId }) {
    const router = useRouter();

    const [formValue, setFormValue] = useState({ desc: '', hours: 0.0, startDate: '2023-05-01', endDate: '2023-05-01'});

    const onChange = (e) => {
        e.preventDefault();
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (navigator.onLine) {
            // Store the timesheet using the user id, field instructor id, description, number of hours, start date, and end date.
            //   The id will be automatically generated, and the status will be set to 'pending' by default.
            const success = await createTimesheet(token, user.id, fieldInstructorId, formValue.desc, formValue.hours, formValue.startDate, formValue.endDate);
            if (success) {
                setSuccessMessage('Timesheet entry successfully created');
            } else {
                setErrorMessage('Could not connect to the database');
            }
        } else {
            setErrorMessage('Must be connected to the internet');
        }
    };

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    if (fieldInstructorId) {
        return (
            <center>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error"} />
                <form onSubmit={onSubmit}>
                    <h2 style={{ textAlign: "center", marginLeft: "40px", marginRight: "40px" }}>Create Timesheet</h2>
                    <Grid elevation={3} component={Paper} style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2px", paddingBottom: "20px" }}>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                label="Description"
                                fullWidth
                                value={formValue.desc}
                                name="desc"
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <TextField
                                type="number"
                                label="Number of hours"
                                value={formValue.hours}
                                name="hours"
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <label>Start Date</label>
                            <br></br>
                            <input
                                type="date"
                                label="Start Date"
                                value={formValue.startDate}
                                name="startDate"
                                onChange={onChange}
                                required
                            />
                        </Grid>
                        <Grid item style={{ marginBottom: "20px" }}>
                            <label>End Date</label>
                            <br></br>
                            <input
                                type="date"
                                label="End Date"
                                value={formValue.endDate}
                                name="endDate"
                                onChange={onChange}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid item style={{ margin: "30px 0px" }}>
                        <Button
                            type="submit"
                            variant='contained'
                        >Submit timesheet
                        </Button>
                    </Grid>
                </form>
            </center>
        )
    } else {
        <center>
            <h1>A field instructor must be assigned to you before creating a timesheet</h1>
        </center>
    }
}

export default StudentTimesheet;

StudentTimesheet.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);

    var placement = null;
    var fieldInstructorId = null;

    if ((token && user) && user.id) {
        placement = await retrievePlacementByStudentId(token, user.id);
    }

    if (placement && placement.fieldInstructorId) {
        fieldInstructorId = placement.fieldInstructorId;
    }

    return { token, user, fieldInstructorId };
}