// @ts-check

import React from "react";
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import { retrieveDocumentRequestsByStudentId } from '../../../../api/document_request_api';

/**
 * @param {Array.<Object>} requests array of document requests from the student's agency
 */
function StudentDocumentViewRequest({ token, user, requests }) {
	
	if (requests.length > 0) {
		return (
			<center>
				<h1>Document requests from agency</h1>
				
				{requests.map((item, index) => (
					<center>
						<label>{`${item.documentName}`}</label>
					</center>
                ))}
			</center>
		)
	} else {
		return (
			<center>
				<h1>No requests found</h1>
			</center>
		)
	}
}

export default StudentDocumentViewRequest

StudentDocumentViewRequest.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
	
	var requests = [];
	
	if ((token && user) && user.id) {
		requests = await retrieveDocumentRequestsByStudentId(token, user.id);
	}
	
	if ((!requests) || (!Array.isArray(requests))) {
		requests = [];
	}

    return { token, user, requests };
}