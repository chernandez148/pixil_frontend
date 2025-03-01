import React, { useState, useCallback, memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CommentItemProps } from '@/redux/type';
import RepliesList from '../RepliesList/RepliesList';
import styles from './CommentItem.styles';

const CommentItem: React.FC<CommentItemProps> = memo(({ id, author, comment, replies }) => {
    const [selectedCommentID, setSelectedCommentID] = useState<number | null>(null);

    // Memoized callback to handle selecting a comment
    const handleSelectedCommentID = useCallback((id: number) => {
        setSelectedCommentID(id);
    }, []);

    // Memoized callback to remove the selected comment ID
    const removeSelectedCommentID = useCallback(() => {
        setSelectedCommentID(null);
    }, []);

    // Determine if replies should be shown
    const showReplies = selectedCommentID !== null;
    const hasReplies = replies && replies.length > 0;

    return (
        <View style={styles.CommentContainer}>
            {/* Comment Content */}
            <View style={styles.Comment}>
                <Image
                    style={styles.AuthorImage}
                    source={author.profile_image ? { uri: author.profile_image } : require('@/assets/images/profile-image-placeholder.png')}
                />
                <View style={styles.CommentContent}>
                    <Text style={styles.CommentAuthor}>
                        {author.first_name} {author.last_name}
                    </Text>
                    <Text style={styles.CommentText}>{comment}</Text>
                    <TouchableOpacity>
                        <Text style={styles.ReplyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Replies List */}
            {showReplies && <RepliesList commentID={selectedCommentID} />}

            {/* View/Hide Replies Button */}
            {hasReplies && (
                <View style={styles.ViewReplies}>
                    <TouchableOpacity onPress={showReplies ? removeSelectedCommentID : () => handleSelectedCommentID(id)}>
                        <Text style={styles.ViewRepliesText}>
                            {showReplies ? 'Hide Replies' : 'View Replies'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
});

export default CommentItem;