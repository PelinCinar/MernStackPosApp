import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
      total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0, 
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id //tıkladığım ürünü bulma
      );

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      // const findCartItem = state.cartItems.find(
      //   (item) => item._id === action.payload._id
      // );//üsttede yazmışsın ama aklında kalsın diye bırakıyorum

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.total -= action.payload.price * action.payload.quantity; //ürünü çıkardığımızda sıfırlanmasını sağladık total kdv vs.
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); //statin içersinde buldukktan sonra quantitiy artttır azaltı yağacağız

      cartItem.quantity += 1;
      state.total += cartItem.price; //her tıkladığımda o ürünün fıyatını ekle
    },
    decrase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity -= 1;

      if (cartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ); //0a eşitlendikten sona sepetimizdedn çıkarmasını söylemiş olduk.ama sepetten toplam miktar eksilimiyor bunun için ;
      }
      state.total -= cartItem.price;
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteCart, increase, decrase, reset } =
  cartSlice.actions; //redcers içerisinde yazdıklarımız actions demek oluyor. biz içerisine ne kadar method yazarsak yazalım bunu exportlamamız lazım .Bir yerde çağrımak için
//fonks. yazdığımız yer reducers
export default cartSlice.reducer;
