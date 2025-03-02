import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup';
import Feather from '@expo/vector-icons/Feather';
import styles from './EditUserForm.styles'

function EditUserForm() {
    const { user } = useSelector((state: RootState) => state.user);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigateToCamera = () => {
        router.replace("/camera")
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        first_name: Yup.string()
            .required("First name is required"),
        last_name: Yup.string()
            .required("Last name is required"),
        profile_image: Yup.string()
            .url("Profile image must be a valid URL")
            .nullable(), // Optional field
        profile_cover: Yup.string()
            .url("Profile cover must be a valid URL")
            .nullable(), // Optional field
        bio: Yup.string()
            .max(500, "Bio must be less than 500 characters")
            .nullable(), // Optional field
        website: Yup.string()
            .url("Website must be a valid URL")
            .nullable(), // Optional field
        phone_number: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .nullable(), // Optional field
        is_private: Yup.boolean()
            .required("Privacy setting is required"),
    });

    const initialValues = {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image || "@/assets/images/profile-image-placeholder.png",
        profile_cover: user.profile_cover || "@/assets/images/profile-image-pladefault-profile-background.png",
        bio: user.bio,
        website: user.website,
        phone_number: user.phone_number,
        is_private: user.is_private,
    }

    return (
        <View style={styles.EditUserForm}>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <Image
                            style={styles.EditProfileCoverImage}
                            source={user?.cover_image ? { uri: user.cover_image } : require('@/assets/images/default-profile-background.jpg')}
                        />
                        <TouchableOpacity style={styles.UpdateCoverImage} onPress={() => navigateToCamera()}>
                            <Feather name="camera" size={18} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: "auto", bottom: 75 }}>
                        <Image
                            style={styles.UserImage}
                            source={user?.profile_image ? { uri: user?.profile_image } : require('@/assets/images/profile-image-placeholder.png')}
                        />
                        <TouchableOpacity style={styles.UpdateCoverImage}>
                            <Feather name="camera" size={18} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, bottom: 10 }}>Edit user picture.</Text>
                    </View>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false); // Reset submitting state
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                            <View style={{ bottom: 50 }}>
                                <Text style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>User Info:</Text>
                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Username:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                    />
                                </View>
                                {touched.username && errors.username && (
                                    <Text style={styles.Error}>{String(errors.username)}</Text>
                                )}


                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Email:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text style={styles.Error}>{String(errors.email)}</Text>
                                )}

                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>First Name:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.first_name}
                                        onChangeText={handleChange('first_name')}
                                        onBlur={handleBlur('first_name')}
                                        value={values.first_name}
                                    />
                                </View>
                                {touched.first_name && errors.first_name && (
                                    <Text style={styles.Error}>{String(errors.first_name)}</Text>
                                )}

                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Last Name:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.last_name}
                                        onChangeText={handleChange('last_name')}
                                        onBlur={handleBlur('last_name')}
                                        value={values.last_name}
                                    />
                                </View>
                                {touched.last_name && errors.last_name && (
                                    <Text style={styles.Error}>{String(errors.last_name)}</Text>
                                )}

                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Phone Number:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.phone_number}
                                        onChangeText={handleChange('phone_number')}
                                        onBlur={handleBlur('phone_number')}
                                        value={values.phone_number}
                                    />
                                </View>
                                {touched.phone_number && errors.phone_number && (
                                    <Text style={styles.Error}>{String(errors.phone_number)}</Text>
                                )}

                                <Text style={{ fontSize: 16, fontWeight: 500, marginVertical: 10 }}>Profile Info:</Text>

                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Bio:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.bio}
                                        onChangeText={handleChange('bio')}
                                        onBlur={handleBlur('bio')}
                                        value={values.bio}
                                        multiline
                                        numberOfLines={4}
                                    />
                                </View>
                                {touched.bio && errors.bio && (
                                    <Text style={styles.Error}>{String(errors.bio)}</Text>
                                )}

                                <View style={styles.InputContainer}>
                                    <Text style={{ fontSize: 12 }}>Website:</Text>
                                    <TextInput
                                        style={styles.Input}
                                        placeholder={user.website}
                                        onChangeText={handleChange('website')}
                                        onBlur={handleBlur('website')}
                                        value={values.website}
                                    />
                                </View>
                                {touched.website && errors.website && (
                                    <Text style={styles.Error}>{String(errors.website)}</Text>
                                )}

                                <View style={{}}>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 500, marginVertical: 10 }}>Hide your profile:</Text>
                                        <Text>
                                            By enabling this setting, your profile will be hidden from public view. Only approved followers will be able to see your posts, photos, and other profile information. This is a great way to maintain your privacy and control who can interact with you on the platform.
                                        </Text>
                                        <Switch
                                            trackColor={{ false: '#E0E0E0', true: '#607D8B' }}
                                            thumbColor={isEnabled ? '#FFFFFF' : '#F5F5F5'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                    </View>
                                </View>

                                {/* Add more fields as needed */}

                                <LinearGradient
                                    colors={["#EF9245", "#D33C71"]}
                                    style={{ marginTop: 20 }}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <TouchableOpacity onPress={() => handleSubmit()} style={styles.SaveLink}>
                                        <Text style={styles.SaveLinkText}>Save</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default EditUserForm