import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    productData: [],
    userInfo: null,
};

export const mapshopSlice = createSlice({
    name: "mapshop",
    initialState,  
    reducers: {
        addToCart: (state, action) => {
            const item = state.productData.find((item) => item._id === action.payload._id);  
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.productData.push(action.payload);
            }
        },
        deleteItems: (state, action) =>{
            state.productData = state.productData.filter(
                (item)=> item._id !== action.payload
                
            );
        },
        resetCart: (state) =>{
            state.productData = [];
        },
        incrementQuantity:(state, action) =>{
            const item = state.productData.find(
                (item) => item._id === action.payload._id
            );
            if(item){
                item.quantity++ ;
            }
        },
        decrementQuantity:(state, action) =>{
            const item = state.productData.find(
                (item) => item._id == action.payload._id
            );
            if(item.quantity === 1){
                item.quantity = 1;
            }else{
                item.quantity-- ;
            }
        },
        addUser:(state, action) =>{
            state.userInfo = action.payload;
        },
        removeUser:(state) =>{
            state.userInfo = null;
        }

    },
});

export const { addToCart,decrementQuantity,incrementQuantity,deleteItems,resetCart ,addUser,removeUser} = mapshopSlice.actions;

export default mapshopSlice.reducer;
