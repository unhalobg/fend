// @ts-check

import React, { useState } from 'react';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { retrieveAllAgencyRequestApplications } from '../../../api/agency_application_api';
import { IconButton, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import { useRouter } from 'next/router';
import { dangerColor, primaryColor, successColor } from '../../../utils/colors';
import ErrorDialog from '../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../components/notification_toast/notification_toast';
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
 * @param {Array.<Object>} formList array of agency request applications
 */
function Index({ token, user, formList }) {
    const router = useRouter();
    var statusList = ["all", "pending", "approved", "rejected"];

    /**
     * @var {string} filter (string deciding which applications get shown)
     */
    var [filter, setFilter] = useState("all");

    /**
     * @var {any} aForms (array of filtered agency request applications)
     */
    var [aForms, setForms] = useState(formList);
	
	/**
	 * onStatusFilterChange : called when the user changes which applications to show
	 * @type {void}
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
                    <h3 style={{ margin:6 }}>Agency Application Requests</h3>

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
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Agency Id</StyledTableCell>
                                <StyledTableCell align="center">Agency Name</StyledTableCell>
                                <StyledTableCell align="center">Agency Email</StyledTableCell>
                                <StyledTableCell align="center">Agency Type</StyledTableCell>
                                <StyledTableCell align="center">Application Status</StyledTableCell>
                                <StyledTableCell align="center">Review</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {aForms.map((item, index) => (
                                <StyledTableRow
                                    key={index}>
                                    <StyledTableCell align="center">{item?.agencyId}</StyledTableCell>
                                    <StyledTableCell align="center">{item?.name}</StyledTableCell>
                                    <StyledTableCell align="center">{item?.email}</StyledTableCell>
                                    <StyledTableCell align="center">{item?.type}</StyledTableCell>
                                    <StyledTableCell sx={{
                                        color: item.applicationStatus == "pending" ? primaryColor :
                                            item.applicationStatus == "rejected" ? dangerColor :
                                                successColor,
                                    }} align="center">{item.applicationStatus.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            router.push("/admin/review/agency/" + item.formId)
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
        formList = await retrieveAllAgencyRequestApplications(token);
    }
    if (!formList) {
        formList = [];
    }
    return { token, user, formList };
}