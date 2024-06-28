import React from 'react';
import { Input } from 'antd';
// import { EyeOutlined } from '@ant-design/icons';
const InputForm = ({ className, placeholder, type, value, onChange }) => {
    return (
        <>
            <Input className={className} placeholder={placeholder} value={value} type={type} onChange={onChange}>
                {/* <EyeOutlined /> */}
            </Input>
        </>
    );
};

export default InputForm;
