import TypeProductsPage from "~/pages/TypeProductsPage/TypeProductsPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPages/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignUpPage from "~/pages/SignUpPage/SignUpPage";
import SignInPages from "~/pages/SignInPages/SignInPages";
import ProductDetailPage from "~/pages/ProductDetailPage/ProductDetailPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/sign-in",
    page: SignInPages,
    isShowHeader: false,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/:type",
    page: TypeProductsPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
