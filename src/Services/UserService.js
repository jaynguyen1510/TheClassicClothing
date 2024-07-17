import axios from "axios"

export const axiosJwt = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`, data)
    return res.data
}

export const signUpUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`, data)
    return res.data
}


export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}



export const refreshToken = async () => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data

}

export const logOutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`);
        return res.data;
    } catch (error) {
        console.error('Error logging out:', error);
    }
}
export const updateUser = async (id, data, access_token) => {
    try {
        const res = await axiosJwt.put(`${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

export const getAllUser = async (access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/getAllUser`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUser = async (id, data, access_token) => {
    try {
        const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error logging out:', error);
    }
}