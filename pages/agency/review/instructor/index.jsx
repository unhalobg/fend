import React, { useState } from 'react';
import { Button, Grid, Table, TableBody, TableContainer, Typography } from '@mui/material';
import { retrieveInstructorApplicationsByAgencyId, updateInstructorApplicationStatus } from '../../../../api/instructor_application_api';
import { execUpdateUserStatus } from '../../../../api/auth_api';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import Paper from '@mui/material/Paper';
import CustomTableRow from '../../../../components/custom_table_row/custom_table_row';
import { dangerColor, primaryColor, successColor } from '../../../../utils/colors';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import { useRouter } from 'next/router';

/**
 * @param {Array.<Object>} formData array of instructor applications to this agency
 */
function Instructor({ token, user, formData }) {
    const router = useRouter();
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    var buttonAction = async (e, status, instructorId, formId) => {
        e.preventDefault();
        var s1 = null;
        var s2 = null;
        var message = '';
        // If it's denied, the agency must provide a reason
        if (status == 'denied') {
            while (message == '') {
                message = prompt('Enter reason for denial:');
            }
        }
		
		s1 = await updateInstructorApplicationStatus(token, formId, status, message);
		if (status != 'rejected') {
			s2 = await execUpdateUserStatus(instructorId, status);
		} else {
			s2 = true;
		}
        
		
        if (s1 && s2) {
            setSuccessMessage('Successfully updated instructor application');
            setTimeout(() => {
                router.reload();
            }, 1000);
        } else {
            setErrorMessage('Could not connect to the database');
        }
    }

    if (formData.length > 0) {
        return (
            <center>
				<NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error"} />
                <h1>Instructor Applications</h1>
                {formData.map((item, index) => (
					<center key={item.formId}>
						<TableContainer component={Paper} elevation={3}>
	                        <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
	                            <TableBody>
									<CustomTableRow title={"Instructor Name"} value={(item.middleName) ? `${item?.firstName} ${item?.middleName} ${item?.lastName}` : `${item?.firstName} ${item?.lastName}`} />
									<CustomTableRow title={"Instructor Email Address"} value={item?.email} />
									<CustomTableRow title={"Instructor Phone Number"} value={(item.phone) ? item.phone : 'None provided'} />
									<CustomTableRow title={"Instructor Mobile Number"} value={item?.mobile} />
									
									<CustomTableRow title={"Application Status"} value={<p style={{
							color: item.status == "pending" ? primaryColor :
							item.status == "rejected" ? dangerColor :
										successColor,
						}}>{item.status}</p>} />
								</TableBody>
							</Table>
						</TableContainer>
					{
						item.status == "approved" ?
							<center>
								<Button fullWidth onClick={async (e) => { buttonAction(e, "pending", item.instructorId, item.formId) }} variant='contained' sx={{ backgroundColor: dangerColor }}>
									Cancel Approval
								</Button>
							</center>
						:
							item.status == "rejected" ?
								<center>
									<Button fullWidth onClick={async (e) => { buttonAction(e, "pending", item.instructorId, item.formId) }} variant='contained' sx={{ backgroundColor: dangerColor }}>
										Cancel Rejection
									</Button>
								</center>
							:
								<center>
									<Button fullWidth onClick={async (e) => { buttonAction(e, "approved", item.instructorId, item.formId) }} variant='contained'>
										Approve
									</Button>
									<Button fullWidth onClick={async (e) => { buttonAction(e, "rejected", item.instructorId, item.formId) }} variant='contained' sx={{ backgroundColor: dangerColor }}>
										Reject
									</Button>
								</center>
					}
					</center>
				))}
            </center>
        )
    } else {
        return (
            <center>
                <h1>No applications found</h1>
            </center>
        )
    }
}

export default Instructor;

Instructor.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formData = [];
    if ((token && user) && user.id) {
        formData = await retrieveInstructorApplicationsByAgencyId(token, user.id);
    }
    if (!formData) {
        formData = [];
    }/* else {
    	if (Array.isArray(formData)) {
    		formData = formData.filter(el => formData.status == 'pending');
    	}
    }*/

    return { user, token, formData };
}