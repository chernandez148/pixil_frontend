import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { AuthFormProps } from '@/redux/type'
import styles from './RegisterForm.styles'

const RegisterForm: React.FC<AuthFormProps> = ({ setIsRegistering }) => {

    const handleLoginForm = () => {
        setIsRegistering(false)
    }
    return (
        <View style={styles.RegisterForm}>
            <Text>RegisterForm</Text>
            <View style={styles.LoginLink}>
                <Text>Already have an account? Login </Text>
                <TouchableOpacity onPress={handleLoginForm}>
                    <Text>here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterForm