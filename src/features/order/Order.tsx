
import { Table } from 'antd';
import { OrderTableColumns, OrderTableData } from '../../utils/table';
// import OrderModal from "../ui/modal/OrderModal";

type DataType = {
    key: string,
    id:string,
    las:string,
    node: number,
    user: string,
    customer:string,
    phone: string,
    vehicle: string,
    origin: string,
    destination: string,
    price: string,
    ship: string,
  };

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        name: record.user,
    }),
};

function Order() {
    return (
        <div className="orders">
            <div className="quotes-table">
                <div className='table__container'>
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={OrderTableColumns}
                        dataSource={OrderTableData}
                    />
                </div>
            </div>
            {/* <OrderModal /> */}
        </div>
    )
}

export default Order