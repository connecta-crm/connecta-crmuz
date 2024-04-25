import React, { useState } from 'react'
import TableHeader from '../ui/TableHeader'
import { Table } from 'antd';
import { TaskTableColumns, TaskTableData } from '../utils/table'
import TableSearchButtons from '../ui/TableSearchButtons';

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

export default function Task() {
    const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');
    return (
        <div className='task'>
            <TableHeader pageName="task" />
            <TableSearchButtons/>
            <div className="quotes-table">
                <div className='table__container'>
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,

                        }}
                        columns={TaskTableColumns}
                        dataSource={TaskTableData}
                    />
                </div>
            </div>
        </div>
    )
}