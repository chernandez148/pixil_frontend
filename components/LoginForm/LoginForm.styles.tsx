import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    LoginForm: {
        width: 300
    },
    UsernameInput: {
        backgroundColor: "rgba(0, 0, 0, 0.01)",
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    PasswordInput: {
        backgroundColor: "rgba(0, 0, 0, 0.01)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    LoginLink: {
        padding: 15,
        alignItems: "center",
    },
    LoginLinkText: {
        fontSize: 12,
        color: "white",
        fontWeight: 600
    },
    RegisterLink: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    RegisterLinkText: {
        fontSize: 12,
    },
    Error: {
        color: "red",
        fontSize: 12,
    },
})

export default styles