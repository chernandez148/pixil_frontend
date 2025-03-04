import React from 'react';
import { Formik } from 'formik';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './CommentForm.styles';

function CommentForm() {
    const validationSchema = Yup.object({
        content: Yup.string().nullable().required("Comment cannot be empty"),
    });

    const initialValues = {
        content: "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(values);
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={{ flexDirection: "row" }}>
                    {/* Attachment Button */}
                    <LinearGradient
                        colors={["#EF9245", "#D33C71"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.AttachmentBtn}                        >
                        <TouchableOpacity >
                            <Ionicons name="attach-sharp" size={24} color="white" />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Comment Input Field */}
                    <View style={styles.CommentContent}>
                        <TextInput
                            style={styles.Input}
                            placeholder="Write a comment..."
                            placeholderTextColor="#aaa"
                            onChangeText={handleChange('content')}
                            onBlur={handleBlur('content')}
                            value={values.content}
                            multiline={true} // Enable multiline
                            numberOfLines={4} // Set the number of lines (optional, works on Android)
                            textAlignVertical="top" // Align text to the top (optional, works on Android)
                        />
                    </View>

                    {/* Submit Button */}
                    <LinearGradient
                        colors={["#EF9245", "#D33C71"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.SubmitBtn}
                    > <TouchableOpacity onPress={() => handleSubmit()}>

                            <Ionicons name="paper-plane-sharp" size={24} color="white" />                        </TouchableOpacity>
                    </LinearGradient>

                </View>
            )}
        </Formik>
    );
}

export default CommentForm;
