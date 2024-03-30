import Link from 'next/link';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import { help_admin, help_field_instructor, help_student, help_agency, help_general} from '../utils/help_info'
import { AppBar, Avatar, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

function helpPage()
{
    const router = useRouter();

    return (
        <Grid container justifyContent={"center"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
			<Grid elevation={3} component={Paper} style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2px", paddingBottom: "20px" }}>
				<Typography textAlign={"center"} variant='h5' sx={{ fontWeight: "bold", paddingTop: "2%" }}>
					Help Page
				</Typography>
				<Typography textAlign={"left"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					GENERAL: {help_general}
				</Typography>
				<Typography textAlign={"left"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					STUDENTS: {help_student}
				</Typography>
                <Typography textAlign={"left"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					ADMIN: {help_admin}
				</Typography>
                <Typography textAlign={"left"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					AGENCY: {help_agency}
				</Typography>
                <Typography textAlign={"left"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					FIELD INSTRUCTOR: {help_field_instructor}
				</Typography>
			</Grid>
        </Grid>
    )
}

export default helpPage;