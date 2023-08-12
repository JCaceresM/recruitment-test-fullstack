import api from './api';
import { User } from './user';



export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  user: Partial<User>;

}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data: Partial<IProduct>) => {
         const formData = new FormData();
        formData.append('title', data.title!);
        formData.append('description', data.description!);
        formData.append('price', `${data.price}`);
        formData.append('image', data.image!);
        formData.append('user',JSON.stringify( data.user || {}));

       return { 
        url: '/api/v1/products',
        method: 'POST',
        body: formData}
      },
      invalidatesTags: ['Product']
    }),
    getProducts: builder.query<IProduct[], unknown>({
      query: () => {
        return `/api/v1/products`;
      },
      providesTags: ['Product']
    }),

  })
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
} = productApi;
