/* eslint-disable no-param-reassign */
import { AsyncThunk, createAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { productApi } from '../../services/product';
import { IProduct } from '../../services/product';
import { showAlert } from '../../components/alert';


export type ProductState = {
    products: IProduct[] | null;
};

const executeQuery = createAction('api/');

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

const initialState: ProductState = {
    products: []
};

export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(executeQuery, () => { })
            .addMatcher(
                (action): action is RejectedAction => action.type.endsWith('/rejected'),
                (state, data) => {
                    const payloadData = data.payload as { data: { message: string } };
                    showAlert({ message: payloadData.data.message, type: 'error', onClose: () => { } });
                }
            );

        builder
            .addMatcher(productApi.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
                state.products = payload;

            });
     
            
            builder.addMatcher(productApi.endpoints.createProduct.matchFulfilled, (state, data) => {
                const payloadData = data.payload as unknown as  {message: string, product: IProduct}
                state.products=[]
                    showAlert({ message: payloadData.message, type: 'success', onClose: () => { } });

            });
    }
});

export default ProductSlice.reducer;
