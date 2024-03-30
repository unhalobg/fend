// @ts-check
// TODO: Modify this to be agency contract
import React, { useState, useEffect } from "react";
import { Button } from '@mui/material'
import { getUserAndTokenFromCookies } from '../../../utils/secret';
//import { createAgencyContract } from '../../../api/agency_contract_api';
import ErrorDialog from '../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../components/notification_toast/notification_toast';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { notifyAdminsAboutAgencyContractUpload } from '../../../api/notifications_api';
import { createOrUpdateAgencyContract } from '../../../api/agency_contract_api';

function AgencyContractUpload({ user, token }) {

	// Returns true if name satisfies OS file name restrictions and false otherwise
	function checkFileName(name) {
		var c1 = /^[^\\/:\*\?"<>\|]+$/;
		var c2 = /^\./;
		var c3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i;
		return c1.test(name) && !c2.test(name) && !c3.test(name);
	}
	
	// @ts-ignore
	const router = useRouter();
	
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
	
    const [files, setFiles] = useState([]);
	
	// Only accept a single file (pdf only, 10MiB maximum size)
	const {getRootProps, getInputProps} = useDropzone({
		accept: {
			'application/pdf': ['.pdf']
		}, multiple: false, maxFiles: 1, maxSize: 10737418240,
		onDrop: acceptedFiles => {
			// @ts-ignore
			setFiles(acceptedFiles);
		}
	});

	useEffect(() => {
		if (document.getElementById('pendingText')) {
			if (files.length > 0) {
				// @ts-ignore
				document.getElementById('pendingText').innerHTML = `${files[0]?.name} pending`;
			} else {
				// @ts-ignore
				document.getElementById('pendingText').innerHTML = `No file pending`;
			}
		}
	}, [files]);
	
	if ((token && user) && (user.id && user?.role == 'agency')) {
		return (
			<center>
				<NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
				<ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error"} />
				<h1>Upload Agency Contract </h1>
				<br></br>
				<div {...getRootProps()} className="dropzone-container" style={{"outlineStyle": "dashed", "color": "blue", "width": "180px"}}>Click here to upload (PDF only, 10MiB maximum)
					<input {...getInputProps()}/>
				</div>
				<br></br>
				<label>Contract name:</label>&nbsp;
				<input type="text" id="docName" 
// @ts-ignore
				size="20"></input>
				<br></br>
				<Button onClick={async (e) => {
					e.preventDefault();
					if (Array.isArray(files) && files.length > 0) {
						if (navigator.onLine) {
							if (document.getElementById('errorText')) {
								// @ts-ignore
								document.getElementById('errorText').innerHTML = '';
							}
							// @ts-ignore
							if (document.getElementById('docName') && document.getElementById('docName').value) {
								// @ts-ignore
								const name = document.getElementById('docName').value;
								if (name.length >= 3 && name.length <= 60) {
									if (checkFileName(name)) {
										if (confirm('Are you sure you want to share this document with administrators from UTA?')
											&& document.getElementById('docName'))
										{
											// Use FileReader to convert the file to string
											const reader = new FileReader();
											reader.addEventListener("load", async () => {
												// Convert the string to binary so it can be stored in the database
												const successAgency = await createOrUpdateAgencyContract(token, user.id, name, (reader.result).toString('binary'));
												const notifyAgencySuccess = await notifyAdminsAboutAgencyContractUpload(token, user.id);
												if (successAgency && notifyAgencySuccess) {
													// @ts-ignore
													setSuccessMessage('Successfully uploaded ' + document.getElementById('docName').value  + ' and Admin notified');
												} else {
													// @ts-ignore
													setErrorMessage('Could not connect to the database');
												}
												if (document.getElementById('pendingText')) {
													// @ts-ignore
													document.getElementById('pendingText').innerHTML = '';
												}
											}, false);
											// TODO: find out the correct encoding for pdfs (change from 'ISO-8859-1')
											reader.readAsText(files[0], 'ISO-8859-1');
											setFiles([]);
										}
									} else {
										if (document.getElementById('errorText')) {
											// @ts-ignore
											document.getElementById('errorText').innerHTML = 'Invalid document name\nTry removing any special characters';
										}
									}
								} else {
									if (document.getElementById('errorText')) {
										// @ts-ignore
										document.getElementById('errorText').innerHTML = 'Document name must be 3-60 characters long';
										setTimeout(() => {
											if (document.getElementById('errorText')) {
												// @ts-ignore
												document.getElementById('errorText').innerHTML = '';
											}
										}, 4000);
									}
								}
							} else {
								if (document.getElementById('errorText')) {
									// @ts-ignore
									document.getElementById('errorText').innerHTML = 'Could not get name';
								}
							}
						} else {
							if (document.getElementById('errorText')) {
								// @ts-ignore
								document.getElementById('errorText').innerHTML = 'You must be online to upload your contract to the database';
							}
							setTimeout(() => {
							if (document.getElementById('errorText')) {
								// @ts-ignore
								document.getElementById('errorText').innerHTML = '';
							}
						}, 4000);
						}
					} else {
						if (document.getElementById('errorText')) {
							// @ts-ignore
							document.getElementById('errorText').innerHTML = 'Please upload a document first (PDF only, 10MB maximum)';
						}
					}
				}}>Submit Contract</Button>
				<br></br>
				<p id='pendingText'></p>
				<br></br>
				<p id='errorText' style={{"color": "red", "width": "320px"}}></p>
			</center>
		)
	} else {
		return (
			<center>
				<h1>Must be logged in as a agency to use this page</h1>
			</center>
		)
	}   
}

export default AgencyContractUpload;

AgencyContractUpload.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);

    return { user, token };
}