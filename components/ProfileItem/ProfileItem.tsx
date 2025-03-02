import React, { useRef } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Media, ProfileItemProps } from '@/redux/type';
import styles from './ProfileItem.styles';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const ProfileItem: React.FC<ProfileItemProps> = ({ id, media }) => {
    const carouselRef = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0); // Shared value for carousel progress

    console.log("ProfileItems: ", media)

    // Render function for Carousel items
    const renderItem = ({ item }: { item: Media }) => {
        if (!item.media_url) {
            return (
                <View>
                    <Text>Invalid media URL</Text>
                </View>
            );
        }

        return (
            <View >
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

    return (
        <View style={styles.ProfileItem}>
            {media && media.length > 0 ? (
                <>
                    <Carousel
                        ref={carouselRef}
                        data={media}
                        renderItem={renderItem}
                        width={(screenWidth - 30) / 3}
                        height={(screenWidth - 30) / 3}
                        onProgressChange={(_, absoluteProgress) => {
                            progress.value = absoluteProgress;
                        }}
                    />
                    <Pagination.Basic
                        progress={progress}
                        data={media} // Use `length` instead of `data`
                        dotStyle={styles.DotStyle}
                        containerStyle={styles.PaginationContainer}
                        onPress={onPressPagination}
                    />
                </>
            ) : (
                <Text>No media available</Text>
            )}
        </View>
    );
};

export default React.memo(ProfileItem);