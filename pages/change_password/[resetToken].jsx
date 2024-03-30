// @ts-check

import { Button, Card, CircularProgress, Grid, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ErrorDialog from '../../components/error_dialog/error_dialog';
import NotificationToast from '../../components/notification_toast/notification_toast';
//import { useAuth } from '../../contexts/auth_context';
import { execGetResetPasswordToken, execChangePassword } from '../../api/auth_api';
import { primaryColor } from '../../utils/colors';

// Page for changing the user's password
// Only accessible using the links emailed to users with the forgot_password page.
// If the user tries to go to the reset_password page without a valid token, the page
//   will render, but they won't be able to change anything.
// [resetToken] refers to the part of the URL that comes after reset_password/ and allows for
//   dynamic routing using multiple token strings in the URL.
function ChangePassword()
{
    const router = useRouter();
	
    const [formValue, setFormValue] = useState({ password1: '', password2: '' });;
	
	var onChange = (e) =>
	{
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
	
	// Get the reset password token from the URL
	// ex: localhost:3000/reset_password/mdn23t7k    mdn23t7k is the token
    var token = null;
    if (router.query.resetToken) {
        token = router.query.resetToken;
    }
	
	const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    
	
	// Called when the user clicks the submit button
    var onSubmit = async (e) =>
	{
        e.preventDefault();
		if (token && token.length === 8)
		{
			const tokenData = await execGetResetPasswordToken(token);
			if (tokenData)
			{
				const dateTemp = (tokenData.expirationDate).substring(0, 4) + '-' + (tokenData.expirationDate).substring(5, 7) +
					'-' + (tokenData.expirationDate).substring(8, 10);
				
				const tokenDateTime = dateTemp + 'T' + tokenData.expirationTime;
				const currentDate = new Date();
				const storedDate = new Date(tokenDateTime);
				if (formValue.password1 === formValue.password2)
				{
					if (currentDate.getTime() < storedDate.getTime())
					{
						const success = await execChangePassword(tokenData.email, formValue.password1);
						if (success)
						{
							setSuccessMessage("Password successfully changed.");
							setTimeout(() =>
							{
								router.push("/");
							}, 1000);
						}
						else
						{
							setErrorMessage('Could not connect to the database');
						}
					}
					else
					{
						setErrorMessage('Token has expired.');
					}
					
				}
				else
				{
					setErrorMessage('Passwords don\'t match.');
				}
			}
			else
			{
				setErrorMessage('Token not found in the database.');
			}
		}
    };
	
	// Render the password1 box, password2 box, and submit button
    return (
        <Grid container justifyContent={"center"}>
            <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
            <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Password Change Failed"} />

            <Card
                variant='elevation'
                elevation={16.0}
                style={{
                    padding: "20px 50px",
                    marginTop: "5%",
                    borderRadius: "10px",
                }}>
                <form onSubmit={onSubmit}>
                    <Grid container justifyContent="center">
                        <p style={{ fontSize: "30px", fontWeight: "bold" }}> Change Password </p>
                    </Grid>
                    <div style={{ height: "20px" }} />
                    <Grid item>
                        <TextField
                            type="password"
                            label="New Password"
                            fullWidth
                            name="password1"
                            variant="outlined"
                            value={formValue.password1}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />
                    <Grid item>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            fullWidth
                            name="password2"
                            variant="outlined"
                            value={formValue.password2}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />

                    <Grid container justifyContent="center">

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: primaryColor,
                                fontSize: "14px",
                            }}
                            type="submit"
                            fullWidth
                            className="button-block">Change Password
                        </Button>
                    </Grid>
                    <div style={{ height: "10px" }} />
                </form>
            </Card>
        </Grid>
    )
}

export default ChangePassword;