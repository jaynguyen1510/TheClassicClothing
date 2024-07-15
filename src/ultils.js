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
