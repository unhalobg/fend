import { useRouter } from 'next/router';
import React from 'react';
import { retrieveAllPlacementRequests } from '../../../api/agency_student_request_application_api';
import { getUserAndTokenFromCookies } from '../../../utils/secret';
import { Box, TableSortLabel, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: 'degreeLevel',
      numeric: false,
      disablePadding: false,
      label: 'Degree Level',
    },
    {
      id: 'numberOfVacancy',
      numeric: true,
      disablePadding: false,
      label: 'Number of Vacancy',
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'Created At',
    },
    {
        id: 'Review',
        numeric: false,
        disablePadding: false,
        label: 'Review',
      }
  ];
  
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align="center"
              sortDirection={orderBy === headCell.id ? order : false}
            >
            { headCell.id === "numberOfVacancy" || headCell.id === "createdAt" ? 
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{
                    '&:hover, &.Mui-active, & .MuiTableSortLabel-icon': {
                        color: 'white !important',
                    },
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel> : headCell.label
            }
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

/**
 * @param {Array.<Object>} formList array of agency placement requests
 */
function AgencyPlacements({ token, user, formList }) {
    const router = useRouter()
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('numberOfVacancy');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
    return (
        <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>
            <Grid container justifyContent={"center"} style={{ width: "60%" }}>
                <h2>Placements</h2>
                <TableContainer component={Paper} elevation={3}>
                    <Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
                        <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                />
                        <TableBody>
                            {stableSort(formList, getComparator(order, orderBy))
                                .map((item, index) => (
                                <StyledTableRow
                                    key={index}>
                                    <StyledTableCell align="center">{item.degreeLevel.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell align="center">{item.numberOfVacancy}</StyledTableCell>
                                    <StyledTableCell align="center">{moment(item.createdAt).format('MM/DD/YYYY \xa0 h:mm A')}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={(e) => {
                                            e.preventDefault()

                                            router.push("/placement/" + item.formId)
                                        }}>Review</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default AgencyPlacements;

AgencyPlacements.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);
    var formList = [];
    if ((token && user) && user.id) {
      formList = await retrieveAllPlacementRequests(token, user.id);
    }
    return { token, user, formList };
}