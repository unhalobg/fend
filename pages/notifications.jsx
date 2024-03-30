import React from 'react'
import { getUserAndTokenFromCookies } from '../utils/secret'
import { retrieveNotifications, deleteNotification } from "../api/notifications_api"
import { Button, Grid, Card, CardActionArea, Typography } from '@mui/material'
import { Container } from '@mui/system'
import moment from 'moment'
import ErrorDialog from '../components/error_dialog/error_dialog'
import { useRouter } from 'next/router'
import ClearIcon from '@mui/icons-material/Clear';

function Notifications({ notifications, user, token, error }) {
    const router = useRouter()
    return (
        <Container>
            <ErrorDialog errorTitle={"Error"} errorMessage={error} onClose={() => { }} />
            <h3>Notifications</h3>
            <div>{notifications.length === 0 ? <Typography>You don't have any notifications at the moment.</Typography> : notifications.map((item, index) => {
                return <Card elevation={3} sx={{ mb: '1%', display: 'flex', alignItems: 'center' }} key={index}>
                    <CardActionArea onClick={(e) => {
                                e.preventDefault()
                                if (item.type == "agency_application" && user.role === "agency") {
                                    router.push("/agency/application/status")
                                } else if (item.type == "agency_student_request_application" && user.role === "agency") {
                                    router.push("/placement/" + item.formId)
                                } else if (item.type == "student_application" && user.role === "student") {
                                    router.push("/student/application/status")
                                } else if (item.type == "agency_student_request_application" && user.role === "student") {
                                    router.push("/student/placement")
                                } else if (item.type == "student_application" && user.role === "admin") {
                                    router.push("/admin/review/student/" + item.formId)
                                } else if (item.type == "agency_application" && user.role === "admin") {
                                    router.push("/admin/review/agency/" + item.formId)
                                }
                            }}>
                    <Grid container sx={{ padding:'1%'}}>
                        <Grid item xs={11} md={11}>
                            <p style={{
                                fontSize: "15px",
                            }}>{item.message}</p>
                            <p style={{
                                fontSize: "12px",
                                color: "GrayText",
                            }}
                            >{moment(item.createdAt).format('MM/DD/YYYY hh:mm A')}</p>
                        </Grid>
                    </Grid>
                    </CardActionArea>
                    <Button sx={{ color: "GrayText" }} onClick={() => { deleteNotification(token, item.id).then(router.push("/notifications")) }}>
                        <ClearIcon fontSize="large" />
                    </Button>
                </Card>
            })}</div>
        </Container>
    )
}

export default Notifications

Notifications.getInitialProps = async ({ req }) => {
    try {
        const { token, user } = getUserAndTokenFromCookies(req)
        if (user.accessLevel == 3) {
            const response = await retrieveNotifications(token, 1111111111)
            return { notifications: response, user: user, token: token }
        } else {
            const response = await retrieveNotifications(token, user.id)
            return { notifications: response, user: user, token: token }
        }
    } catch (error) {
        return { notifications: [], user: null, token: null, error: error.message }
    }

}