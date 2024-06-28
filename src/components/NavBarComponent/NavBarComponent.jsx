import React from 'react';

import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';

import { WrapperContent, WrapperLabelText, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';

const cx = classNames.bind(styles);

const NavBarComponent = () => {
    const handleOnChange = () => {};

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return <WrapperTextValue key={index}>{option}</WrapperTextValue>;
                });
            case 'checkbox':
                return (
                    <Checkbox.Group className={cx('checkbox-group')} onChange={handleOnChange}>
                        {options.map((option, index) => {
                            return (
                                <Checkbox value={option.value} key={index}>
                                    {option.label}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                );
            case 'star':
                return options.map((option, index) => {
                    return (
                        <div className={cx('items-icon')} key={index}>
                            <Rate className={cx('icon-rate')} disabled defaultValue={option} />
                            <span>{`Từ ${option} sao`}</span>
                        </div>
                    );
                });
            case 'price':
                return options.map((option, index) => {
                    return (
                        <div className={cx('items-price')} key={index}>
                            {option}
                        </div>
                    );
                });

            default:
                return {};
        }
    };
    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Quần dài', 'Quần ngắn', 'Áo kiểu', 'Áo ba lỗ', 'Đầm', 'Khác'])}
                {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ])}
                {renderContent('star', [3, 4, 5])}
                {renderContent('price', ['dưới 4', 'Trên 500.000'])}
            </WrapperContent>
        </div>
    );
};

export default NavBarComponent;
