import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Logo from "../../assets/logo.svg"
import DefaultButton from "../../components/Buttons/DefaultButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import Field from "../../components/Forms/Field";
import SelectField from "../../components/Forms/SelectField";
import { useRegisterAttributesQuery, useRegisterMutation } from "../../services/miaowbookApiRtk";
import { transformResponse } from "../../utils/utils";
import { toast } from "../../utils/tools";

const Register = () => {
    const { data: registerAttributes, isLoading: registerAttributesLoading } = useRegisterAttributesQuery()

    const [register, isLoading] = useRegisterMutation()

    const navigate = useNavigate()

    const formInitialValues = {
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        user_type_id: ''
    }

    const submitHandler = async (values, { setErrors }) => {
        const { status_code, isOk, message, data, errors } = transformResponse(await register(values))

        if (isOk) {
            toast({ title: message })
            // .then(() => {
            navigate('/auth/login', {
                state: {
                    email: values.email
                }
            })
            // })
            return;
        }

        if (status_code === 422) {
            return setErrors(errors)
        }


    }

    // useEffect
    return (
        <div>
            <img src={Logo} className="w-16 shadow-2xl mb-10" alt="MiaowBook Logo" />
            <h1 className="text-2xl mb-10">Create <br /><span className="font-bold text-5xl">MiaowBook</span><br /> account.</h1>
            <div className="mt-4 mx-5">
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={submitHandler}
                >
                    <Form>
                        <section disabled={isLoading}>
                            <div className="w-full mx-auto grid gap-4">
                                <div className="flex gap-2 w-full flex-wrap md:flex-nowrap">

                                    <Field
                                        className='w-full md:w-1/2'
                                        id="nama"
                                        type="text"
                                        label="Nama"
                                        name="name"
                                        required />


                                    <Field
                                        className='w-full md:w-1/2'
                                        id="username"
                                        type="text"
                                        label="Username"
                                        name="username"
                                        required />

                                </div>

                                <Field
                                    className='w-full'
                                    id="email"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    required />

                                <SelectField
                                    id="user_type_id"
                                    name="user_type_id"
                                    label="Account Type"
                                    options={registerAttributes?.accountTypes || []}
                                />

                                <div className="flex gap-2 w-full flex-wrap  md:flex-nowrap">
                                    <Field
                                        className='w-full md:w-1/2'
                                        id="password"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        required />

                                    <Field
                                        className='w-full md:w-1/2'
                                        id="password_confirmation"
                                        type="password"
                                        label="Password Confirmation"
                                        name="password_confirmation"
                                        required />

                                </div>



                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        <Link to="/auth/login">Saya sudah memiliki akun</Link>
                                    </span>
                                    <SecondaryButton type="submit">{!isLoading ? 'Creating your account...' : 'Register'}</SecondaryButton>
                                </div>
                            </div>
                        </section>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register