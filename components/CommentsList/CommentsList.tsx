import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { usePaginatedCommentsByPostID } from '@/hooks/usePaginatedCommentsByPostID';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './CommentsList.styles';
import CommentItem from '../CommentItem/CommentItem';

function CommentsList() {
    const postID = useSelector((state: RootState) => state.postID.postID);
    const postIDString = postID!.toString()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = usePaginatedCommentsByPostID(postIDString);

    // Flatten the pages into a single array of comments
    const comments = data?.pages.flatMap((page) => page.comments) || [];

    console.log(comments)

    // Render a single comment
    const renderComment = ({ item }: { item: any }) => (
        <CommentItem
            id={item.ID}
            author={item.user}
            comment={item.content}
            replies={item.replies}
        />
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