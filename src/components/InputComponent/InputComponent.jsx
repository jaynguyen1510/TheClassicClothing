import { Input } from 'antd';
import React from 'react';

function InputComponent({ size, placeholder, variant, style, ...rests }) {
    return <Input size={size} placeholder={placeholder} variant={variant} {...rests} style={style} />;
}

export default InputComponent;
