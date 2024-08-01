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