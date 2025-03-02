import { Provider } from "react-redux";
import { store, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Stack, router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import { initializeUser } from "@/redux/slices/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LayoutContent />
      </QueryClientProvider>
    </Provider>
  );
}

// Handles authentication-based routing
function LayoutContent() {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  console.log("User: ", user)

  useEffect(() => {
    if (user === undefined) {
      dispatch(initializeUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user === undefined || !fontsLoaded) return;

    if (user === null) {
      router.replace("/auth");
    } else {
      router.replace("/(tabs)/home");
    }
  }, [user, fontsLoaded]);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Ionicons.font,
        ...AntDesign.font,
        ...MaterialCommunityIcons.font,
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (user === undefined || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="editProfile" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}