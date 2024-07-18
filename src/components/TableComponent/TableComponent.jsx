import React, { useState } from 'react';
import { Table } from 'antd';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

const TableComponent = ({
    selectionType = 'checkbox',
    data = [],
    columns = [],
    isPending = false,
    onRow,
    handleDeletedMany,
}) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDeletedMany(rowSelectedKeys);
    };

    return (
        <LoadingComponent isPending={isPending}>
            {rowSelectedKeys.length > 1 && (
                <div
                    style={{
                        background: '#1d1ddd',
                        color: '#fff',
                        padding: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                onRow={onRow}
            />
        </LoadingComponent>
    );
};

export default TableComponent;
