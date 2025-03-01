import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserState {
    user: any | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// 🔹 Load user from AsyncStorage on app start
export const initializeUser = createAsyncThunk('user/initialize', async (_, { rejectWithValue }) => {
    try {
        const storedUser = await AsyncStorage.getItem('user');

        if (storedUser) {
            return { user: JSON.parse(storedUser) };
        }
        return { user: null };
    } catch (error) {
        return rejectWithValue("Failed to load user");
    }
});

// 🔹 Async thunk for login
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://pixil-server-production.up.railway.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Login failed');

            await AsyncStorage.setItem('user', JSON.stringify(data.user)); // Save the entire user object
            return { user: data.user }; // Return the entire user object
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// 🔹 Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            AsyncStorage.removeItem('user'); // Remove user from AsyncStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(initializeUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = !!action.payload.user;
            })
            .addCase(initializeUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

// 🔹 Export actions
export const { logout } = userSlice.actions;
export default userSlice.reducer;