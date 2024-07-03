import { Button } from 'antd';
import React from 'react';

function ButtonComponent({ onClick, size, style, styleTextButton, textButton, ...rests }) {
    return (
        <Button size={size} {...rests} style={style} onClick={onClick}>
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;
