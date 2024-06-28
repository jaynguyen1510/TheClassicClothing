import { Button } from 'antd';
import React from 'react';

function ButtonComponent({ size, style, styleTextButton, textButton, ...rests }) {
    return (
        <Button size={size} {...rests} style={style}>
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;
