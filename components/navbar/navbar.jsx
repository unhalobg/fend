import React, { useState } from 'react'
import Link from 'next/link';
import { useAuth } from '../../contexts/auth_context'
import { AppBar, Avatar, Box, Button, Divider, Grid, IconButton, Menu, MenuItem, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { activeButtonStyle, inActiveButtonStyle, logoStyle } from './navbar_style';
import { Notifications } from '@mui/icons-material';
import { secondaryColor, primaryColor, lightColor } from '../../utils/colors';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { retrieveNotifications } from '../../api/notifications_api';
import { getUserAndTokenFromCookies } from '../../utils/secret';

/*
Status meaning by user type
 student
 - 'new': created an account but hasn't created an application
 - 'applied': created an application but hasn't been approved
 - 'approved': application approved but hasn't been placed with an agency
 - 'matched': placed with an agency
 agency
 - 'new': created an account but hasn't created an application
 - 'applied': created an application but hasn't been approved
 - 'approved': application approved but hasn't been placed with a student
 - 'matched': placed with a student
 fieldInstructor
 - 'new': created an account but hasn't created an application
 - 'applied': applied to an agency but hasn't been approved by them
 - 'approved': belongs to an agency

(admin status doesn't matter)
*/

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 2,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: primaryColor,
      color: "white"
    },
  }));
