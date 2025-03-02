import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { ProfileListProps } from '@/redux/type';
import ProfileItem from '../ProfileItem/ProfileItem';

const ProfileList: React.FC<ProfileListProps> = ({ user, filterBy }) => {
    const filteredPosts = user.posts.filter((post) => {
        const filterType = filterBy.toLowerCase();

        if (filterType === "image") {
            return post.media.every((media) => media.type === "image");
        } else if (filterType === "video") {
            return post.media.every((media) => media.type === "video");
        } else {
            return true; // Return all posts if filterBy is not "image" or "video"
        }
    });

    const renderProfileItem = useCallback(({ item }: { item: any }) => {
        return (
            <ProfileItem
                id={item.ID}
                media={item.media}
            />
        )

    }, []);

    return (
        <View style={{ paddingVertical: 20 }}>
            <FlatList
                data={filteredPosts}
                keyExtractor={(post, index) => `${post?.id}-${index}`} // Unique key for each post
                renderItem={renderProfileItem}
                scrollEnabled={false} // Allow scrolling inside FlatList
            />
        </View>
    );
};

export default React.memo(ProfileList);