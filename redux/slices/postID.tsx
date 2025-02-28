// selectedPostSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostIDState {
    postID: number | null;
}

const initialState: PostIDState = {
    postID: null,
};

const postIDSlice = createSlice({
    name: 'postId',
    initialState,
    reducers: {
        setPostID: (state, action: PayloadAction<number>) => {
            state.postID = action.payload;
        },
        clearPostID: (state) => {
            state.postID = null;
        },
    },
});

export const { setPostID, clearPostID } = postIDSlice.actions;
export default postIDSlice.reducer;
