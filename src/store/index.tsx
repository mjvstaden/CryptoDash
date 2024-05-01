import { configureStore, createSlice } from '@reduxjs/toolkit'

const idListSlice = createSlice({
  name: 'storeIdList',
  initialState:[] as string[], // initial state is an empty array []
  reducers: {
    setIdList: (state, action) => {
        if (!state.includes(action.payload)) {
            state.push(action.payload);
        }
    },
    removeId: (state, action) => {
        state.forEach((id, index) => {
            if (id[0] === action.payload) {
                state.splice(index, 1);
            }
        });
    },
  },
});


export const { setIdList, removeId} = idListSlice.actions;

export default configureStore({
  reducer: {
    idList: idListSlice.reducer,
  },
});