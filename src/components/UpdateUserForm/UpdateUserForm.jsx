//import UpdateUserForm from '.components/UpdateUserForm/UpdateUserForm';//cut it and paste to the component
import React, {useState,useEffect,Fragment,useRef,memo} from 'react';
import './UpdateUserForm.scss';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const schema = yup.object().shape({
    userId: yup.string().required("UserId is required"),
    firstName: yup.string().required("Provide valid email"),
    lastName: yup.string().required("Provide valid email"),
    email: yup.string().email().required("Provide valid email"),
    status: yup.string().required("INITIATED")
});

const UpdateUserForm = ({
    userData,
    onUpdateUser,
    setShowUpdateUser,
    setOpenModal
}) => {
    // form setup
    const { control, handleSubmit, reset, formState: {errors,isSubmitSuccessful} } = useForm({ 
        defaultValues: {
            userId: userData.userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            status: userData.status,
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = updatedUserData => {
        onUpdateUser({
            ...updatedUserData,
            id: userData.id,
            createdOn: userData.createdOn
        })
    }

    // // reset the form after successfull submit of form data
    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset({ 
    //             userId:"",
    //             firstName:"",
    //             lastName:"",
    //             email:"",
    //             status:"",
    //         });
    //     };
    // }, [isSubmitSuccessful, reset]);

    return <div className='UpdateUserFormContainer'>
        <form className="update-user-form form-container" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">Update User</h1>
            <Stack
            direction="column"
            alignItems="center"
            spacing={2}>

                <Controller
                    name="userId"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        className="textArea"
                        label="User Id"
                        variant="outlined"
                        placeholder={"userId"}
                        error={!!errors.userId}
                        type="userId"
                        sx={{ width: '100%' }}
                        helperText={errors?.userId ? errors?.userId?.message : ''}
                    />
                }/>

                <Controller
                    name="firstName"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        className="textArea"
                        label="First Name"
                        variant="outlined"
                        placeholder={"firstName"}
                        error={!!errors.firstName}
                        type="firstName"
                        sx={{ width: '100%' }}
                        helperText={errors?.firstName ? errors?.firstName?.message : ''}
                    />
                }/>

                <Controller
                    name="lastName"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        className="textArea"
                        label="Last Name"
                        variant="outlined"
                        placeholder={"lastName"}
                        error={!!errors.lastName}
                        type="lastName"
                        sx={{ width: '100%' }}
                        helperText={errors?.lastName ? errors?.lastName?.message : ''}
                    />
                }/>

                <Controller
                    name="email"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        className="textArea"
                        label="Email"
                        variant="outlined"
                        placeholder={"email"}
                        error={!!errors.email}
                        type="email"
                        sx={{ width: '100%' }}
                        helperText={errors?.email ? errors?.email?.message : ''}
                    />
                }/>

                <Controller
                    name="status"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        className="textArea"
                        label="Status"
                        variant="outlined"
                        placeholder={"status"}
                        error={!!errors.status}
                        type="status"
                        sx={{ width: '100%' }}
                        helperText={errors?.status ? errors?.status?.message : ''}
                    />
                }/>
                <Stack
                spacing={1}
                direction="row"
                justifyContent="flex-end">
                    <Button type="submit" variant="outlined">Update</Button>
                    <Button onClick={()=>{
                        setShowUpdateUser(false)
                        setOpenModal(false)
                    }} type="button" variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </form>
    </div>
}

export default UpdateUserForm;