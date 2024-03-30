// @ts-check

import Paper from '@mui/material/Paper';
import { Button, Grid, TextField, Typography, Dialog } from '@mui/material';
//import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { execGetPasswordFromEmail, execSaveResetPasswordToken } from '../api/auth_api';
//import ErrorDialog from '../components/error_dialog/error_dialog';
//import NotificationToast from '../components/notification_toast/notification_toast';
//import { useAuth } from '../contexts/auth_context';
//import { primaryColor } from '../utils/colors';
import LockResetIcon from '@mui/icons-material/LockReset';

// Allows the user to enter the email address associated with their account, and a link for resetting
//   their password will be sent to that email address.
function ForgotPassword()
{
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [dialogTitle, setDialogTitle] = useState('');
	const [dialogMessage, setDialogMessage] = useState('');
	const handleClose = () => {
		setOpen(false);
	};
	
	// Called on button click
    var sendLink = async (e) =>
    {
        e.preventDefault();
		
        if (document.getElementById('emailInput')) {
            if (document.getElementById('emailInput').value && navigator.onLine) {
				// Get the email address from the input element and make it lowercase
                const emailAddress = (document.getElementById('emailInput').value).toLowerCase();
				
				if (document.getElementById('pleaseWait')) {
					document.getElementById('pleaseWait').innerHTML = 'Please wait...';
				}
				
				// Verify that the email address is in the database
                var password = await execGetPasswordFromEmail(emailAddress);
                if (password) {
					// Get the current date and add 30 minutes (1,800,000 ms)
					var newDate = new Date((new Date()).getTime() + 30 * 60 * 1000);
					
					var year = newDate.getFullYear();
					var month = (1 + newDate.getMonth()).toString();
					month = month.length > 1 ? month : '0' + month;
					var day = newDate.getDate().toString();
					day = day.length > 1 ? day : '0' + day;
					
					// Generate a random token string of 8 alphanumeric characters
					const token = Math.random().toString(36).substring(2, 10);
					
					// Create the expirationTime string in the format: HH:MM:SS
					var expirationTime = (newDate.getHours()).toString() + ":" + (newDate.getMinutes()).toString() + ":" + (newDate.getSeconds()).toString();
					
					// Handle case when getSeconds returns a number less than 10
					if (expirationTime.length === 7) {
						expirationTime = expirationTime.substring(0, 6) + '0' + expirationTime.substring(6, 7);
					}
					
					// Create the expirationDate string in the format: YYYY:MM:DD
					const expirationDate = year + ":" + month + ":" + day;
					
					// Create the link to email to the user
					const baseURL = window.location.origin;
					const link = `${baseURL}/change_password/${token}`;
					
					// Save the token, email address, expiration date, and expiration time in the database, and email the link.
					var tokenSave = await execSaveResetPasswordToken(token, emailAddress, expirationDate, expirationTime, link);
					if (tokenSave == "Successfully sent link") {
						setOpen(true);
						setDialogTitle('Check your email!');
						setDialogMessage('A link has been sent to ' + emailAddress + '.');
					} else if (tokenSave == "Email has already been sent") {
						setOpen(true);
						setDialogTitle('Check your email first!');
						setDialogMessage('A link has already been sent to ' + emailAddress + '.');
					} else {
						setOpen(true);
						setDialogTitle('Error!');
						setDialogMessage('A link to reset your password could not be sent.');
					}
                } else {
					setOpen(true);
					setDialogTitle('Error!');
                    setDialogMessage('Email address provided was not found.');
                }
            } else {
				if (!navigator.onLine) {
					setOpen(true);
					setDialogTitle('Error!');
					setDialogMessage('You must be connected to the internet.');
				} else {
					setOpen(true);
					setDialogTitle('Error!');
					setDialogMessage('Please enter an email address.');
				}
			}
			// Reset the text to stop saying 'Please wait...'
			if (document.getElementById('pleaseWait')) {
				document.getElementById('pleaseWait').innerHTML = '';
			}
        }
    }
	
    return (
		<Grid container justifyContent="center">
			<Grid item component={Paper} elevation={3} sx={{ margin: '5%', padding: '3% 5% 5% 5%' }}>
				<Grid container alignContent="center" justifyContent="center" flexDirection="column">
					<Grid container sx={{ mb: '3%', justifyContent: 'center', alignItems: 'center' }}>
						<LockResetIcon fontSize="large" />
						<Typography fontWeight="bold" fontSize={30} sx={{ mx: '4px' }}>Reset Password</Typography>
					</Grid>
					<Typography sx={{ mb:"3%" }}>Enter the email address of your account to reset your password.</Typography>
					<Grid container flexWrap="nowrap" justifyContent="space-between">
					<TextField label="Email Address" size="small" fullWidth type="text" id="emailInput" style={{ marginRight: "10px" }} />
					<Button variant="contained" sx={{ px: '10%'}} onClick={sendLink}>
						Submit
					</Button>
					</Grid>
				</Grid>
			</Grid>
			<p id='pleaseWait'></p>
			<Dialog open={open} onClose={handleClose}>
				<Grid sx={{ padding: '10%'}} container flexDirection="column" flexWrap="nowrap" justifyContent="center" alignContent="center">
					<Typography fontSize="24px" fontWeight='bold' align="center">{dialogTitle}</Typography>
					<Typography align="center">{dialogMessage}</Typography>
				</Grid>
			</Dialog>
		</Grid>
    )
}

export default ForgotPassword;