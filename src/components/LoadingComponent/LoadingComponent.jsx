import { Spin } from 'antd';
import React from 'react';

export const LoadingComponent = ({ style, children, isPending, delay = 200 }) => {
    return (
        <Spin style={style} spinning={isPending} delay={delay}>
            {children}
        </Spin>
    );
};
