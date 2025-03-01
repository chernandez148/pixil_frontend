import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    CommentContainer: {
        flexDirection: "column",
        marginVertical: 10
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
    ReplyText: {
        fontSize: 12,
        marginTop: 5
    },
    ViewReplies: {},
    ViewRepliesText: {
        fontSize: 12,
        textAlign: "center"
    }
});

export default styles