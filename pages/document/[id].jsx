// @ts-check

import React from 'react';
import { getUserAndTokenFromCookies } from '../../utils/secret';
import { useRouter } from 'next/router';
import { retrieveDocumentsByStudentId } from '../../api/document_api';
import { Button } from '@mui/material';

// TODO: make sure only agencies that are placed with the student can download the documents on this page

/**
 * @param {int} studentId ID of the student whose documents are being viewed
 * @param {Array.<{id: int, studentId: int, documentName: string, documentData: Blob}>} documents array of entries in the 'document' table
 */
function ViewDocumentStudent({ token, user, studentId, documents }) {
	
    const router = useRouter();
	
	if (documents.length > 0) {
		return (
			<center>
				<h1>Student Documents</h1>
				{documents.map((item, index) => (
					<div key={item.id}>
						<label>{`${item.documentName}`}</label>
						<Button onClick={(e) => {
							const str = (new Buffer(item.documentData, 'binary')).toString('utf8');
							const url = window.URL.createObjectURL(new Blob([str], {type: 'application/pdf'}));

							var downloadElem = document.createElement('a');
							downloadElem.href = url;
							downloadElem.download = `${item.documentName}.pdf`;
							downloadElem.click();

							window.URL.revokeObjectURL(url);
							if (document.contains(downloadElem)) {
								document.removeChild(downloadElem);
							}
							
						}}>Download</Button>
					</div>
				))}
			</center>
		)
	} else {
		return (
			<center>
				<h1>No documents found for this student</h1>
			</center>
		)
	}
}

export default ViewDocumentStudent;

ViewDocumentStudent.getInitialProps = async ({ req, query }) => {
	
	const { token, user } = getUserAndTokenFromCookies(req);
	
	var studentId = null;
	
	if (query.id) {
		studentId = query.id;
	}
	
	var documents = [];
    
	if ((token && user) && studentId) {
		documents = await retrieveDocumentsByStudentId(token, studentId);
	}
	
    if (!documents) {
		documents = [];
	}

    return { token, user, studentId, documents };
}