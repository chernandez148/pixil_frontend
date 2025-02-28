// app/(tabs)/index.tsx

import PostsList from "@/components/PostsList/PostsList";
import React from "react";
import { View } from "react-native";

export default function HomeScreen() {

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
            <PostsList />
        </View>
    );
}
