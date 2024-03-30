// @ts-check

import React, { useState } from 'react';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { IconButton, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { useRouter } from 'next/router';
import { dangerColor, primaryColor, successColor } from '../../../utils/colors';
import { retrieveAllStudentApplications } from '../../../api/student_application_api';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import FilterListIcon from '@mui/icons-material/FilterList';

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
 * @param {Array.<Object>} formList array of student applications
 */
function Index({ token, user, formList }) {
    const router = useRouter();
    var statusList = ["all", "pending", "approved", "matched", "rejected"];
    var [filter, setFilter] = useState("all");
    var [aForms, setForms] = useState(formList);

    /**
     * @func {void} onStatusFilterChange
     */
    const onStatusFilterChange = (e) => {
        setFilter(e.target.value);
        if (e.target.value == "all") {
            setForms(formList);
        } else {
            aForms = formList.filter((item) => item.applicationStatus == e.target.value);
            setForms(aForms);
        }
    }

    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>

            <Grid container justifyContent={"center"} style={{ width: "70%" }}>
                <Grid sx={{mb:2}} container justifyContent={"space-between"}>
                    <h3 style={{ margin:6 }}>Student Application Requests</h3>

                    <FormControl sx={{ minWidth: 175 }} size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            sx={{textAlign: "center"}}
                            name="filter"
                            label="Status"
                            value={filter}
                            onChange={onStatusFilterChange}>
                            {statusList.map((item, index) => {
                                return <MenuItem key={index} value={item}> 
                                            <IconButton sx={{ pt:0, pb:0 }}>
                                                <FilterListIcon />
                                            </IconButton>
                                            {item.toUpperCase()} 
                                        </MenuItem>

                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <TableContainer component={Paper} elevation={3}>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Student Id</StyledTableCell>
                                <StyledTableCell align="center">Student Name</StyledTableCell>
                                <StyledTableCell align="center">Student Email</StyledTableCell>
                                <StyledTableCell align="center">Degree Level</StyledTableCell>
                                <StyledTableCell align="center">Application Status</StyledTableCell>
                                <StyledTableCell align="center">Review</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {aForms.map((item, index) => (
                                <StyledTableRow
                                    key={index}>
                                    <StyledTableCell align="center">{item.studentId}</StyledTableCell>
                                    <StyledTableCell align="center">{item.firstName + " " + item.lastName}</StyledTableCell>
                                    <StyledTableCell align="center">{item.email}</StyledTableCell>
                                    <StyledTableCell align="center">{item.degreeLevel.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell sx={{
                                        color: item.applicationStatus == "pending" ? primaryColor :
                                            item.applicationStatus == "rejected" ? dangerColor :
                                                successColor,
                                    }} align="center">{item.applicationStatus.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            router.push("/admin/review/student/" + item.formId)
                                        }}>Review</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    )
}

export default Index

Index.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formList = [];
    if (token) {
        formList = await retrieveAllStudentApplications(token);
    }
    if (!formList) {
        formList = [];
    }
    return { token, user, formList };
}