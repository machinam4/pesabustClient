import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { walletModal: false },
};
export const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    toggleWalletModal: (state) => {
      state.value.walletModal = !state.value.walletModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleWalletModal } = interfaceSlice.actions;

export default interfaceSlice.reducer;
