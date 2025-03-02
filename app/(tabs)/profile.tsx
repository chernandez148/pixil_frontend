import React, { useState } from "react";
import { RootState } from "@/redux/store";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { logout } from "@/redux/slices/user";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ProfileList from "@/components/ProfileList/ProfileList";

export default function Profile() {
    const { user } = useSelector((state: RootState) => state.user);
    const [filterBy, setFilterBy] = useState("All"); // Track the active filter
    const dispatch = useDispatch();
    const router = useRouter();

    const handleEditProfile = () => {
        router.replace("/editProfile")
    }

    const handleLogout = () => {
        dispatch(logout());
        router.replace("/auth");
    };

    return (
        <View style={styles.Profile}>
            <ScrollView>
                <View style={styles.CoverImage}>
                    <Image
                        style={{ height: 200, objectFit: "cover" }}
                        source={user?.cover_image ? { uri: user.cover_image } : require('@/assets/images/default-profile-background.jpg')}
                    />
                </View>

                <View style={styles.ProfileHeader}>
                    <View style={styles.Followers}>
                        <Text style={styles.Numbers}>{user.followers.length}</Text>
                        <Text>Followers</Text>
                    </View>
                    <Image
                        style={styles.UserImage}
                        source={user?.profile_image ? { uri: user?.profile_image } : require('@/assets/images/profile-image-placeholder.png')}
                    />
                    <View style={styles.Following}>
                        <Text style={styles.Numbers}>{user.following.length}</Text>
                        <Text>Following</Text>
                    </View>
                </View>

                <View style={styles.ProfileInfo}>
                    <Text style={styles.FullName}>{user?.first_name} {user?.last_name}</Text>
                    <Text style={styles.Bio}>{user?.bio ? user.bio : "No bio available"}</Text>

                    <View style={styles.ProfileBtns}>
                        <LinearGradient
                            colors={["#EF9245", "#D33C71"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <TouchableOpacity onPress={() => handleEditProfile()} style={styles.EditBtn}>
                                <Text style={styles.EditBtnText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </LinearGradient>

                        <TouchableOpacity style={styles.ShareBtn}>
                            <Text>Share Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.ProfileContent}>
                    <View style={styles.FilterBy}>
                        {/* All Filter Button */}
                        <TouchableOpacity
                            style={[
                                styles.FilterBtn,
                                filterBy === "All" && styles.ActiveFilterBtn, // Apply active style
                            ]}
                            onPress={() => setFilterBy("All")}
                        >
                            <Text
                                style={[
                                    styles.FilterNoneTxt,
                                    filterBy === "All" && styles.ActiveFilterTxt, // Apply active text style
                                ]}
                            >
                                All
                            </Text>
                        </TouchableOpacity>

                        {/* Photo Filter Button */}
                        <TouchableOpacity
                            style={[
                                styles.FilterBtn,
                                filterBy === "Image" && styles.ActiveFilterBtn, // Apply active style
                            ]}
                            onPress={() => setFilterBy("Image")}
                        >
                            <Text
                                style={[
                                    styles.FilterPhotoTxt,
                                    filterBy === "Image" && styles.ActiveFilterTxt, // Apply active text style
                                ]}
                            >
                                Image
                            </Text>
                        </TouchableOpacity>

                        {/* Video Filter Button */}
                        <TouchableOpacity
                            style={[
                                styles.FilterBtn,
                                filterBy === "Video" && styles.ActiveFilterBtn, // Apply active style
                            ]}
                            onPress={() => setFilterBy("Video")}
                        >
                            <Text
                                style={[
                                    styles.FilterVideoTxt,
                                    filterBy === "Video" && styles.ActiveFilterTxt, // Apply active text style
                                ]}
                            >
                                Video
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ProfileList user={user} filterBy={filterBy} />

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Profile: {
        flex: 1,
        backgroundColor: "white",
    },
    CoverImage: {},
    ProfileHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    Followers: {
        padding: 5,
        alignItems: "center",
    },
    Numbers: {
        fontWeight: "600",
        fontSize: 16,
    },
    UserImage: {
        width: 80,
        height: 80,
        bottom: 40,
    },
    Following: {
        padding: 5,
        alignItems: "center",
    },
    ProfileInfo: {
        bottom: 20,
        paddingHorizontal: 30,
    },
    FullName: {
        fontSize: 18,
        textAlign: "center",
    },
    Bio: {
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
    },
    ProfileBtns: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 50,
    },
    EditBtn: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderWidth: 0.5,
        borderColor: "transparent",
    },
    EditBtnText: {
        color: "white",
    },
    ShareBtn: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderWidth: 0.5,
    },
    ProfileContent: {
        padding: 15,
    },
    FilterBy: {
        flexDirection: "row",
    },
    FilterBtn: {
        marginRight: 30,
    },
    FilterNoneTxt: {
        fontSize: 16,
    },
    FilterPhotoTxt: {
        fontSize: 16,
    },
    FilterVideoTxt: {
        fontSize: 16,
    },
    ActiveFilterBtn: {
        borderBottomWidth: 2, // Add a bottom border for the active filter
        borderBottomColor: "#EF9245", // Use your gradient color
    },
    ActiveFilterTxt: {
        color: "#EF9245", // Change text color for the active filter
        fontWeight: "bold", // Make the text bold
    },
});