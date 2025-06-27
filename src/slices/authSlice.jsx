import { createSlice } from "@reduxjs/toolkit";


//even if tab closed , local storage ke andar value store raheti hain
// Step-by-step Explanation:
// localStorage.getItem("token")
// This checks if there is a value stored in localStorage under the key "token".
// localStorage is a browser storage where you can save data (as strings) that stays even after the page is refreshed.

// ? (Ternary Operator)
// This is like an if-else in one line.
// It checks: if localStorage.getItem("token") is not null, do something; otherwise, do something else.
// If token exists:
// JSON.parse(localStorage.getItem("token"))
// This converts the stored string back into its original format (e.g., an object or array).
// Because localStorage only stores strings, anything saved (like a token object) must be parsed when read.
// If token does not exist:
// null is assigned to token.
// Summary in Simple Terms:
// Check if there is a "token" saved in the browser.
// If yes, convert it from string to object and use it.
// If no, set token to null.

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};



//pehle setToken banayyaa sirf 
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;


// the state object you're referring to is created internally by Redux, specifically when you set up the Redux store using configureStore.
// Redux automatically builds the full global state object like this:

// so globally redux state would be
// state = {
//   auth: {
//     token: ...,
//     loading: ...,
//     signupData: ...
//   }
// }