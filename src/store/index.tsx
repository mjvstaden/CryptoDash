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
        console.log(action.payload);
        console.log("Before: " + state);
        console.log("After: "+ state.filter(id => id !== action.payload));
        return state.filter(id => id[0] !== action.payload);
    },
  },
});


export const { setIdList, removeId} = idListSlice.actions;

export default configureStore({
  reducer: {
    idList: idListSlice.reducer,
  },
});