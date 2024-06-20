import { Input } from 'antd';
import React, { useState } from 'react';
// import { EyeOutlined } from '@ant-design/icons';
const InputForm = ({ className, placeholder }) => {
    const [valueInput, setValueInput] = useState('');

    return (
        <>
            <Input className={className} placeholder={placeholder} valueInput={valueInput}>
                {/* <EyeOutlined /> */}
            </Input>
        </>
    );
};

export default InputForm;
