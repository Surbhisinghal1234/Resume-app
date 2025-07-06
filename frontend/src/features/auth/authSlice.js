import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  agreedToTerms: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setEmail: (state, action) => { state.email = action.payload },
    setPassword: (state, action) => { state.password = action.payload },
    setConfirmPassword: (state, action) => { state.confirmPassword = action.payload },
    setMobile: (state, action) => { state.mobile = action.payload },
    setAgreedToTerms: (state, action) => { state.agreedToTerms = action.payload },
    setUser: (state, action) => { state.user = action.payload },
    setUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        state.user = user;
     
        state.name = user.name || "";
        state.email = user.email || "";
        state.mobile = user.mobile || "";
      
        state.password = "";
        state.confirmPassword = "";
      }
},
   logoutUser: (state) => {
  state.user = null;
  state.name = '';
  state.email = '';
  state.password = '';
  state.confirmPassword = '';
  state.mobile = '';
  state.agreedToTerms = false;
}
  }
});

export const {setName, setEmail, setPassword, setConfirmPassword, setMobile, setAgreedToTerms, setUser,  setUserFromStorage, logoutUser  } = authSlice.actions;

export default authSlice.reducer;