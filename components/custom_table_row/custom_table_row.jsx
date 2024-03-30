import { TableCell, TableRow } from '@mui/material'
import React from 'react'

function CustomTableRow({ title, value }) {
    return (
        <TableRow key={""} sx={{
            padding: "10px 18px"
        }} >
            <TableCell component="th" scope="row" sx={{
                fontSize: "16px",
                width: "25%",
                backgroundColor: "#1976d2",
                color: "white"
            }}>{title}
            </TableCell>
            <TableCell align="left" sx={{
                paddingLeft: "10px",
                fontSize: "18px",
            }}>{value}</TableCell>
        </TableRow>
    )
}

export default CustomTableRow