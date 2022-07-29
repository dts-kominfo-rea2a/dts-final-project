import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"
import DefaultButton from "../../components/Buttons/DefaultButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import Field from "../../components/Forms/Field";
import Input from "../../components/Forms/Input";
import { useLoginMutation } from "../../services/miaowbookApiRtk";
import { setToken, setUser } from "../../store/userStore";
import { toast } from "../../utils/tools";
import { transformResponse } from "../../utils/utils";

const Login = () => {
    const { state } = useLocation()
    const [login, isLoading] = useLoginMutation()
    const navigate = useNavigate()
    const dispatcher = useDispatch()

    const formInitialValues = {
        email: state?.email || '',
        password: ''
    }

    const submitHandler = async (values, { setErrors }) => {
        const { status_code, isOk, message, data, errors } = transformResponse(
            await login(values)
        )

        if (isOk) {
            dispatcher(setToken({
                token : data.token
            }))
            navigate('/timeline')
            return;
        }

        if (status_code === 422) {
            return setErrors(errors)
        }
    }
    return (
        <div>
            <img src={Logo} className="w-16 shadow-2xl mb-40" alt="MiaowBook Logo" />
            <div className="mt-8 mx-5">
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={submitHandler}
                >
                    <Form>
                        <div className="w-96 mx-auto grid gap-4">
                            <Field
                                id="email"
                                type="text"
                                label="Username / email"
                                name="email"
                                required />

                            <Field
                                id="password"
                                type="password"
                                label="Password"
                                name="password"
                                required />

                            <div className="flex justify-between items-center">
                                <span className="text-sm">
                                    <Link to="/auth/register">Saya belum memiliki akun</Link>
                                </span>
                                <SecondaryButton type="submit">Login</SecondaryButton>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login