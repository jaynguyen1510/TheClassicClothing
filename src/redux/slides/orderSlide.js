// src/redux/slice/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    selectItemsOrder: [],
    shippingAddress: {},
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
            const checkItemsOrderItem = state?.selectItemsOrder?.find((items) => items?.product === idProduct)
            // Kiểm tra nếu item tồn tại và số lượng lớn hơn hoặc bằng 1 trước khi tăng
            if (checkItemsOrderItem && checkItemsOrderItem.amount >= 1 && itemsOrderItem && itemsOrderItem.amount >= 1) {
                itemsOrderItem.amount++;
                checkItemsOrderItem.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemsOrderItem = state?.orderItems?.find((items) => items?.product === idProduct)
            const checkItemsOrderItem = state?.selectItemsOrder?.find((items) => items?.product === idProduct)
            // Kiểm tra nếu item tồn tại và số lượng lớn hơn 1 trước khi giảm
            if (checkItemsOrderItem && checkItemsOrderItem.amount > 1 && itemsOrderItem && itemsOrderItem.amount > 1) {
                itemsOrderItem.amount--;
                checkItemsOrderItem.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;

            // Tạo một danh sách mới không chứa sản phẩm có idProduct cần xóa
            const updatedOrderItems = state?.orderItems?.filter((items) => items?.product !== idProduct);
            const checkItemsOrderItem = state?.selectItemsOrder?.filter((items) => items?.product !== idProduct);

            // Cập nhật lại state với danh sách đã loại bỏ sản phẩm
            state.orderItems = updatedOrderItems;
            state.selectItemsOrder = checkItemsOrderItem;


        },
        removeAllOrderProduct: (state, action) => {
            const { listCheckbox } = action.payload;

            // Tạo một danh sách mới không chứa sản phẩm có idProduct cần xóa
            const updatedOrderItems = state?.orderItems?.filter((items) => !listCheckbox.includes(items.product));
            const checkItemsOrderItem = state?.selectItemsOrder?.filter((items) => !listCheckbox.includes(items.product));

            // Cập nhật lại state với danh sách đã loại bỏ sản phẩm
            state.orderItems = updatedOrderItems;
            state.selectItemsOrder = checkItemsOrderItem;


        },
        selectedOrderItem: (state, action) => {
            const { listCheckbox } = action.payload;
            const order = []
            state?.orderItems.forEach((item) => {
                if (listCheckbox.includes(item.product)) {
                    order.push(item)
                }
            })
            state.selectItemsOrder = order;

        }

    },
});

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrderItem } = orderProductSlide.actions;
export default orderProductSlide.reducer;
