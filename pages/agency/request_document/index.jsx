import { Box, TableSortLabel, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { createDocumentRequest } from '../../../api/document_request_api'
import { getUserAndTokenFromCookies } from '../../../utils/secret'
import moment from 'moment'
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { dangerColor, primaryColor, successColor } from '../../../utils/colors';

function RequestDocument({ token, user, students }) {
	
    const router = useRouter()
    
	const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
	
	if (students.length > 1) {
		return (
			<Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>
				<Button onClick={async (e) => {
					if (navigator.onLine) {
						const success = await createDocumentRequest(token, agencyId, studentId, documentName)
						if (success) {
							setSuccessMessage('Request created')
						} else {
							setErrorMessage('Could not connect to the database')
						}
					} else {
						setErrorMessage('Must be online to request a document')
					}
				}}>Request document
				</Button>
			</Grid>
		)
	} else {
		return (
			<center>
				<h1>No students placed yet<h1>
			</center>
		)
	}
}

export default RequestDocument

RequestDocument.getInitialProps = async ({ req }) => {
	
    const { token, user } = getUserAndTokenFromCookies(req)
	
	var students = [];
	
	if ((token && user) && user.id) {
		students = await retrieveStudentsByAgencyId(token, user.id)
	}
	
	if (!students) {
		students = []
	}
	
    return { token, user, students }
}