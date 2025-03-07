// State Types
export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
    posts: PostItemProps[];
}

export interface Media {
    media_url: string;
    type?: "image" | "video";
}

//Props
export interface AuthFormProps {
    setIsRegistering: (value: boolean) => void;
}

export interface ProfileListProps {
    user: User;
    filterBy: string;
}

export interface ProfileItemProps {
    id: number;
    media: Media[];
}

export interface PostItemProps {
    id: number;
    author: User;
    location?: string; // Optional
    media: Media[];
    caption: string;
    likes: number;
}

export interface CommentItemProps {
    id: number;
    author: User;
    comment: string;
    replies: ReplyItemProps[]
}

export interface RepliesListProps {
    commentID: number
}

export interface ReplyItemProps {
    id: number;
    author: User;
    reply: string;
}

const types = {};
export default types;