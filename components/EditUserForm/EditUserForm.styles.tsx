import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    EditUserForm: {},
    EditProfileCoverImage: {
        width: screenWidth - 40,
        height: 200
    },
    UpdateCoverImage: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        bottom: 35,
        left: 5
    },
    UserImage: {
        width: 100,
        height: 100
    },
    InputContainer: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderStyle: "solid",
        paddingHorizontal: 10,
        paddingTop: 5,
        marginVertical: 5
    },
    Input: {},
    Error: {
        color: "red",
        fontSize: 12,
    },
    SaveLink: {
        padding: 20,
        alignItems: "center",
    },
    SaveLinkText: {
        fontSize: 12,
        color: "white",
        fontWeight: 600
    }
});

export default styles