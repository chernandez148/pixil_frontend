import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Comments: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    Title: {
        fontWeight: 600,
        textAlign: "center",
        marginBottom: 10
    },
    Comment: {
        flexDirection: "row"
    },
    AuthorImage: {
        width: 35,
        height: 35,
    },
    CommentContent: {
        marginLeft: 10
    },
    CommentAuthor: {
        fontSize: 12,
        fontWeight: 600
    },
    CommentText: {
        fontSize: 12
    },
    ErrorText: {},
    ReplyText: {
        fontSize: 12,
        marginTop: 5
    },
});

export default styles