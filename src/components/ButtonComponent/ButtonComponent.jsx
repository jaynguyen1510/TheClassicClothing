import { Button } from 'antd';
import React from 'react';

function ButtonComponent({ onClick, size, style, styleTextButton, styleButton, textButton, ...rests }) {
    return (
        <Button size={size} {...rests} style={{ ...style, ...styleButton }} onClick={onClick}>
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;
