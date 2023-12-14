import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CreateNewUser, UpdateSelectedUser } from '../../Redux/ActionCreator'
import { Country, State, City } from 'country-state-city';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const CreateUser = () => {
    const [userFormValues, setUserFormValues] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        addressOne: "",
        addressTwo: "",
        zipCode: "",
    })
    const [searchParams, setSearchParams] = useSearchParams();
    const isEdit = searchParams.get('isEdit')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const editObj = useSelector((state) => state.users.singleUserObj)
    // console.log(editObj);
    
    let countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
  
    // console.log(countryData);
    useEffect(() => {
        setStateData(State.getStatesOfCountry(country));
    }, [country]);

    useEffect(() => {
        setCityData(City.getCitiesOfState(country, state));
    }, [state]);

    useEffect(() => {
        stateData && setState(stateData[0]);
    }, [stateData]);

    useEffect(() => {
        cityData && setCity(cityData[0]);
    }, [cityData]);

    useEffect(() => {
        // console.log(editObj);
        if (Object.keys(editObj).length > 0 && isEdit) {
            setUserFormValues({
                id: editObj.id,
                firstName: editObj.firstName,
                lastName: editObj.lastName,
                email: editObj.email,
                mobile: editObj.mobile,
                addressOne: editObj.addressOne,
                addressTwo: editObj.addressTwo,
                zipCode: editObj.zipCode,
            })
            setCountry(editObj.country)
            setState(editObj.state)
            setCity(editObj.city)
        } else {
            clearState()
        }

    }, [stateData, editObj])

    const handleChange = (event) => {
        // console.log(event);
        const { name, value } = event.target
        setUserFormValues({ ...userFormValues, [name]:value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const _obj = {
            id: userFormValues.id,
            firstName: userFormValues.firstName,
            lastName: userFormValues.lastName,
            email: userFormValues.email,
            mobile: userFormValues.mobile,
            addressOne: userFormValues.addressOne,
            addressTwo: userFormValues.addressTwo,
            zipCode: userFormValues.zipCode,
            country,
            state,
            city
        }
        // console.log(_obj);

        if (isEdit) {
            dispatch(UpdateSelectedUser(_obj))
        } else {
            dispatch(CreateNewUser(_obj))
        }
        navigate("/")
    }

    const clearState = () => {
        setUserFormValues({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            addressOne: "",
            addressTwo: "",
            zipCode: "",
        })
    }

    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


    return (
        <div className='create_user'>
            <Grid container spacing={0} direction='column' alignItems='center'>

                <Paper sx={{ width: 500, marginTop: 10 }}>
                    <Typography
                        className='form_note'
                        variant="p"
                        component="div"
                    >
                        Note : Some country & state don't have data
                    </Typography>
                    <Typography
                        className='form_head'
                        variant="h5"
                        component="div"
                        sx={{ textAlign: 'center', margin: 2 }}
                    >
                        Assignment Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} margin={2}>
                            <FormControl>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    size='small'
                                    label="Country"
                                    value={country || ""}
                                    onChange={(e) => setCountry(e.target.value)}
                                    disabled={isEdit}
                                >
                                    {
                                        countryData?.map((option, index) => {
                                            return <MenuItem key={index} value={option.isoCode}>{option.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel>State</InputLabel>
                                <Select
                                    size='small'
                                    label="State"
                                    value={state || ""}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    {
                                        stateData?.map((option, index) => {
                                            return <MenuItem key={index} value={option.isoCode}>{option.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel>City</InputLabel>
                                <Select
                                    size='small'
                                    label="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    {
                                        cityData?.map((option, index) => {
                                            return <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                            <Stack direction='row' spacing={2}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    label='First Name'
                                    required
                                    error={
                                        userFormValues.firstName.length === 0 || userFormValues.firstName.length < 5
                                    }
                                    helperText={
                                        userFormValues.firstName.length === 0 ? "Please enter first name" : userFormValues.firstName.length < 5 ? "first name length minimum 5 char" : ""
                                    }
                                    name='firstName'
                                    value={userFormValues.firstName}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    label='Last Name'
                                    required
                                    error={
                                        userFormValues.lastName.length === 0 || userFormValues.lastName.length < 5
                                    }
                                    helperText={
                                        userFormValues.lastName.length === 0 ? "Please enter last name" : userFormValues.lastName.length < 5 ? "last name length minimum 5 char" : ""
                                    }
                                    name='lastName'
                                    value={userFormValues.lastName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Stack>

                            <TextField
                                size='small'
                                variant='outlined'
                                label='Email'
                                error={
                                    userFormValues.email.length === 0 || !regex.test(userFormValues.email)
                                }
                                helperText={
                                    userFormValues.email.length === 0 ? "Please enter email" :
                                        !regex.test(userFormValues.email) ? "Please enter valid email" : ""
                                }
                                name='email'
                                value={userFormValues.email}
                                onChange={(e) => handleChange(e)}
                            />

                            <Stack direction='row' spacing={2}>
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    label='Mobile'
                                    name='mobile'
                                    required
                                    maxLength={5}
                                    error={
                                        userFormValues.mobile.length === 0 || userFormValues.mobile.length < 10
                                    }
                                    helperText={
                                        userFormValues.mobile.length === 0 ? "Please enter phone number"
                                            : userFormValues.mobile.length < 10 ? "Phone number should be 10 number" : ""
                                    }
                                    value={userFormValues.mobile}
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                    }}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    label='Zip Code'
                                    required
                                    error={
                                        userFormValues.zipCode.length === 0 || userFormValues.zipCode.length < 4
                                    }
                                    helperText={
                                        userFormValues.zipCode.length === 0 ? "Please enter zip code"
                                            : userFormValues.zipCode.length < 4 ? "zip code minimum 4 number" : ""
                                    }
                                    name='zipCode'
                                    value={userFormValues.zipCode}
                                    onChange={(e) => handleChange(e)}
                                />

                            </Stack>
                            <Stack direction='row' spacing={2}>
                                <TextField
                                    className='address'
                                    size='small'
                                    variant='outlined'
                                    multiline maxRows={2} minRows={2}
                                    label='Address One'
                                    error={
                                        userFormValues.addressOne.length === 0
                                    }
                                    helperText={
                                        userFormValues.addressOne.length === 0 && "Please enter address"
                                    }
                                    name='addressOne'
                                    value={userFormValues.addressOne}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    className='address'
                                    size='small'
                                    variant='outlined'
                                    multiline maxRows={2} minRows={2}
                                    label='Address Two'
                                    name='addressTwo'
                                    value={userFormValues.addressTwo}
                                    onChange={(e) => handleChange(e)}
                                />
                            </Stack>

                            <Button type='submit' variant='contained' className='subBtn'
                            >Submit</Button>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}


export default CreateUser
