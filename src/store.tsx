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
  },
});


export const { setIdList } = idListSlice.actions;

export default configureStore({
  reducer: {
    idList: idListSlice.reducer,
  },
});

// import { configureStore, createSlice } from '@reduxjs/toolkit'

// const idListSlice = createSlice({
//   name: 'storeIdList',
//   initialState: {list: [] as string[]},
//   reducers: {
//     AddToIdList: (state, action) => {
//         if (!state.list.includes(action.payload)) {
//             state.list.push(action.payload);
//         }
//     },
//   },
// });


// export const { AddToIdList } = idListSlice.actions;

// export default configureStore({
//   reducer: {
//     idList: idListSlice.reducer,
//   },
// });