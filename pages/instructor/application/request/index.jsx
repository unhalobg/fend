// @ts-check

import React, { useState } from 'react';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import { createInstructorApplication } from '../../../../api/instructor_application_api';
import { retrieveApprovedAgencyApplications } from '../../../../api/agency_application_api';
import { execUpdateUserStatus } from '../../../../api/auth_api';
import { Button, Grid, TextField } from '@mui/material';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import { useAuth } from '../../../../contexts/auth_context';
import { useRouter } from 'next/router';
import { primaryColor } from '../../../../utils/colors';
import Paper from '@mui/material/Paper';

// Render every agency name with a button next to each. When the button is clicked,
//   create a new instructor application with the instructor's id and the agency's id.
/**
 * @param {Array.<Object>} agencies array of entries in the 'agency_application' table
 */
function InstructorApplicationRequest({ token, user, agencies }) {
    const router = useRouter();

    const { updateUser } = useAuth();
	
    if (agencies == null || JSON.stringify(agencies) == JSON.stringify([])) {
        return (
            <center>
                <h1>No agencies have been approved yet</h1>
            </center>
        )
    } else {
        const [errorMessage, setErrorMessage] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);

        const [formValue, setFormValue] = useState({
            instructorId: user?.id,
            agencyId: agencies[0].agencyId,
            agencyName: agencies[0].name,
            firstName: '',
            middleName: '',
            lastName: '',
            email: user.email,
            phone: '',
            mobile: ''
        });

        const onChange = (e) => {
            e.preventDefault();
            setFormValue({ ...formValue, [e.target.name]: e.target.value });
        };

        const onSubmit = async (e) => {
            e.preventDefault();
            
            console.log(formValue);
            const s1 = await createInstructorApplication(token, formValue);
            var s2 = null;
            if (user.id) {
                s2 = await execUpdateUserStatus(user.id, 'applied');
            }
            
            //const s3 = await notifyAgencyAboutInstructorApplication(token, formValue);
            if (s1 && s2) {
                setSuccessMessage('Successfully submitted request');
                setTimeout(() => {
                    if (user.email) {
                        updateUser(user.email);
                    }
                    
                    router.push('/instructor/application/status');
                }, 1000);
            } else {
                setErrorMessage('Could not connect to the database');
            }
        };

        return (
            <center>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={'Error'} />
                <Grid elevation={3} component={Paper} style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '2px', paddingBottom: '20px' }}>
                    <form onSubmit={onSubmit}>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <TextField
                                label='First Name'
                                fullWidth
                                value={formValue.firstName}
                                name='firstName'
                                onChange={onChange}
                                required
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <TextField
                                label='Middle Name'
                                fullWidth
                                value={formValue.middleName}
                                name='middleName'
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <TextField
                                label='Last Name'
                                fullWidth
                                value={formValue.lastName}
                                name='lastName'
                                onChange={onChange}
                                required
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <TextField
                                label='Phone Number'
                                fullWidth
                                value={formValue.phone}
                                name='phone'
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <TextField
                                label='Mobile Number'
                                fullWidth
                                value={formValue.mobile}
                                name='mobile'
                                onChange={onChange}
                                required
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: '20px' }}>
                            <select
                                onChange={e => {
                                    setFormValue({ ...formValue, agencyId: agencies[agencies.indexOf(e.target.value)].id });
                                    setFormValue({ ...formValue, agencyName: agencies[agencies.indexOf(e.target.value)].name });
                            }}>
                                {agencies.map(opt => <option>{opt.name}</option>)}
                            </select>
                        </Grid>

                        <Grid item style={{ margin: "30px 0px" }}>
                            <Button
                                type="submit"
                                variant='contained'
                                fullWidth > Submit
                            </Button>
                        </Grid>

                    </form>
                </Grid>
            </center>
        )
    }
}

export default InstructorApplicationRequest;

InstructorApplicationRequest.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);

    var agencies = null;

    if (token) {
        agencies = await retrieveApprovedAgencyApplications(token);
    }
    
    return { token, user, agencies };
}
