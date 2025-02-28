import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    PostItem: {},
    PostSlide: {
        marginHorizontal: 5
    },
    PostHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15
    },
    PostImage: {
        width: "100%",
        height: 300,
        borderRadius: 15
    },
    AuthorImage: {
        width: 35,
        height: 35,
    },
    AuthorInfo: {
        alignItems: "center",
        marginLeft: 10
    },
    FullName: {
        flexDirection: "row"
    },
    FirstName: {
        fontWeight: 600,
        fontSize: 12
    },
    LastName: {
        fontWeight: 600,
        fontSize: 12
    },
    Username: {
        fontSize: 12
    },
    DotStyle: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 3,
        height: 6,
        width: 6,
    },
    PaginationContainer: {
        gap: 5,
        marginTop: -15,
    },
    PostActions: {
        marginTop: 25,
        marginBottom: 10,
        marginHorizontal: 5,
        flexDirection: "row",
        alignItems: "center"

    },
    Likes: {
        flexDirection: "row",
        alignItems: "center"
    },
    Caption: {
        marginHorizontal: 5,
        fontSize: 12
    },
});

export default styles