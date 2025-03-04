import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    AttachmentBtn: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginRight: 10
    },
    CommentContent: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 50
    },
    Input: {
        padding: 10,
        width: 200
    },
    SubmitBtn: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginLeft: 10

    }
});

export default styles