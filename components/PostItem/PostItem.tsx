import React, { useRef } from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";
import { Media, PostItemProps } from "@/redux/type";
import { useDispatch } from "react-redux";
import { setPostID } from "@/redux/slices/postID";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from "./PostItem.styles";

const { width: screenWidth } = Dimensions.get("window");

const PostItem: React.FC<PostItemProps> = ({ id, author, location, media, caption, likes }) => {
    const carouselRef = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0); // Shared value for carousel progress
    const dispatch = useDispatch();
    let isLiked = false

    // Render function for Carousel items
    const renderItem = ({ item }: { item: Media }) => {
        return (
            <View style={styles.PostSlide}>
                <Image source={{ uri: item.media_url }} style={styles.PostImage} />
            </View>
        );
    };

    // Function to handle pagination button press
    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({
            count: index - progress.value, // Scroll to the target index
            animated: true,
        });
    };

    const getPostIDForComments = (id: number) => {
        dispatch(setPostID(id));
    };


    return (
        <View style={styles.PostItem}>
            <View style={styles.PostHeader}>
                {author.profile_image ? (
                    <Image style={styles.AuthorImage} source={{ uri: author.profile_image }} />
                ) : (
                    <Image style={styles.AuthorImage} source={require('@/assets/images/profile-image-placeholder.png')} />
                )}
                <View style={styles.AuthorInfo}>
                    <View style={styles.FullName}>
                        <Text style={styles.FirstName}>{author.first_name}</Text>
                        <Text style={styles.LastName}>{author.last_name}</Text>
                    </View>
                    {location && <Text style={styles.Username}>{location}</Text>}
                </View>
            </View>

            {media && media.length > 0 ? (
                <>
                    <Carousel
                        ref={carouselRef}
                        data={media}
                        renderItem={renderItem}
                        width={screenWidth - 20}
                        height={300}
                        onProgressChange={progress}
                    />
                    <Pagination.Basic
                        progress={progress}
                        data={media}
                        dotStyle={styles.DotStyle}
                        containerStyle={styles.PaginationContainer}
                        onPress={onPressPagination}
                    />
                </>
            ) : (
                <Text>No media available</Text>
            )}

            <View style={styles.PostActions}>
                <TouchableOpacity>
                    <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={24}
                        color={isLiked ? "#FF0000" : "#565769"}
                    />
                </TouchableOpacity>
                <Text>{likes + (isLiked ? 1 : 0)}</Text>
                <TouchableOpacity onPress={() => getPostIDForComments(id)}>
                    <AntDesign style={{ marginLeft: 10, marginRight: 8 }} name="message1" size={20} color="#565769" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="share" size={26} color="#565769" />
                </TouchableOpacity>
            </View>

            <Text style={styles.Caption}>{caption}</Text>
        </View>
    );
};

export default React.memo(PostItem);