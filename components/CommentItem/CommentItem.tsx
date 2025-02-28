import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { CommentItemProps } from '@/redux/type'
import RepliesList from '../RepliesList/RepliesList'
import styles from './CommentItem.styles'

const CommentItem: React.FC<CommentItemProps> = ({ id, author, comment }) => {

    return (
        <View style={styles.CommentContainer}>

            <View style={styles.Comment}>
                {author.profile_image ? (
                    <Image style={styles.AuthorImage} source={{ uri: author.profile_image }} />
                ) : (
                    <Image style={styles.AuthorImage} source={require('@/assets/images/profile-image-placeholder.png')} />
                )}
                <View style={styles.CommentContent}>
                    <Text style={styles.CommentAuthor}>{author.first_name} {author.last_name}</Text>
                    <Text style={styles.CommentText}>{comment}</Text>
                    <TouchableOpacity>
                        <Text style={styles.ReplyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RepliesList commentID={id} />

        </View>
    )
}

export default CommentItem