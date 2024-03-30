// @ts-check

import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { createAgencyRequestApplication } from '../../../../api/agency_application_api';
import { notifyAdminAboutAgencyApplication } from '../../../../api/notifications_api';
import ErrorDialog from '../../../../components/error_dialog/error_dialog';
import NotificationToast from '../../../../components/notification_toast/notification_toast';
import { useAuth } from '../../../../contexts/auth_context';
import { getUserAndTokenFromCookies } from '../../../../utils/secret';
import Paper from '@mui/material/Paper';

function AgencyApplicationRequest({ user, token }) {
    const router = useRouter();
    var stateList = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
    ];

    var agencyTypeList = [
        "Addictions",
        "Adoptions",
        "Aged Care",
        "Alcohol & amp; Drug",
        "Athletics",
        "Carers",
        "Child Intervention",
        "Children",
        "Chiropractic Office",
        "Coaching",
        "Community",
        "Correctional",
        "Counselling",
        "Court",
        "Crisis Support",
        "Disability",
        "Domestic Violence",
        "Education",
        "Employment",
        "Ethnic",
        "Family",
        "Fitness Center",
        "Grief",
        "Health",
        "Homeless",
        "Housing",
        "Indigenous",
        "International",
        "Law",
        "Mediation",
        "Mental Health",
        "Occupational Therapy",
        "Offenders",
        "Other",
        "P - 12",
        "Palliative Care",
        "Personal Training",
        "Physical Therapy",
        "Policy",
        "Primary School",
        "Private",
        "Prosthetics and Orthotics",
        "Public",
        "Recreation Center - Collegiate",
        "Refugee",
        "Rehabilitation",
        "Research Lab",
        "Secondary School",
        "Sexual Assault",
        "Shadowing PA",
        "Shadowing Physician",
        "Social Action",
        "Special Population",
        "Strength and Conditioning",
        "TAFE",
        "Veterans",
        "Violence",
        "Welfare",
        "Wellness",
        "Women",
        "Womens Advocacy",
        "Youth",
    ];

    var titleList = [
        "Associate Professor",
        "Dr",
        "Father",
        "Miss",
        "Mr",
        "Mrs",
        "Ms",
        "Professor",
        "Reverend",
    ];

    const [formValue, setFormValue] = useState({
        agencyId: user?.id,
        ein: "",
        name: "",
        type: "",
        email: user?.email,
        phone: "",
        fax: "",
        website: "",
        businessAddress: {
            street: "",
            unit: "",
            city: "",
            state: "",
            zipcode: "",
            country: "United States",
        },
        mailingAddress: {
            street: "",
            unit: "",
            city: "",
            state: "",
            zipcode: "",
            country: "United States",
        },
        prefferedContacts: [
            { title: "Email", checked: false },
            { title: "Fax", checked: false },
            { title: "Phone", checked: false },
            { title: "SMS", checked: false },
        ],
        agentTitle: "",
        agentFirstName: "",
        agentMiddleName: "",
        agentLastName: "",
        agentPhone: "",
        agentEmail: "",
    });
    const { updateUser } = useAuth();


    const onChange = (e) => {
        e.preventDefault();
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();
        const s1 = await createAgencyRequestApplication(token, formValue);
        const s2 = await notifyAdminAboutAgencyApplication(token, formValue);
        if (s1 && s2) {
            setSuccessMessage('Successfully submitted application');
            setTimeout(() => {
                updateUser(user.email);
                router.push('/agency/application/status');
            }, 500);
        } else {
            setErrorMessage('Could not connect to the databse');
        }
    }

    if (user && token) {
        return (

            <Grid container justifyContent={"center"} style={{ marginTop: "20px" }}>
                <NotificationToast message={successMessage} onClose={() => { setSuccessMessage(null) }} />
                <ErrorDialog errorMessage={errorMessage} onClose={() => setErrorMessage(null)} errorTitle={"Error Occured"} />
    
                <form onSubmit={onSubmit}>
                    <h2 style={{ textAlign: "center", marginLeft: "40px", marginRight: "40px" }}> Agency Application Request Form</h2>
                    <div style={{ padding: "0px 200px" }} />
                    <Grid elevation={3} component={Paper} style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "2px", paddingBottom: "20px" }}>
                        <div>
                            <h4 style={{ textAlign: "start", marginTop: "40px" }}> Agency Information</h4>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    label="Agency ID"
                                    fullWidth
                                    value={formValue.agencyId}
                                    name="agencyId"
                                    onChange={onChange}
                                    required
                                    disabled
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    label="EIN"
                                    fullWidth
                                    value={formValue.ein}
                                    name="ein"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Agency Name"
                                    fullWidth
                                    value={formValue.name}
                                    name="name"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
    
                            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                <InputLabel>Agency Type *</InputLabel>
                                <Select
                                    required
                                    name="type"
                                    label="Agency Type *"
                                    value={formValue.type}
                                    onChange={onChange}>
                                    {agencyTypeList.map((item, index) => {
                                        return <MenuItem key={index} value={item}> {item} </MenuItem>
    
                                    })}
                                </Select>
                            </FormControl>
    
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="email"
                                    label="Agency Email"
                                    fullWidth
                                    value={formValue.email}
                                    name="email"
                                    onChange={onChange}
                                    required
                                    disabled
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="tel"
                                    label="Agency Phone"
                                    fullWidth
                                    value={formValue.phone}
                                    name="phone"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="tel"
                                    label="Agency Fax"
                                    fullWidth
                                    value={formValue.fax}
                                    name="fax"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Agency Website"
                                    fullWidth
                                    value={formValue.website}
                                    name="website"
                                    onChange={onChange}
                                    required
                                />
                            </Grid>
    
                            <div>
                                <h4 style={{ textAlign: "start", marginTop: "40px" }}> Business Address </h4>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Street"
                                        fullWidth
                                        value={formValue.businessAddress.street}
                                        name="businessAddressStreet"
                                        required
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                businessAddress: { ...formValue.businessAddress, street: e.target.value }
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Unit"
                                        fullWidth
                                        value={formValue.businessAddress.unit}
                                        name="businessAddressUnit"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                businessAddress: { ...formValue.businessAddress, unit: e.target.value }
                                            })
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="City"
                                        fullWidth
                                        value={formValue.businessAddress.city}
                                        name="businessAddressCity"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                businessAddress: { ...formValue.businessAddress, city: e.target.value }
                                            })
                                        }}
                                        required
                                    />
                                </Grid>
                                <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                    <InputLabel>State *</InputLabel>
                                    <Select
                                        required
                                        name="businessAddressState"
                                        label="State *"
                                        value={formValue.businessAddress.state}
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({ ...formValue, businessAddress: { ...formValue.businessAddress, state: e.target.value } })
                                        }}>
                                        {stateList.map((item, index) => {
                                            return <MenuItem key={index} value={item}> {item} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Zip Code"
                                        fullWidth
                                        value={formValue.businessAddress.zipcode}
                                        name="businessAddressZipCode"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                businessAddress: { ...formValue.businessAddress, zipcode: e.target.value }
                                            })
                                        }}
                                        required
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        required
                                        type="text"
                                        label="Country"
                                        fullWidth
                                        value={formValue.businessAddress.country}
                                        name="businessAddressStreet"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                businessAddress: { ...formValue.businessAddress, country: e.target.value }
                                            })
                                        }}
                                    />
                                </Grid>
                            </div>
    
                            <div>
                                <h4 style={{ textAlign: "start", marginTop: "40px" }}> Mailing Address </h4>
                                <FormControlLabel
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: formValue.businessAddress,
                                            });
    
                                        } else {
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: {
                                                    street: "",
                                                    unit: "",
                                                    city: "",
                                                    state: "",
                                                    zipcode: "",
                                                    country: "",
                                                },
                                            });
                                        }
                                    }}
                                    control={<Checkbox key={"sameAddress"} />}
                                    label="Same as Business Address"
                                    labelPlacement="end"
                                />
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Street"
                                        fullWidth
                                        value={formValue.mailingAddress.street}
                                        name="mailingAddressStreet"
                                        required
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: { ...formValue.mailingAddress, street: e.target.value }
                                            });
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Unit"
                                        fullWidth
                                        value={formValue.mailingAddress.unit}
                                        name="mailingAddressUnit"
                                        onChange={(e) => {
                                            e.preventDefault()
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: { ...formValue.mailingAddress, unit: e.target.value }
                                            });
                                        }}
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="City"
                                        fullWidth
                                        value={formValue.mailingAddress.city}
                                        name="mailingAddressCity"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: { ...formValue.mailingAddress, city: e.target.value }
                                            });
                                        }}
                                        required
                                    />
                                </Grid>
                                <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                    <InputLabel>State *</InputLabel>
                                    <Select
                                        required
                                        name="mailingAddressState"
                                        label="State *"
                                        value={formValue.mailingAddress.state}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFormValue({ ...formValue, mailingAddress: { ...formValue.mailingAddress, state: e.target.value } });
                                        }}>
                                        {stateList.map((item, index) => {
                                            return <MenuItem key={index} value={item}> {item} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        type="text"
                                        label="Zip Code"
                                        fullWidth
                                        value={formValue.mailingAddress.zipcode}
                                        name="mailingAddressZipCode"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: { ...formValue.mailingAddress, zipcode: e.target.value }
                                            });
                                        }}
                                        required
                                    />
                                </Grid>
                                <Grid item style={{ marginBottom: "20px" }}>
                                    <TextField
                                        required
                                        type="text"
                                        label="Country"
                                        fullWidth
                                        value={formValue.mailingAddress.country}
                                        name="mailingAddressStreet"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFormValue({
                                                ...formValue,
                                                mailingAddress: { ...formValue.mailingAddress, country: e.target.value }
                                            });
                                        }}
                                    />
                                </Grid>
                            </div>
    
                            <h4 style={{ textAlign: "start", marginTop: "40px" }}> Preferred Contacts </h4>
    
                            {formValue.prefferedContacts.map((item, index) => {
                                return <FormControlLabel
                                    key={index}
                                    value={item.checked}
                                    onChange={(e) => {
                                        item.checked = e.target.checked;
                                        console.log(formValue.prefferedContacts);
                                    }}
                                    control={<Checkbox key={index} />}
                                    label={item.title}
                                    labelPlacement="end"
                                />
                            })}
    
    
    
                        </div>
                        <div>
                            <h4 style={{ textAlign: "start", marginTop: "40px" }}> Agent Information</h4>
    
                            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                                <InputLabel>Title</InputLabel>
                                <Select
                                    name="agentTitle"
                                    label="Title"
                                    value={formValue.agentTitle}
                                    required
                                    onChange={onChange}>
                                    {titleList.map((item, index) => {
                                        return <MenuItem key={index} value={item}> {item} </MenuItem>
    
                                    })}
                                </Select>
                            </FormControl>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="First Name"
                                    fullWidth
                                    value={formValue.agentFirstName}
                                    name="agentFirstName"
                                    required
                                    onChange={onChange}
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Middle Name"
                                    fullWidth
                                    value={formValue.agentMiddleName}
                                    name="agentMiddleName"
                                    onChange={onChange}
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="text"
                                    label="Last Name"
                                    fullWidth
                                    value={formValue.agentLastName}
                                    name="agentLastName"
                                    required
                                    onChange={onChange}
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="tel"
                                    label="Phone"
                                    fullWidth
                                    value={formValue.agentPhone}
                                    name="agentPhone"
                                    onChange={onChange}
                                />
                            </Grid>
    
                            <Grid item style={{ marginBottom: "20px" }}>
                                <TextField
                                    type="email"
                                    label="Email"
                                    fullWidth
                                    value={formValue.agentEmail}
                                    name="agentEmail"
                                    required
                                    onChange={onChange}
                                />
                            </Grid>
                        </div>
                    </Grid>
    
                    <Grid item style={{ margin: "30px 0px" }}>
                        <Button
                            type="submit"
                            variant='contained'
                            fullWidth> Submit
                        </Button>
                    </Grid>
                </form>
            </Grid>
        )
    } else {
        return (
            <>
                <h1>Must be logged in to view this page</h1>
            </>
        )
    }
    
}

export default AgencyApplicationRequest;


AgencyApplicationRequest.getInitialProps = async ({ req }) => {
    const { token, user } = getUserAndTokenFromCookies(req);

    return { user, token };
}