import React, { useCallback, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [mode, setMode] = useState('camera');
    const [permission, requestPermission] = useCameraPermissions(); // Always call hooks at the top level

    const toggleCameraFacing = useCallback(() => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }, []);

    const modes = [
        { id: '1', mode: 'Camera' },
        { id: '2', mode: 'Video' },
        { id: '3', mode: 'Story' },
        { id: '4', mode: 'AI' },
    ];

    const renderItem = useCallback(({ item }: { item: { id: string; mode: string } }) => (
        <TouchableOpacity
            style={[
                styles.modeButton,
                mode === item.mode && styles.activeModeButton,
            ]}
            onPress={() => setMode(item.mode)}
        >
            <Text style={styles.modeText}>{item.mode}</Text>
        </TouchableOpacity>
    ), [mode]);

    // Handle permission states after hooks are called
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <MaterialIcons name="cameraswitch" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.modes}>
                    <FlatList
                        data={modes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.modesContent}
                    />
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    modes: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    modesContent: {
        paddingHorizontal: 20,
    },
    modeButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
    },
    activeModeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    modeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});