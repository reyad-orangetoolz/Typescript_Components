import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Stack, FormControl, FormHelperText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../state/store";
import { attemptLogin, attemptLoginClearState } from "../../state/actions/user/userSlice";
import { Controller, useForm } from 'react-hook-form';
import LoadingButton from '../../assets/global/button/loadingButton/LoadingButton';
import { selectUser } from '../../state/actions/user/userSelector';
import { useNavigate } from 'react-router-dom';
import RoutLink from '../../helpers/constants/routeLinks';
import { log } from 'console';
import { CoreConstant } from '../../helpers/constants/coreConstant';

const Login = () => {
    const navigete = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isLogin } = useSelector(selectUser);


    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    const onSubmit = async (data: any) => {
        dispatch(attemptLogin(data));
    }

    useEffect(() => {
        if (isLogin) {
            console.log(CoreConstant.RESPONSE_STATUS_SUCCESS);
            dispatch(attemptLoginClearState());
            reset();
            navigete(RoutLink.dashboard.to);
        }
        else {
            console.log(CoreConstant.RESPONSE_STATUS_FAILED);
        }
    }, [isLogin]);

    return (
        <>
            <Stack
                justifyContent={'center'}
                textAlign={'center'}
                mx={'auto'}
                sx={{
                    height: "100vh",
                    width: '80%',
                    '@media (min-width: 600px)': {
                        width: '50%', // Adjust the width for screens wider than 600px
                    },
                    '@media (min-width: 960px)': {
                        width: '20%', // Adjust the width for screens wider than 960px
                    },
                }}
            >
                <Box component={'form'} autoComplete='off' onSubmit={handleSubmit(onSubmit)} noValidate >
                    <Box component={'span'}>
                        <img src="https://orangetoolz.com/wp-content/uploads/2018/10/logo.png" alt="OrangeToolz" style={{ width: "50%" }} />
                        <Controller
                            control={control}
                            name='username'
                            defaultValue=''
                            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                                <FormControl size="small" sx={{ mb: 2 }} fullWidth error={!!(invalid && error?.message)}>
                                    <TextField
                                        type='text'
                                        id='username'
                                        label='Username'
                                        variant='outlined'
                                        value={value}
                                        onChange={onChange}
                                        color='warning'
                                        sx={{
                                            width: "100%",
                                            margin: "5px"
                                        }}
                                        error={!!(invalid && error?.message)}
                                    />
                                    <FormHelperText>{invalid && error?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
                                <FormControl size="small" sx={{ mb: 2 }} fullWidth error={!!(invalid && error?.message)}>
                                    <TextField
                                        type='password'
                                        id='password'
                                        label='Password'
                                        value={value}
                                        onChange={onChange}
                                        variant='outlined'
                                        color='warning'
                                        sx={{
                                            width: "100%",
                                            margin: "5px"
                                        }}
                                        error={!!(invalid && error?.message)}
                                    />
                                    <FormHelperText>{invalid && error?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        <LoadingButton
                            isLoading={isLoading}
                            loadingText={'Login...'}
                            variant={'contained'}
                            type={'submit'}
                            sx={{
                                backgroundColor: "orangered",           
                                margin: "5px",
                                width: "100%"
                            }}
                        >
                            
                            Login
                        </LoadingButton>
                    </Box>
                </Box>
            </Stack >
        </>
    )
}

export default Login;
