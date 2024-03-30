// @ts-check
// TODO: Make sure this works as intended, this is just a rough draft copied from page/document
import React from 'react';
import { getUserAndTokenFromCookies } from '../../utils/secret';
import { useRouter } from 'next/router';
import { retrieveLearningContractsByStudentId } from '../../api/learning_contract_api';
import { Button } from '@mui/material';

// TODO: make sure only agencies that are placed with the student can download the documents on this page

/**
 * @param {int} studentId ID of the student whose documents are being viewed
 * @param {Array.<{id: int, studentId: int, learningContractName: string, learningContractData: Blob}>} learning_contracts array of entries in the 'document' table
 */
function ViewLearningContractStudent({ token, user, studentId, learning_contracts }) {
	
    const router = useRouter();
	
	if (learning_contracts.length > 0) {
		return (
			<center>
				<h1>Student Documents</h1>
				{learning_contracts.map((item, index) => (
					<div key={item.id}>
						<label>{`${item.learningContractName}`}</label>
						<Button onClick={(e) => {
							const str = (new Buffer(item.learningContractData, 'binary')).toString('utf8');
							const url = window.URL.createObjectURL(new Blob([str], {type: 'application/pdf'}));

							var downloadElem = document.createElement('a'); // document. might need to change
							downloadElem.href = url;
							downloadElem.download = `${item.learningContractName}.pdf`;
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

export default ViewLearningContractStudent;

ViewLearningContractStudent.getInitialProps = async ({ req, query }) => {
	
	const { token, user } = getUserAndTokenFromCookies(req);
	
	var studentId = null;
	
	if (query.id) {
		studentId = query.id;
	}
	
	var documents = [];
    
	if ((token && user) && studentId) {
		documents = await retrieveLearningContractsByStudentId(token, studentId);
	}
	
    if (!documents) {
		documents = [];
	}

    return { token, user, studentId, documents };
}