import { Button } from 'antd';
import React from 'react';

function ButtonComponent({ size, style, textButton, ...rests }) {
    return (
        <Button size={size} {...rests} style={style}>
            {textButton}
        </Button>
    );
}

export default ButtonComponent;
