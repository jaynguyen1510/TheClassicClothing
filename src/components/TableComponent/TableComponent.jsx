import React from 'react';
import { Table } from 'antd';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

const TableComponent = ({ selectionType = 'checkbox', data = [], columns = [], products = [], isPending = false }) => {
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <LoadingComponent isPending={isPending}>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </LoadingComponent>
    );
};

export default TableComponent;