function Navbar() {
    const router = useRouter()
    const { user, logout } = useAuth()
	const [notifications, setNotifications] = useState(null)
	
	if (user) {
        const { token, userFromCookies } = getUserAndTokenFromCookies(); 
        retrieveNotifications(token, user.id).then((res) => { setNotifications(res.length) })
    }

    const applicationMenuItems = [
        { title: 'Agency Applications', key: "agency-applications", link: "/admin/agencies" },
        { title: 'Student Applications', key: "student-applications", link: "/admin/students" },
        { title: 'Placement Applications', key: "placement-applications", link: "/admin/placements" },
    ]
    
    const agencyPlacementMenuItems = [
        { title: 'Apply', key: "agency-placement-request", link: "/agency/placement/request" },
        { title: "View All", key: "agency-placements", link: "/agency/placement" }
    ]
    
    const agencyFieldInstructorItems = [
        { title: 'Approve Field Instructor', key: "agency-application-status", link: "/agency/review/instructor" },
        { title: 'Assign Field Instructor To Student', key: "agency-application-status", link: "/agency/assign_instructor" },
    ]

    const navitems = () => {
        if (!user) {
            return [{ title: 'Home', key: "home", link: "/" }]
        } else {
            if (user.role == "student") {
                if (user.status == "new") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Request', key: "student-application-request", link: "/student/application/request/" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "applied") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "student-application-status", link: "/student/application/status" },
                        { title: 'Placement', key: "student-placement", link: "/student/placement" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "approved") {
					return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: "Application Status", key: "student-application-status", link: "/student/application/status" },
						{ title: "Placement Status", key: "student-placement-status", link: "/student/placement" },
						{ title: "Upload Document", key: "student-document-upload", link: "/student/document/upload" },
                        { title: "Learning Contract", key: "student-learning_contract", link: "/student/learning_contract" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
				} else if (user.status == "matched") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: "Application Status", key: "student-application-status", link: "/student/application/status" },
						{ title: "Placement Status", key: "student-placement-status", link: "/student/placement" },
						{ title: "Upload Document", key: "student-document-upload", link: "/student/document/upload" },
                        { title: "Learning Contract", key: "student-learning_contract", link: "/student/learning_contract" },
						{ title: 'View Document Requests', key: "student-document-requests", link: "/student/document/view_requests" },
						{ title: 'Timesheet Log', key: "student-timesheet", link: "/student/timesheet" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                }
            } else if (user.role == "agency") {
                if (user.status == "new") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Request', key: "agency-application-request", link: "/agency/application/request" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "applied") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "agency-application-status", link: "/agency/application/status" },
                        { title: 'Contract', key: "agency-agency_contract", link: "/agency/agency_contract" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "approved") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "agency-application-status", link: "/agency/application/status" },
						{ title: 'Create Placement', key: "agency-placement-request", link: "/agency/placement/request" },
                        { title: 'Contract', key: "agency-agency_contract", link: "/agency/agency_contract" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "matched") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "agency-application-status", link: "/agency/application/status" },
						{ title: "My Placements", key: "agency-placements", link: "/agency/placement" },
						{ title: 'Approve Field Instructor', key: "agency-application-status", link: "/agency/review/instructor" },
						{ title: 'Assign Field Instructor To Student', key: "agency-application-status", link: "/agency/assign_instructor" },
						{ title: "Request Document", key: "request-document", link: "/agency/document/request" },
						{ title: "View Student Documents", key: "agency-view-document", link: "/agency/document/view" },
                        { title: 'Contract', key: "agency-agency_contract", link: "/agency/agency_contract" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                }
            } else if (user.role == "admin") {
                return [
                    { title: 'Home', key: "home", link: "/" },
                ]
            } else if (user.role == "fieldInstructor") {
                if (user.status == "new") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Apply To Agency', key: "instructor-application-request", link: "/instructor/application/request" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "applied") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "instructor-timesheet", link: "/instructor/application/status" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "approved") {
                    return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "instructor-application-status", link: "/instructor/application/status" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
                } else if (user.status == "matched") {
					return [
                        { title: 'Home', key: "home", link: "/" },
                        { title: 'Application Status', key: "instructor-application-status", link: "/instructor/application/status" },
                        { title: 'Approve Student Timesheets', key: "instructor-timesheet", link: "/instructor/timesheet" },
                        { title: 'Help', key: "help-info", link: "/help"},
                    ]
				}
            }
        }
    }

    const authNavItems =
    [
        { title: 'Sign In', key: "login", link: "/login" },
        { title: 'Sign Up', key: "register", link: "/register"},
        { title: 'Forgot Password', key: "forgot_password", link: "/forgot_password" },
        { title: 'Help', key: "help-info", link: "/help" }
    ];


    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [fieldInstAnchorEl, setFieldInstAnchorEl] = useState(null);
    const handleFieldInstMenu = (event) => {
        setFieldInstAnchorEl(event.currentTarget);
    };
    const handleFieldInstClose = () => {
        setFieldInstAnchorEl(null);
    };

    const [profile, setProfile] = useState(null);

    const handleProfileMenu = (event) => {
        setProfile(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfile(null);
    };

    const profileMenuItems = () => {
        if (user.role == "student") {
            if (user.status == "new") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Request Application", key: "student-application-request", link: "/student/application/request" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "applied") {
                return [
                        { title: 'Notifications', key: "notifications", link: "/notifications" },
                        { title: 'Application Status', key: "student-application-status", link: "/student/application/status" },
                        { title: 'Placement Status', key: "student-placement", link: "/student/placement" },
                        { title: "Logout", key: "logout", link: "/login" },
                        { title: "Help", key: "help-info", link: "/help"},
                    ]
            } else if (user.status == "approved") {
				return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "student-application-status", link: "/student/application/status" },
					{ title: "Placement Status", key: "student-placement-status", link: "/student/placement" },
					{ title: "Upload Document", key: "student-document-upload", link: "/student/document/upload" },
                    { title: "Learning Contract", key: "student-learning_contract", link: "/student/learning_contract" },
                    { title: "Logout", key: "logout", link: "/login" },
                ]
			} else if (user.status == "matched") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
					{ title: "Application Status", key: "student-application-status", link: "/student/application/status" },
                    { title: "Placement Status", key: "student-placement-status", link: "/student/placement" },
					{ title: "Upload Document", key: "student-document-upload", link: "/student/document/upload" },
                    { title: "Learning Contract", key: "student-learning_contract", link: "/student/learning_contract" },
					{ title: 'View Document Requests', key: "student-document-requests", link: "/student/document/view_requests" },
					{ title: 'Timesheet Log', key: "student-timesheet", link: "/student/timesheet" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            }
        } else if (user.role == "agency") {
            if (user.status == "new") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Request", key: "agency-application-request", link: "/agency/application/request" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "applied") {
				return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "agency-application-status", link: "/agency/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
			} else if (user.status == "approved") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "agency-application-status", link: "/agency/application/status" },
					{ title: 'Create Placement', key: "agency-placement-request", link: "/agency/placement/request" },
					{ title: "My Placements", key: "agency-placements", link: "/agency/placement" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "matched") {
				return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "agency-application-status", link: "/agency/application/status" },
                    { title: "My Placements", key: "agency-placements", link: "/agency/placement" },
					{ title: 'Approve Field Instructor', key: "agency-application-status", link: "/agency/review/instructor" },
					{ title: 'Assign Field Instructor To Student', key: "agency-application-status", link: "/agency/assign_instructor" },
					{ title: "Request Document", key: "agency-request-document", link: "/agency/document/request" },
					{ title: "View Student Documents", key: "agency-view-document", link: "/agency/document/view" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            }
        } else if (user.role == "fieldInstructor") {
            if (user.status == "new") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Set Agency", key: "instructor-application-request", link: "/instructor/application/request" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "applied") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "instructor-application-status", link: "/instructor/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "approved") {
                return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "instructor-application-status", link: "/instructor/application/status" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
            } else if (user.status == "matched") {
				return [
                    { title: 'Notifications', key: "notifications", link: "/notifications" },
                    { title: "Application Status", key: "instructor-application-status", link: "/instructor/application/status" },
                    { title: 'Approve Student Timesheets', key: "instructor-timesheet", link: "/instructor/timesheet" },
                    { title: "Logout", key: "logout", link: "/login" },
                    { title: "Help", key: "help-info", link: "/help"},
                ]
			}
        } else {
            return [
                { title: 'Notifications', key: "notifications", link: "/notifications" },
                { title: "Placements", key: "placements", link: "/admin/placements" },
                { title: "Logout", key: "logout", link: "/login" },
                { title: "Help", key: "help-info", link: "/help"},
            ]
        }
    }

    return (
        <AppBar position="sticky" component="nav" color="inherit" elevation={0}>
            <Toolbar>
                <Typography
                    key={"typo-logo"}
                    variant="h6"
                    sx={{ display: { xs: user ? 'block' : "none", sm: 'block' } }} >
                    <Button
                        key={"button-logo"}
                        onClick={(e) => {
                            e.preventDefault()
                            router.push("/")
                        }}
                        sx={logoStyle}>SMART PLACEMENT
                    </Button>
                </Typography>

                <Box sx={{ flexGrow: 0.1 }} />

                <Box key="items" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navitems().map((item) => (
                        <Link key={item.key} href={item.link} >
                            <Button
                                key={item.key} sx={router.pathname == item.link ? activeButtonStyle : inActiveButtonStyle}>
                                {item.title}
                            </Button>
                        </Link>
                    ))}
                </Box>

                {user && user.role == "admin" ? <div>
                    <Button onClick={handleMenu}
                        sx={router.pathname.includes(applicationMenuItems[0].link) ||
                            router.pathname.includes(applicationMenuItems[1].link) ||
                            router.pathname.includes(applicationMenuItems[2].link)
                            ? activeButtonStyle : inActiveButtonStyle}>
                        Applications
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {applicationMenuItems.map((item, index) => {
                            return <MenuItem key={item.key} onClick={(e) => {
                                e.preventDefault()
                                handleClose()
                                router.push(item.link)
                            }}>{item.title}</MenuItem>
                        })}
                    </Menu>
                </div> : <></>}

                {user && user.role == "agency" && user.status == "approved" ? <div>
                    <Button onClick={handleMenu}
                        sx={router.pathname.includes(agencyPlacementMenuItems[0].link) ||
                            router.pathname.includes(agencyPlacementMenuItems[1].link) 
                            ? activeButtonStyle : inActiveButtonStyle}>
                        Placements
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {agencyPlacementMenuItems.map((item, index) => {
                            return <MenuItem key={item.key} onClick={(e) => {
                                e.preventDefault()
                                handleClose()
                                router.push(item.link)
                            }}>{item.title}</MenuItem>
                        })}
                    </Menu>
                    <Button onClick={handleFieldInstMenu}
                        sx={router.pathname.includes(agencyFieldInstructorItems[0].link) ||
                            router.pathname.includes(agencyFieldInstructorItems[1].link) 
                            ? activeButtonStyle : inActiveButtonStyle}>
                        Field Instructors
                    </Button>
                    <Menu
                        anchorEl={fieldInstAnchorEl}
                        keepMounted
                        open={Boolean(fieldInstAnchorEl)}
                        onClose={handleFieldInstClose}
                    >
                        {agencyFieldInstructorItems.map((item, index) => {
                            return <MenuItem key={item.key} onClick={(e) => {
                                e.preventDefault()
                                handleFieldInstClose()
                                router.push(item.link)
                            }}>{item.title}</MenuItem>
                        })}
                    </Menu>
                </div> : <></>}

                <Box sx={{ flexGrow: 1 }} />

                <Box key="auth-items">
                    {
                        !user ?
                            authNavItems.map((item) => (
                                <Link key={item.key} href={item.link}>
                                    <Button
                                        key={item.key} sx={router.pathname == item.link ? activeButtonStyle : inActiveButtonStyle}>
                                        {item.title}
                                    </Button>
                                </Link>
                            ))
                            :

                            <div>
                                <IconButton onClick={(e) => {
                                    e.preventDefault()
                                    router.push("/notifications")
                                }} sx={{ mr: "5px" }}>

                                    <StyledBadge badgeContent={notifications}>
                                        <Notifications sx={{ fontSize: "30px", color: primaryColor }} />
                                    </StyledBadge>
                                </IconButton>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleProfileMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.email.toUpperCase()} src={user.image ?? "no image"}
                                            sx={{ backgroundColor: secondaryColor, color: lightColor, fontSize: "25px", fontWeight: "bold" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '0px' }}
                                    anchorEl={profile}
                                    keepMounted
                                    open={Boolean(profile)}
                                    onClose={handleProfileMenuClose}>

                                    <Grid container xs={0} justifyContent={"center"} style={{ padding: "10px 10px" }}>
                                        <Avatar alt={user.email.toUpperCase()} src={user.image ?? "no image"}
                                            sx={{ backgroundColor: secondaryColor, color: lightColor, fontSize: "25px", fontWeight: "bold" }}
                                        />
                                        <a style={{ padding: "0 10px" }}>
                                            {user.email}
                                            <br />
                                            <a style={{ color: primaryColor }}>  {user.role.toUpperCase()}
                                            </a>
                                        </a>
                                    </Grid>
                                    <Divider />
                                    {profileMenuItems().map((item, index) => {
                                        return <MenuItem key={item.key} onClick={(e) => {
                                            e.preventDefault()
                                            handleProfileMenuClose()
                                            if (item.key == "logout") {
                                                logout()
                                                router.push(item.link)
                                            } else {
                                                router.push(item.link)
                                            }
                                        }}>{item.title}</MenuItem>
                                    })}
                                </Menu>
                            </div>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar