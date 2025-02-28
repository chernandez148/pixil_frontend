export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string;
}

export interface Media {
    media_url: string,
}

export interface AuthFormProps {
    setIsRegistering: (value: boolean) => void;
}

export interface PostItemProps {
    id: number,
    author: User
    location: string;
    media: Media[]
    caption: string
    likes: number
}

const types = {};
export default types;