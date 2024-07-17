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

    setIsLoading(true);
    const fetchData = async () => {
      const { storageData, decoded } = handleDecoded();
      if (decoded?.id && user) {
        await handleGetDetailsUser(decoded.id, storageData);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);


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
