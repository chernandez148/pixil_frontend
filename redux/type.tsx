// State Types
export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
}

export interface Media {
    media_url: string;
}

//Props
export interface AuthFormProps {
    setIsRegistering: (value: boolean) => void;
}

export interface PostItemProps {
    id: number;
    author: User;
    location: string;
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