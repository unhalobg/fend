import { Button, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { Container } from '@mui/system'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { retrievePlacementRequestByFormId } from '../../api/agency_student_request_application_api'
import { retrieveStudentsFromPlacementByFormId } from '../../api/placement_api'
import CustomTableRow from '../../components/custom_table_row/custom_table_row'
import { getUserAndTokenFromCookies } from '../../utils/secret'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

/**
 * @param {Object} placement student placement information
 * @param {Array.<Object>} students array of students in the placement
 */
function PlacementDetail({ token, user, placement, students, formId }) {
    const router = useRouter();
    if (placement && students) {
        return (
            <Container>
                <Typography >
                    <h3>Placement Information </h3>
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <TableBody>
                            <CustomTableRow title={"Created At"} value={moment(placement.createdAt).format('MM/DD/YYYY \xa0 h:mm A')} />
                            <CustomTableRow title={"Degree Level"} value={placement.degreeLevel.toUpperCase()} />
                            <CustomTableRow title={"Basic Requirements"} value={placement.requirements} />
                            <CustomTableRow title={"Immunization Requirements"} value={JSON.parse(placement.immunizationRequirements)
                                .filter((item) => item.checked).map((item, index) => {
                                    return <p> - {item.title}
                                    </p>
                                })} />
                            <CustomTableRow title={"Other Reports"} value={JSON.parse(placement.otherReports)
                                .filter((item) => item.checked).map((item, index) => {
                                    return <p> - {item.title}
                                    </p>
                                })} />
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography >
                    <h3>Students</h3>
                </Typography>
                <TableContainer component={Paper} elevation={3} sx={{ mb: "2%" }}>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Student ID</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Matched Date</StyledTableCell>
                                <StyledTableCell align="center">More</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((item, index) => (
                                <StyledTableRow
                                    key={index}>
                                    <StyledTableCell align="center">{item.firstName + " " + item.lastName}</StyledTableCell>
                                    <StyledTableCell align="center">{item.studentId}</StyledTableCell>
                                    <StyledTableCell align="center">{item.email}</StyledTableCell>
                                    <StyledTableCell align="center">{moment(item.createdAt).format('MM/DD/YYYY \xa0 h:mm A')}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            router.push("/student/detail/" + item.studentId)
                                        }}>More</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    } else {
        return (
            <center>
                <h1>Could not retrieve student application/placement form</h1>
            </center>
        )
    }
}

export default PlacementDetail;

PlacementDetail.getInitialProps = async ({ req, query }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formId = null;
    if (query.id) {
        formId = query.id;
    }
    var placement = null;
    var students = null;
    if (token && formId) {
        placement = await retrievePlacementRequestByFormId(token, formId);
        students = await retrieveStudentsFromPlacementByFormId(token, formId);
    }
    
    return { token, user, placement, students, formId };
}