// app/(tabs)/_layout.tsx

import React from "react";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function TabLayout() {
    return (
        <BottomSheetModalProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false, // Hides the text label
                    tabBarStyle: {
                        backgroundColor: "rgb(255, 255, 255)",
                        height: 60,
                        padding: 20

                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Foundation
                                name="home"
                                size={focused ? 28 : 24} // Increases size when active
                                color={focused ? "rgba(239, 147, 69, 1)" : "rgba(0, 0, 0, 0.2)"}
                                style={{ top: 10 }}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons
                                name="explore"
                                size={focused ? 28 : 24} // Increases size when active
                                color={focused ? "rgba(239, 147, 69, 1)" : "rgba(0, 0, 0, 0.2)"}
                                style={{ top: 10 }}

                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="post"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="add-outline"
                                size={focused ? 28 : 24} // Increases size when active
                                color={focused ? "rgba(239, 147, 69, 1)" : "rgba(0, 0, 0, 0.2)"}
                                style={{ top: 10 }}

                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="saves"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="bookmark"
                                size={focused ? 22 : 20} // Increases size when active
                                color={focused ? "rgba(239, 147, 69, 1)" : "rgba(0, 0, 0, 0.2)"}
                                style={{ top: 10 }}

                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome6
                                name="user-large"
                                size={focused ? 22 : 20} // Increases size when active
                                color={focused ? "rgba(239, 147, 69, 1)" : "rgba(0, 0, 0, 0.2)"}
                                style={{ top: 10 }}

                            />
                        )
                    }}
                />
            </Tabs>
        </BottomSheetModalProvider>
    );
}

