import { Input } from 'antd';
import React from 'react';

function InputComponent({ size, placeholder, variant, style, onChange, ...rests }) {
    return (
        <Input size={size} onChange={onChange} placeholder={placeholder} variant={variant} {...rests} style={style} />
    );
}

export default InputComponent;
