import { usePaginatedPosts } from "@/hooks/usePaginatedPosts";
import { View, FlatList, ActivityIndicator } from "react-native";
import PostItem from "../PostItem/PostItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { clearPostID } from "@/redux/slices/postID"; // Import the action to clear postID
import Comments from "../CommentsList/CommentsList";

export default function PostsList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePaginatedPosts();
    const { user } = useSelector((state: RootState) => state.user);
    const postID = useSelector((state: RootState) => state.postID.postID);
    const dispatch = useDispatch();
    const commentsRef = useRef<BottomSheetModal>(null);

    // Flatten the pages and filter posts
    const filteredPosts = data?.pages
        .flatMap((page) => page.posts) // Flatten the array of pages into a single array of posts
        .filter((post) =>
            user?.following?.some((following: { ID: number }) => following.ID === post.user_id) || post.user_id === user?.ID
        );

    console.log("Posts: ", filteredPosts)

    // Open the BottomSheetModal when postID changes
    const handlePostComments = useCallback(() => {
        if (postID) {
            commentsRef.current?.present();
        } else {
            commentsRef.current?.dismiss();
        }
    }, [postID]);

    // Clear postID when the modal is dismissed
    const handleDismissModal = useCallback(() => {
        dispatch(clearPostID()); // Clear the postID state
    }, [dispatch]);

    useEffect(() => {
        handlePostComments();
    }, [postID, handlePostComments]);

    // Render loading indicator
    const renderFooter = () => {
        if (isFetchingNextPage) {
            return <ActivityIndicator size="small" color="#0000ff" />;
        }
        return null;
    };

    // Render each post item
    const renderPostItem = useCallback(({ item }: { item: any }) => (
        <PostItem
            id={item.ID}
            author={item.user}
            location={item.location}
            media={item.media}
            caption={item.caption}
            likes={item.likes_count}
        />
    ), []);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={filteredPosts}
                keyExtractor={(post, index) => `${post?.ID}-${index}`} // Unique key for each post
                renderItem={renderPostItem}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5} // Load more when 50% of the list is scrolled
                ListFooterComponent={renderFooter}
            />

            <BottomSheetModal
                ref={commentsRef}
                snapPoints={["100%", "100%"]}
                enablePanDownToClose={true}
                onDismiss={handleDismissModal} // Clear postID when dismissed
            >
                <BottomSheetView>
                    <Comments />
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
}