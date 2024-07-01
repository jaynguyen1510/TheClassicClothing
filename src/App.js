import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import * as UserService from '~/Services/UserService';

import { useDispatch } from "react-redux";
import { routes } from "./routes";
import { isJsonString } from "./ultils";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slides/userSlide";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handelDecoded();

    if (decoded?.id) {
      handelGetDetailsUser(decoded.id, storageData);
    }

  }, []);

  const handelDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      console.log("Parsed storageData", storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJwt.interceptors.request.use(async function (config) {
    const { decoded } = handelDecoded();
    const currentTime = new Date()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error)
  })

  const handelGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            return (
              <Route
                key={route.path}
                path={route.path}
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
    </div>
  );
}

export default App;
