import React from 'react'
import { usePaginatedRepliesByCommentID } from '@/hooks/usePaginatedRepliesByCommentID';
import { RepliesListProps } from '@/redux/type';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styles from './RepliesList.styles'
import ReplyItem from '../ReplyItem/ReplyItem';

const RepliesList: React.FC<RepliesListProps> = ({ commentID }) => {
    const commentIDString = commentID?.toString()
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, error } = usePaginatedRepliesByCommentID(commentIDString);

    const replies = data?.pages.flatMap((page) => page.replies) || []

    // Render a single reply
    const renderReply = ({ item }: { item: any }) => (
        <ReplyItem
            id={item.id}
            author={item.user}
            reply={item.content}
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
            <View style={styles.Replies}>
                <Text style={styles.ErrorText}>Error: {error.message}</Text>
            </View>
        );
    }
    return (
        <View style={styles.Replies}>
            <FlatList
                data={replies}
                keyExtractor={(item) => item?.ID.toString()}
                renderItem={renderReply}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5} // Load more when 50% of the list is scrolled
                ListFooterComponent={renderFooter}
            />
        </View>)
}

export default RepliesList