// @ts-check

import React, { useState } from 'react';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { retrieveTimesheetsByInstructorId, setTimesheetStatus } from '../../../api/timesheet_api';
import ErrorDialog from '../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../components/notification_toast/notification_toast';
import { dangerColor, primaryColor, successColor } from '../../../utils/colors';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

/**
 * @param {Array.<Object>} timesheets array of entries in the 'timesheet' table
 */
function InstructorTimesheet({ token, user, timesheets }) {
	const router = useRouter();

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	
	if (timesheets.length > 0) {
		const [items, setItems] = useState(timesheets);

		// Called after successfully approving or rejecting a timesheet. Removes that
		//   timesheet from the timesheets array.
		const remove = (item) => {
            setItems(items.filter((el) => el !== item));
        };
		
		// Button instructor clicks approved/denied button
		var buttonAction = async (e, status, index, item) => {
	        e.preventDefault();

			var success = null;
			
			// If it's denied, they must provide a reason
			if (status === 'denied') {
				var message = '';
				while (message == '') {
					message = prompt('Enter reason for denial:');
					
					// If they click 'Cancel', return without updating the timesheet status
					if (message == null) {
						return;
					}
				}		
				success = await setTimesheetStatus(token, timesheets[index].id, 'denied', message);
			}
			else {
				success = await setTimesheetStatus(token, timesheets[index].id, 'approved', '');
	        }
			if (success) {
				setSuccessMessage('Successfully set timesheet status');
				remove(item);
			} else {
				setErrorMessage('Could not connect to database');
			}
	    }

		return (
			<center>
				<NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error"} />
				{items.map((item, index) => (
					<center>
						<h1>Pending student timesheets</h1>
						<label>{`Student ID: ${item.studentId}`}</label>
						<br></br>
						<label>{`Description: ${item.description}`}</label>
						<br></br>
						<label>{`Number of hours: ${item.hours}`}</label>
						<br></br>
						<label>{`Start date: ${item.startDate}`}</label>
						<br></br>
						<label>{`End date: ${item.endDate}`}</label>
						<br></br>
						<Button onClick={async (e) => { buttonAction(e, 'approved', index, item) }} variant='contained' sx={{ backgroundColor: successColor }}>
							Approve
						</Button> &nbsp; &nbsp;
						<Button onClick={async (e) => { buttonAction(e, 'denied', index, item) }} variant='contained' sx={{ backgroundColor: dangerColor }}>
							Deny
						</Button>
					</center>	
				))}			
			</center>
		)
	} else {
		return (
			<center>
				<h1>No pending student timesheets found</h1>
			</center>
		)
	}
}

export default InstructorTimesheet;

InstructorTimesheet.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
	var timesheets = null;
	
	if ((token && user) && user.id) {
		timesheets = await retrieveTimesheetsByInstructorId(token, user.id);
	}
    
	if (!timesheets || !Array.isArray(timesheets)) {
		timesheets = [];
	} else {
		// Only want pending timesheets
		if (timesheets.length > 0) {
			timesheets = timesheets.filter(function (el) {
				return el.status == 'pending'
			});
		}
	}

    return { token, user, timesheets };
}