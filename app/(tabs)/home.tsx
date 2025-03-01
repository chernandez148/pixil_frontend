// app/(tabs)/index.tsx

import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import PostsList from "@/components/PostsList/PostsList";

export default function HomeScreen() {
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
            <View style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: screenWidth - 20,
            }}>
                <TouchableOpacity>
                    <EvilIcons name="camera" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign name="message1" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <PostsList />
        </View>
    );
}
