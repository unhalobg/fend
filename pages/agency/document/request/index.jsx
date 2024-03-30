import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { retrieveStudentsByAgencyId } from '../../../../api/placement_api'
import { createDocumentRequest } from '../../../../api/document_request_api'
import { getUserAndTokenFromCookies } from '../../../../utils/secret'
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';

function RequestDocument({ token, user, students }) {
	
    const router = useRouter();
    
	const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
	
	const [index, setIndex] = useState(0);
	
	if (students.length > 0) {
		return (
			<center>
				<NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />
				<h1>Request document from student</h1>
				<div>
					<label>Send request to</label> &nbsp;
					<select onChange={e => setIndex(students.indexOf(e.target.value))}>
						{students.map(opt => <option>{`${opt.firstName} ${opt.lastName}`}</option>)}
					</select>
				</div>
				&nbsp;
				<div>
					<label>Document name</label> &nbsp;
					<input type="text" id='docName' size="10"></input>
				</div>
					<Button onClick={async (e) => {
						e.preventDefault;
						if (navigator.onLine) {
							if (document.getElementById('docName') && document.getElementById('docName').value) {
								const docName = document.getElementById('docName').value;
								if (docName.length >= 3 && docName.length <= 60) {
									const success = await createDocumentRequest(token, user.id, students[index].studentId, docName);
									if (success) {
										setSuccessMessage('Request created');
									} else {
										setErrorMessage('Could not connect to the database');
									}
								} else {
									setErrorMessage('Document name must be 3-60 characters');
								}
							} else {
								setErrorMessage('Couldn\'t get document name');
							}
							
						} else {
							setErrorMessage('Must be online to request a document');
						}
					}}>Request document
					</Button>
			</center>
		)
	} else {
		return (
			<center>
				<h1>No students placed yet</h1>
			</center>
		)
	}
}

export default RequestDocument;

RequestDocument.getInitialProps = async ({ req }) => {
	
    const { token, user } = getUserAndTokenFromCookies(req);
	
	var students = [];
	
	if ((token && user) && user.id) {
		students = await retrieveStudentsByAgencyId(token, user.id);
	}
	
	if (!students) {
		students = [];
	}
	console.log(students)
	
    return { token, user, students };
}