import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    ProfileItem: {
        width: (screenWidth - 40) / 3,
        height: (screenWidth - 40) / 3,
    },
    PostImage: {
        width: "100%",
        height: "100%",

    },
    DotStyle: {
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: 3,
        height: 6,
        width: 6,
    },
    PaginationContainer: {
        gap: 5,
        top: -15,
    },
})
export default styles