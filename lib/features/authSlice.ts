import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: "EMPLOYER" | "JOBSEEKER";
  profile?: any;
}

interface AuthState {
  user: User | null;
  token: string | null; // to store the JWT token
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null, // initialize token state
  loading: false,
  error: null,
};

// Thunk to login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string; role: string }, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true, // Assuming your API sets a cookie with the token
      });
      return res.data; // assuming response contains user and token
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

// Thunk to get current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      return res.data.user as User;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // clear token on logout
    },
  },
  extraReducers: (builder) => {
    // Handling login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token; // Save the token in state
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handling fetching current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
