import React from 'react'
import { ReplyItemProps } from '@/redux/type'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './ReplyItem.styles'

const ReplyItem: React.FC<ReplyItemProps> = ({ author, reply }) => {

    return (
        <View style={styles.Reply}>

            {author.profile_image ? (
                <Image style={styles.AuthorImage} source={{ uri: author.profile_image }} />
            ) : (
                <Image style={styles.AuthorImage} source={require('@/assets/images/profile-image-placeholder.png')} />
            )}
            <View style={styles.ReplyContent}>
                <Text style={styles.ReplyAuthor}>{author.first_name} {author.last_name}</Text>
                <Text style={styles.Content}>{reply}</Text>
                <TouchableOpacity>
                    <Text style={styles.ReplyText}>Reply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReplyItem