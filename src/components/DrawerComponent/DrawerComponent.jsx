import { Drawer } from 'antd';
import React from 'react';

const DrawerComponent = ({ children, title = 'Drawer ', placement = 'right', isOpen = false, ...rests }) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    );
};

export default DrawerComponent;
