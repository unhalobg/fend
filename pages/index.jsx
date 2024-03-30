import { Button, Avatar, Paper, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { info } from '../utils/info'
import { useRouter } from 'next/router'
import { useAuth } from '../contexts/auth_context'
import { dangerColor, primaryColor, secondaryColor, successColor, lightColor } from '../utils/colors'
import { getUserAndTokenFromCookies } from '../utils/secret'
import { retrieveAllPlacementRequests } from '../api/agency_student_request_application_api'
import moment from 'moment'

//export default function Home({ placements, user, token })
export default function Home() 
{
	const router = useRouter();
	const getUser = useAuth();
	const user = getUser.user;

	const NonAuthHome = () => {
		return <Grid container justifyContent={"center"} style={{ paddingLeft: "5%", paddingRight: "5%" }}>
			<Grid elevation={3} component={Paper} style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2px", paddingBottom: "20px" }}>
				<Typography textAlign={"center"} variant='h5' sx={{ fontWeight: "bold", paddingTop: "2%" }}>
					You must have a subscription to access Smart Placement
				</Typography>
				<Typography textAlign={"start"} sx={{ marginTop: "2%", marginBottom: "15px" }}>
					{info}
				</Typography>
				<Grid container justifyContent="center">
					<Button variant="outlined" onClick={(e) =>
					{
						e.preventDefault();
						router.push("/register")
					}}>
						Get Started
					</Button>
				</Grid>
			</Grid>
		</Grid >
	}


	const AuthHome = () => {
		if (user.role == "student") {
			if (user.status == "new") {
				router.push("/student/application/request")
			} else {
				return (
				<Grid>
						<Grid container justifyContent={"end"}>
							<Grid container justifyContent="center" >
								<Card elevation={3} sx={{ display: 'flex' }}>
									<Grid item>
										<Avatar variant="square" alt={user.email.toUpperCase()} src={user.image ?? "no image"}
											sx={{ width: 200, height: 200, backgroundColor: secondaryColor, color: lightColor, fontSize: "150px", fontWeight: "bold" }}
										/>
									</Grid>
									<CardContent sx={{ width: 400, pt:'5%' }}>
									<Grid container sx={{ m: "5%", flexDirection: 'column' }} >
										<Grid item>
											<Grid container sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
												<Typography noWrap variant='h6'>UTA ID</Typography>
												<Button
													onClick={(e) =>
													{
														e.preventDefault();
														router.push("/student/application/status")
													}}
													sx={{
														":hover": { backgroundColor: secondaryColor, color: 'white' },
														color: secondaryColor,
														fontSize: "20px",
														marginRight:'8%'
													}}>
													{user.id}
												</Button>
											</Grid>
											<Grid container sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
												<Typography noWrap variant='h6'>Placement Status</Typography>
												<Button
													onClick={(e) =>
													{
														e.preventDefault();
														if (user.status == "matched")
														{
															router.push("/student/placement")
														} else
														{
															router.push("/student/application/status")
														}
													}}
													sx={{
														fontSize: "20px",
														marginRight:'8%',
														":hover": { backgroundColor: primaryColor, color: 'white' },
														color:
															user.status == "matched" ? primaryColor :
																user.status == "approved" ? successColor :
																	user.status == "rejected" ? dangerColor : secondaryColor
													}}>
													{user.status.toUpperCase()}
												</Button>
											</Grid>
										</Grid>
									</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				)
			}
		} else if (user.role == "agency") {
			if (user.status == "new") {
				router.push("/agency/application/request")
			} else {
				return (
					<Grid>
						<Grid container justifyContent={"end"}>
							<Grid container justifyContent="center" >
								<Card elevation={3} sx={{ display: 'flex' }}>
									<Grid item>
										<Avatar variant="square" alt={user.email.toUpperCase()} src={user.image ?? "no image"}
											sx={{ width: 200, height: 200, backgroundColor: secondaryColor, color: lightColor, fontSize: "150px", fontWeight: "bold" }}
										/>
									</Grid>
									<CardContent sx={{ width: 400, pt:'5%' }}>
									<Grid container sx={{ m: "5%", flexDirection: 'column' }} >
										<Grid item>
											<Grid container sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
												<Typography noWrap variant='h6'>UTA ID</Typography>
												<Button
														onClick={(e) =>
														{
															e.preventDefault();
															router.push("/agency/application/status")
														}}
														sx={{
															":hover": { backgroundColor: secondaryColor, color: 'white' },
															color: secondaryColor,
															fontSize: "20px",
															marginRight:'8%'
														}}>
														{user.id}
													</Button>
											</Grid>
											<Grid container sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
												<Typography noWrap variant='h6'>Application Status</Typography>
												<Button
													onClick={(e) =>
													{
														e.preventDefault();
														if (user.status == "approved")
														{
															router.push("/agency/placement")
														} else
														{
															router.push("/agency/application/status")
														}
													}}
													sx={{
														fontSize: "20px",
														marginRight:'8%',
														":hover": { backgroundColor: primaryColor, color: 'white' },
														color: user.status == "approved" ? successColor :
															user.status == "rejected" ? dangerColor : secondaryColor
													}}>
													{user.status.toUpperCase()}
												</Button>
											</Grid>
										</Grid>
									</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
						{/* <Grid container justifyContent={"center"} style={{ marginTop: "3%" }}>
							<Grid container justifyContent={"center"} style={{ width: "60%" }}>
								<h3>Active Placements</h3>

								<Table border={true} size='medium' sx={{ tableLayout: "auto" }}>
									<TableHead>
										<TableRow sx={{ border: "1px solid black" }}>
											<TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Degree Level</TableCell>
											<TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Vacancies Left</TableCell>
											<TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Start Date</TableCell>
											<TableCell sx={{ border: "1px solid black", fontSize: "18px" }} align="center">Review</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{placements.filter((item) => item.numberOfVacancy > 0).map((item, index) => (
											<TableRow
												key={index}
												sx={{ border: "1px solid black" }}>
												<TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.degreeLevel == "bsw" ? "Bachelor of Social Work" : item.degreeLevel == "msw" ? "Master of Social Work" : "Any"}</TableCell>
												<TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{item.numberOfVacancy}</TableCell>
												<TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">{moment(item.createdAt).format('MM/DD/YYYY')}</TableCell>
												<TableCell sx={{ border: "1px solid black", fontSize: "16px" }} align="center">
													<Button
														sx={{
															color: primaryColor,
															":hover": { backgroundColor: primaryColor, color: "white" }
														}}
														onClick={(e) =>
														{
															e.preventDefault()
															router.push("/placement/" + item.formId)
														}}>Review</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Grid>
						</Grid> */}
					</Grid>
				)
			}
		} else if (user.role == "fieldInstructor") {
			return (
				<Grid>
						<Grid container justifyContent={"end"}>
							<Grid container justifyContent="center" >
								<Card elevation={3} sx={{ display: 'flex' }}>
									<Grid item>
										<Avatar variant="square" alt={user.email.toUpperCase()} src={user.image ?? "no image"}
											sx={{ width: 200, height: 200, backgroundColor: secondaryColor, color: lightColor, fontSize: "150px", fontWeight: "bold" }}
										/>
									</Grid>
									<CardContent sx={{ width: 400, pt:'10%' }}>
									<Grid container sx={{ justifyContent: 'center' }} >
										<Grid item>
											<Typography sx={{ mt: '10%' }} variant='h6'>Welcome Field Instructor!</Typography>
										</Grid>
									</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
			)
		} else {
			return (
				<Grid>
						<Grid container justifyContent={"end"}>
							<Grid container justifyContent="center" >
								<Card elevation={3} sx={{ display: 'flex' }}>
									<Grid item>
										<Avatar variant="square" alt={user.email.toUpperCase()} src={user.image ?? "no image"}
											sx={{ width: 200, height: 200, backgroundColor: secondaryColor, color: lightColor, fontSize: "150px", fontWeight: "bold" }}
										/>
									</Grid>
									<CardContent sx={{ width: 400, pt:'10%' }}>
									<Grid container sx={{ justifyContent: 'center' }} >
										<Grid item>
											<Typography sx={{ mt: '10%' }} variant='h6'>Welcome Admin!</Typography>
										</Grid>
									</Grid>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Grid>
			)
		}
	}


	return (
		<Grid container justifyContent={"center"} sx={{ marginTop: "20px" }}>
			{!user ? <NonAuthHome /> : <AuthHome />}
		</Grid>
	)
}


// export async function getStaticProps({ req })
// {
// 	const { token, user } = getUserAndTokenFromCookies(req)
// 	var placements = []

// 	if (user && user.accessLevel == 2) {
// 		placements = await retrieveAllPlacementRequests(token)
// 	}

// 	if (user) {
// 		return {
// 			props: { placements, user, token },
// 		}
// 	} else {
// 		return {
// 			props: {}
// 		}
// 	}
// }
