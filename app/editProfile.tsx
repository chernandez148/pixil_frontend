import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditUserForm from '@/components/EditUserForm/EditUserForm';

function EditProfile() {

    const navigateToProfile = () => {
        router.replace("/(tabs)/profile")
    }
    return (
        <View style={styles.EditProfile}>
            <View style={styles.EditProfileHeader}>
                <TouchableOpacity onPress={() => navigateToProfile()}>
                    <Ionicons name="return-up-back-sharp" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.EditProfileTxt}>Edit Profile</Text>
            </View>

            <EditUserForm />

        </View>
    )
}

const styles = StyleSheet.create({
    EditProfile: {
        flex: 1,
        backgroundColor: "white",
        padding: 20
    },
    EditProfileHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20
    },
    EditProfileTxt: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: 600
    }
});

export default EditProfile