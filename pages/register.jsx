// @ts-check

import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ErrorDialog from '../components/error_dialog/error_dialog';
import NotificationToast from '../components/notification_toast/notification_toast';
import { useAuth } from '../contexts/auth_context';
import { primaryColor } from '../utils/colors';
import { execIdSearch, execEmailSearch } from '../api/auth_api';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

const TextField = styled(MuiTextField)({
  '& .MuiFormHelperText-root': {
    width: 250,
  },
});

let passwordError = '';
const hasNumber = /\d/;
const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasSymbol = /[~!@#\$%\^\&\*_\-\+=`\|\\\(\){}\[\]:;'"<>,.?\/]/;

function validatePassword(password) {
    if (!password) {
        passwordError = '';
        return false;
    }
    if (password.length < 8) {
        passwordError = "Must have at least 8 characters.";
    }
    else if (!hasLowercase.test(password)) {
        passwordError = "Must include at least 1 lowercase letter.";
    }
    else if (!hasUppercase.test(password)) {
        passwordError = "Must include at least 1 uppercase letter.";
    }
    else if (!hasNumber.test(password)) {
        passwordError = "Must include at least 1 number.";
    }
    else if (!hasSymbol.test(password)) {
        passwordError = "Must include at least 1 of the following symbols: ~!@#$%^&*_-+=`|\\(){}[]:;'\"<>,.?/";
    }
    else {
        passwordError = '';
    }
    return passwordError ? true : false;
}

function Register() {
    const router = useRouter()
    const { register } = useAuth()

    const [formValue, setFormValue] = useState({ id: "", email: "", password: "", confirmPassword: "", role: "student" });

    var onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    var onSubmit = async (e) => {
        e.preventDefault();
		
		// Used for testing for unique ids and email addresses
		// If 'Not found' is returned when searching for the id/email, that means the id/email wasn't found,
		//   which means they can be used
		var searchTest = null;
		
		// If true, then the account will be registered
		var success = null;
		if (navigator.onLine) {
				
			// If they aren't a student, they need to be given an id
			if (formValue.role !== 'student')
			{
				// Loops until an unused id is generated (very unlikely to loop)
				while (searchTest !== 'Not found') {
				    // Generate an id
					var randomId = (Math.random() * 10000000) + 1;
					
					// Check if the id already exists in the database
					searchTest = await execIdSearch(randomId);
				}
				
				// Check if the email already exists in the database
				searchTest = await execEmailSearch(formValue.email);
				
				if (searchTest !== 'Not found') {
					if (searchTest !== null) {
						setErrorMessage('An account with that email address already exists.');
					} else {
						setErrorMessage('Could not connect to the database.');
					}
				} else {
					success = await register(randomId, formValue.email, formValue.password, formValue.role);
				}
            // If they are a student, check the id and email they entered
			} else {
				// Check if the id already exists in the database
				searchTest = await execIdSearch(formValue.id);
				if (searchTest !== 'Not found') {
					if (searchTest !== null) {
						setErrorMessage('An account with that ID already exists.');
					} else {
						setErrorMessage('Could not connect to the database.');
					}
				} else {
					// Check if the email already exists in the database
					searchTest = await execEmailSearch(formValue.email);
					if (searchTest !== 'Not found') {
						if (searchTest !== null) {
							setErrorMessage('An account with that ID already exists.');
						} else {
							setErrorMessage('Could not connect to the database.');
						}
					} else {
						success = await register(formValue.id, formValue.email, formValue.password, formValue.role);
					}
				}
			}
			if (success !== null) {
				setSuccessMessage("Successfully registered");
				setTimeout(() => {
					router.push("/login");
				}, 1000);
			} else {
				//setErrorMessage('Could not connect to the database'); This was overwriting the other error msgs...
			}
		} else {
			setErrorMessage('Must be connected to the internet');
		}
    }

    return (
        <Grid container justifyContent={"center"}>
            <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
            <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Registration Failed"} />

            <Card
                variant='elevation'
                elevation={16.0}
                style={{
                    padding: "20px 50px",
                    marginTop: "3%",
                    marginBottom: "2%",
                    borderRadius: "10px",
                }}>
                <form onSubmit={onSubmit}>
                    <Grid container justifyContent="center">
                        <p style={{ fontSize: "30px", fontWeight: "bold" }}> Sign Up </p>
                    </Grid>

                    <FormControl fullWidth>
                        <InputLabel>User Type</InputLabel>
                        <Select
                            name="role"
                            label="Access Level"
                            value={formValue.role}
                            onChange={onChange}>
                            <MenuItem value={"student"}> Student </MenuItem>
                            <MenuItem value={"agency"}> Agency </MenuItem>
                            <MenuItem value={"fieldInstructor"}> Field Instructor </MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ height: "20px" }} />
                    
					<Grid item display={formValue.role === 'student' ? 'inline' : 'none'}>
                        <TextField
                            type="text"
                            label="UTA ID"
                            name='id'
                            fullWidth
                            variant="outlined"
                            value={formValue.id}
                            onChange={onChange}
							required={formValue.role === 'student'}
                            sx={{ marginBottom: '20px' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            type="email"
                            label="Email"
                            name='email'
                            fullWidth
                            variant="outlined"
                            value={formValue.email}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />
                    <Grid item>
                        <TextField
                            type="password"
                            label="Password"
                            fullWidth
                            name="password"
                            variant="outlined"
                            value={formValue.password}
                            onChange={onChange}
                            required
                            error={validatePassword(formValue.password)}
                            helperText={passwordError}
                        />
                    </Grid>
                    <div style={{ height: "20px" }} />

                    <Grid item>
                        <TextField
                            type="password"
                            label="Confirm password"
                            fullWidth
                            name="confirmPassword"
                            variant="outlined"
                            value={formValue.confirmPassword}
                            onChange={onChange}
                            required
                            error={formValue.confirmPassword && formValue.password !== formValue.confirmPassword ?
                                true : false}
                            helperText={formValue.confirmPassword && formValue.password !== formValue.confirmPassword ?
                                "Passwords do not match." : null}
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
                            className="button-block">
                            Register
                        </Button>
                    </Grid>
                    <div style={{ height: "10px" }} />


                    <Grid container justifyContent="center">
                        <p style={{ padding: "0px 50px" }}>
                            <span style={{
                                color: "black",
                                fontSize: "16px",
                            }}>Have an account? </span>
                            <Link href={"/login"}>
                                <Button
                                    key={"login"}
                                    sx={{
                                        color: primaryColor,
                                        fontSize: "16px",
                                        textDecorationLine: "underline",
                                        textUnderlineOffset: "10px",
                                        textDecorationThickness: "3px",
                                    }}>
                                    Sign In
                                </Button>
                            </Link>
                        </p>
                    </Grid>
                </form>
            </Card>
        </Grid>
    )
}

export default Register;