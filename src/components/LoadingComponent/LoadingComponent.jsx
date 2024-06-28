import { Spin } from 'antd';
import React from 'react';

export const LoadingComponent = ({ children, isPending, delay = 200 }) => {
    return (
        <Spin spinning={isPending} delay={delay}>
            {children}
        </Spin>
    );
};
