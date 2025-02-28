import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { AuthFormProps } from "@/redux/type"
import { Formik } from "formik";
import * as Yup from "yup";
import styles from './LoginForm.styles'
import { loginUser } from '@/redux/slices/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const LoginForm: React.FC<AuthFormProps> = ({ setIsRegistering }) => {
    const dispatch = useDispatch<AppDispatch>(); // Correctly type dispatch

    const handleRegisterForm = () => {
        setIsRegistering(true)
    }

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required"),
    });

    const initialValues = {
        username: "pixil",
        password: "Extra004!"
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(loginUser(values)) // Dispatch the action
                    .unwrap()
                    .catch((error) => {
                        console.error("Login failed:", error);
                    })
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View
                    style={styles.LoginForm}
                >
                    <View style={styles.UsernameInput}>
                        <TextInput
                            placeholder="Username"
                            onChangeText={handleChange("username")}
                            onBlur={handleBlur("username")}
                            value={values.username}
                        />
                        {touched.username && errors.username && (
                            <Text style={styles.Error}>{errors.username}</Text>
                        )}
                    </View>

                    <View style={styles.PasswordInput}>
                        <TextInput
                            placeholder="Password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                        />
                        {touched.password && errors.password && (
                            <Text style={styles.Error}>{errors.password}</Text>
                        )}
                    </View>

                    <LinearGradient
                        colors={["#EF9245", "#D33C71"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity onPress={() => handleSubmit()} style={styles.LoginLink}>
                            <Text style={styles.LoginLinkText}>Login</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={styles.RegisterLink}>
                        <Text style={styles.RegisterLinkText}>Don't have an account? Register </Text>
                        <TouchableOpacity onPress={() => handleRegisterForm()}>
                            <Text style={styles.RegisterLinkText}>here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}

export default LoginForm