import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

function ButtonInputSearch({
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgba(244, 194, 194, 1)',
    colorButton = '#fff',
}) {
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                variant="borderless"
                style={{
                    backgroundColor: backgroundColorInput,
                    border: 'none',
                    borderTopRightRadius: 0,

                    borderBottomRightRadius: 0,
                }}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined />}
                style={{
                    border: 'none',
                    borderLeft: 'none',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundColor: backgroundColorButton,
                    color: colorButton,
                    bordered: !bordered && 'none',
                }}
                textButton={textButton}
            />
        </div>
    );
}

export default ButtonInputSearch;
