import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import ChangableProfilePicture from '../../components/Elements/ChangableProfilePicture';
import Field from '../../components/Forms/Field';
import SelectField from '../../components/Forms/SelectField';
import TextAreaField from '../../components/Forms/TextAreaField';
import { useRegisterAttributesQuery, useUpdateUserProfileMutation } from '../../services/miaowbookApiRtk';
import { selectUser } from '../../store/userStore';
import { toast } from '../../utils/tools';
import { transformResponse } from '../../utils/utils';

const EditProfilePage = () => {
    const { data: registerAttributes, isLoading: registerAttributesLoading } = useRegisterAttributesQuery()
    const me = useSelector(selectUser)
    const formInitialValues = {
        name: me?.name || '',
        email: me?.email || '',
        username: me?.username || '',
        user_type_id: me?.user_type?.id || '',
        bio: me?.bio || ''
    }

    const [updateProfile, { isLoading }] = useUpdateUserProfileMutation()

    const submitHandler = async (values, { setErrors }) => {
        const { status_code, isOk, message, data, errors } = transformResponse(await updateProfile(values))

        if (isOk) {
            toast({ title: message })
            return;
        }

        if (status_code === 422) {
            return setErrors(errors)
        }

    }
    return (

        <div className="pt-4 w-full md:w-10/12 mx-auto flex flex-col md:flex-row gap-4">
            <div className='md:bg-white w-full md:w-2/5 md:border md:border-gray-200 rounded-md p-4'>
                <h1 className='text-2xl'>Profile Picture</h1>

                <div className='w-full h-full'>
                    <div className='flex items-center justify-center h-full'>
                        <ChangableProfilePicture user={me} size="lg" />
                    </div>
                </div>
            </div>
            <div className='md:bg-white w-full md:w-3/5 md:border md:border-gray-200 rounded-md p-4'>
                <h1 className='text-2xl'>Edit Profile</h1>

                <Formik
                    enableReinitialize={true}
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

                                <SelectField
                                    id="user_type_id"
                                    name="user_type_id"
                                    label="Account Type"
                                    options={registerAttributes?.accountTypes || []}
                                />

                                <TextAreaField
                                    id="bio"
                                    name="bio"
                                    label="Biography"
                                />

                                {/* <div className="flex gap-2 w-full flex-wrap  md:flex-nowrap">
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

                                </div> */}



                                <div className="flex justify-between items-center">
                                    <SecondaryButton type="submit">{isLoading ? 'Updating your account...' : 'Update'}</SecondaryButton>
                                </div>
                            </div>
                        </section>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default EditProfilePage