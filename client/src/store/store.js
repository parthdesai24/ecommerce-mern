import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice/index";
import shopCartSlice from "./cart-slice/index";
import addressSlice from "./address-slice";
import shopSearchSlice from "./shop/search-slice";

import shopProductsSlice from "./shop/products-slice/index";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,

    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: addressSlice,
    shopSearch: shopSearchSlice,
  },
});

export default store;
