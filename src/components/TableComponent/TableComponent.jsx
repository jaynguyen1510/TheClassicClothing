import React, { useMemo, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './TableComponent.module.scss';

import { Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

const cx = classNames.bind(styles);
const TableComponent = ({
    selectionType = 'checkbox',
    data = [],
    columns = [],
    isPending = false,
    onRow,
    handleDeletedMany,
}) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const newColumnsExport = useMemo(() => {
        const newColumns = columns?.filter((col) => col.dataIndex !== 'action');
        return newColumns;
    }, [columns]);
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
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('test')
            .addColumns(newColumnsExport)
            .addDataSource(data, {
                str2Percent: true,
            })
            .saveAs('Excel.xlsx');
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

            <button onClick={exportExcel} className={cx('table-component')}>
                Export
            </button>
            <Table
                id="table-xls"
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
