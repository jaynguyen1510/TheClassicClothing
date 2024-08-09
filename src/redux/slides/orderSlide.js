// src/redux/slice/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems:
        [

        ],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderProductSlide = createSlice({
    name: "orderProduct",
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItems } = action.payload;
            const itemsOrderItem = state?.orderItems?.find((items) => items?.product === orderItems.product)
            if (itemsOrderItem) {
                itemsOrderItem.amount += orderItems?.amount
            } else {
                state.orderItems.push(orderItems);
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemsOrderItem = state?.orderItems?.find((items) => items?.product === idProduct)
            itemsOrderItem.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemsOrderItem = state?.orderItems?.find((items) => items?.product === idProduct)
            itemsOrderItem.amount--
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;

            // Tạo một danh sách mới không chứa sản phẩm có idProduct cần xóa
            const updatedOrderItems = state?.orderItems?.filter((items) => items?.product !== idProduct);

            // Cập nhật lại state với danh sách đã loại bỏ sản phẩm
            state.orderItems = updatedOrderItems;

        },
        removeAllOrderProduct: (state, action) => {
            const { listCheckbox } = action.payload;
            console.log('listCheckbox', listCheckbox);

            // Tạo một danh sách mới không chứa sản phẩm có idProduct cần xóa
            const updatedOrderItems = state?.orderItems?.filter((items) => !listCheckbox.includes(items.product));

            // Cập nhật lại state với danh sách đã loại bỏ sản phẩm
            state.orderItems = updatedOrderItems;

        },

    },
});

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } = orderProductSlide.actions;
export default orderProductSlide.reducer;
