import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { usePaginatedCommentsByPostID } from '@/hooks/usePaginatedCommentsByPostID';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './CommentsList.styles';

function CommentsList() {
    const postID = useSelector((state: RootState) => state.postID.postID);
    const postIDString = postID!.toString()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = usePaginatedCommentsByPostID(postIDString);

    // Flatten the pages into a single array of comments
    const comments = data?.pages.flatMap((page) => page.comments) || [];

    // Render a single comment
    const renderComment = ({ item }: { item: any }) => (
        <View style={styles.Comment}>

            {item.user.profile_image ? (
                <Image style={styles.AuthorImage} source={{ uri: item.user.profile_image }} />
            ) : (
                <Image style={styles.AuthorImage} source={require('@/assets/images/profile-image-placeholder.png')} />
            )}
            <View style={styles.CommentContent}>
                <Text style={styles.CommentAuthor}>{item.user.first_name} {item.user.last_name}</Text>
                <Text style={styles.CommentText}>{item.content}</Text>
                <TouchableOpacity>
                    <Text style={styles.ReplyText}>Reply</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    // Render loading indicator
    const renderFooter = () => {
        if (isFetchingNextPage) {
            return <ActivityIndicator size="small" color="#0000ff" />;
        }
        return null;
    };

    // Render error message
    if (isError) {
        return (
            <View style={styles.Comments}>
                <Text style={styles.ErrorText}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.Comments}>
            <Text style={styles.Title}>Comments</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item?.ID.toString()}
                renderItem={renderComment}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5} // Load more when 50% of the list is scrolled
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

export default CommentsList;