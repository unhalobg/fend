// change to fit viewing learning contracts, ask them to enter a student ID and it will give the contract
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { retrieveStudentsByAgencyId } from '../../../../api/placement_api';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';

/**
 * @param {Array.<Object>} students array of student information for students placed with this agency
 */
function ViewDocument({ token, user, students }) {
	
    const router = useRouter()
	
	if (students.length > 0) {
		return (
			<center>
				{students.map((item, index) => (
					<div>
						<label>{`${item.firstName} ${item.lastName}`}</label>
						<Button onClick={async (e) => {
							router.push(`/document/${item.studentId}`)
						}}>View documents
						</Button>
					</div>
				))}
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

export default ViewDocument;

ViewDocument.getInitialProps = async ({ req }) => {
	
    const { token, user } = getUserAndTokenFromCookies(req);
	
	var students = [];
	
	if ((token && user) && user.id) {
		students = await retrieveStudentsByAgencyId(token, user.id);
	}
	
	if (!students) {
		students = [];
	}
	
    return { token, user, students };
}