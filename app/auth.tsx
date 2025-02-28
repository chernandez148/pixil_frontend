// app/auth.tsx

import React, { useState } from "react";
import { Image, ImageBackground, View } from "react-native";
import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm.tsx";

export default function Auth() {
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View >
                <Image style={{ width: 100, height: 100, objectFit: "contain", margin: "auto" }} source={require("@/assets/images/pixil_logo.png")} />
                {isRegistering ?
                    <RegisterForm setIsRegistering={setIsRegistering} />
                    :
                    <LoginForm setIsRegistering={setIsRegistering} />}
            </View>
        </ImageBackground>
    );
}
