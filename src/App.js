import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from '~/Services/UserService';

import { useDispatch, useSelector } from "react-redux";
import { routes } from "./routes";
import { isJsonString } from "./ultils";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slides/userSlide";
import { LoadingComponent } from "./components/LoadingComponent/LoadingComponent";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Kiểm tra xem hành động hiện tại có phải là reload hay không
    const isReload = sessionStorage.getItem("isReload");

    const clearLocalStorage = () => {
      if (!isReload) {
        // Chỉ xóa localStorage khi không phải là reload
        localStorage.clear();
      }
    };

    // Gắn sự kiện beforeunload để xóa localStorage khi đóng tab
    window.addEventListener('beforeunload', clearLocalStorage);

    // Đặt cờ isReload khi trang được reload
    window.addEventListener('load', () => {
      sessionStorage.setItem("isReload", "true");
    });

    // Cleanup function để đảm bảo sự kiện được xóa khi component unmount
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorage);
      window.removeEventListener('load', () => {
        sessionStorage.setItem("isReload", "true");
      });
    };
  }, []); // Dependency array rỗng để đảm bảo useEffect chỉ chạy một lần khi component mount

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };


  UserService.axiosJwt.interceptors.request.use(async function (config) {

    const { decoded, storageData } = handleDecoded();
    if (decoded && storageData) {
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers['token'] = `Bearer ${data?.access_token}`;
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });


  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {

    setIsLoading(true);
    const fetchData = async () => {
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id && user) {
        await handleGetDetailsUser(decoded.id, storageData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <LoadingComponent isPending={isLoading} >
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;

              return (
                <Route
                  key={route.path}
                  path={isCheckAuth ? route.path : undefined} // Ensure path is undefined if not authenticated
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent >
    </div>
  );
}

export default App;
