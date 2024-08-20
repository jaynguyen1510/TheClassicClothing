import React from 'react';
import { Steps } from 'antd';

const StepsOption = ({ current = 0, items = [] }) => {
    return (
        <Steps size="small" current={current}>
            {items.map((step) => (
                <Steps.Step key={step.title} title={step.title} description={step.description} />
            ))}
        </Steps>
    );
};

export default StepsOption;
