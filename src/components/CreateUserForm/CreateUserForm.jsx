//import CreateUserForm from '.components/CreateUserForm/CreateUserForm';//cut it and paste to the component
import React, {useState,useEffect,Fragment,useRef,memo} from 'react';
import './CreateUserForm.scss';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {v1 as uuid} from "uuid";

const schema = yup.object().shape({
    userId: yup.string().required("UserId is required"),
    firstName: yup.string().required("Provide valid email"),
    lastName: yup.string().required("Provide valid email"),
    email: yup.string().email().required("Provide valid email"),
    status: yup.string().required("INITIATED")
});

const CreateUserForm = ({
    onAddUser,
    setShowCreateUser,
    setOpenModal
}) => {

    // form setup
    const { control, handleSubmit, reset, formState: {errors,isSubmitSuccessful} } = useForm({ 
        defaultValues: {
            
            email: "",
            password: ""
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = userData => {
        onAddUser({
            ...userData,
            id: uuid(),
            createdOn: (new Date()).toString().substr(0,28),
        })
    }

    // reset the form after successfull submit of form data
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ 
                userId:"",
                firstName:"",
                lastName:"",
                email:"",
                status:"",
            });
        };
    }, [isSubmitSuccessful, reset]);

    return <div className='CreateUserFormContainer'>
        <form className="add-user-form form-container" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title">Add User</h1>
            <Stack
            direction="column"
            alignItems="center"
            spacing={2}>
                <Controller
                    name="userId"
                    control={control}
                    defaultValue={""}
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
                    defaultValue={""}
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
                    defaultValue={""}
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
                    defaultValue={""}
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
                    defaultValue={""}
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
                    <Button type="submit" variant="outlined">Submit</Button>
                    <Button onClick={()=>{
                        setShowCreateUser(false)
                        setOpenModal(false)
                    }} type="button" variant="outlined">Cancel</Button>
                </Stack>
            </Stack>
        </form>
    </div>
}

export default CreateUserForm;