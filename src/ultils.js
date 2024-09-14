import { orderConstant } from "./constant";

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }

};
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const renderOptions = (arr) => {
    let result = [];
    if (arr) {
        result = arr?.map((options) => {
            return {
                value: options,
                label: options,
            }
        })
    }
    result.push({
        label: "Thêm kiểu sản phẩm",
        value: 'add_type',
    })
    return result
}
export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString()
        return `${result} VNĐ`;
    } catch (error) {
        return null
    }
}

export const convertIsPaid = (isPaid) => {
    try {
        if (isPaid === true) {
            return 'Đã thanh toán'
        } else if (isPaid === false) {
            return 'Chưa thanh toán'

        }
    } catch (error) {
        return null
    }
}

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse();
    }
    let locale = "vi_VN";
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FB_ID,// You App ID
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: "v2.1" // use version 2.1
        });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};

export const convertDataChart = (dataOrder, type) => {
    try {
        const object = {};
        Array.isArray(dataOrder) && dataOrder.forEach((opt) => {
            if (!object[opt[type]]) {
                object[opt[type]] = 1;
            } else {
                object[opt[type]] += 1;
            }
        });
        console.log("object", object);

        const results = Object.keys(object).map((item) => {
            return {
                name: orderConstant.payment[item] || item,
                value: object[item]
            }
        })
        return results
    } catch (error) {
        return []
    }
};

