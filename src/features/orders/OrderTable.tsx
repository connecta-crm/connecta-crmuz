import { Radio, Table } from 'antd';
import { Key, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TableDropdown from '../../ui/table/TableDropdown';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { TableProps } from '../leads/LeadTable';
import { OrderTableDataType } from './OrderTableColumnType';
function OrdersTable({
  dataSource: orders,
  loadingList,
  loadingItem,
  guid,
  count,
  onOpenModal,
  onOpenDrawer,
}: TableProps) {
  const [searchParams] = useSearchParams();
  const [columns, setColumns] = useState([]);
  const [checkedTableRows, setCheckedTableRows] = useState<Key[]>();

  const rowSelection = {
    onChange: (selectedRowKeys: Key[]) => {
      setCheckedTableRows(selectedRowKeys);
    },
    getCheckboxProps: (record: OrderTableDataType) => ({
      name: record.customerName,
    }),
  };

  useEffect(() => {
    const filteredHeader = () => {
      switch (status) {
        case 'orders':
          return {
            title: 'Last edited on',
            dataIndex: 'updatedAt',
          };
        case 'booked':
          return {
            title: 'Last edited on',
            dataIndex: 'updatedAt',
          };
        case 'posted':
          return {
            title: 'Posted',
            dataIndex: 'updatedAt',
          };
        case 'notsigned':
          return {
            title: 'Sent',
            dataIndex: 'updatedAt',
          };
        case 'dispatched':
          return {
            title: 'Dispatched',
            dataIndex: 'updatedAt',
          };
        case 'issue':
          return {
            title: 'Issue raised',
            dataIndex: 'updatedAt',
          };
        case 'pickedup':
          return {
            title: 'Picked up',
            dataIndex: 'updatedAt',
          };
        case 'completed':
          return {
            title: 'Delivered',
            dataIndex: 'updatedAt',
          };
        case 'onhold':
          return {
            title: 'Put on hold',
            dataIndex: 'updatedAt',
          };
        case 'archived':
          return {
            title: 'Archived',
            dataIndex: 'updatedAt',
          };
        default:
          return {
            title: 'Last edited on',
            dataIndex: 'updatedAt',
          };
      }
    };

    const columnsConfig = [
      {
        title: 'Id',
        width: 100,
        dataIndex: 'id',
        render: (text: string) => <a className="table__id">#100{text}</a>,
      },
      filteredHeader?.(),
      {
        title: 'Note',
        width: 60,
        dataIndex: 'notes',
        render: (text: string, record: OrderTableDataType) => (
          <TableDropdown record={record} text={text} />
        ),
      },
      {
        title: 'User',
        width: 55,
        dataIndex: 'user',
        render: (data: { id: string; picture: string }) => (
          <div className="table__img__container">
            <img src={data?.picture} alt="" className="table__user__img" />
          </div>
        ),
      },
      {
        title: 'Customer',
        dataIndex: 'customerName',
        // width:150,
      },
      {
        title: 'Phone',
        width: 165,
        dataIndex: 'customerPhone',
        render: (text: string, record: OrderTableDataType) => (
          <Radio.Button
            value={record.id}
            onClick={() => {
              navigator.clipboard.writeText(text);
            }}
          >
            <a
              className="table__phone "
              href={'tel:' + text}
              style={{ display: 'inline' }}
            >
              <img
                src="./img/dt_table/call.svg"
                alt=""
                style={{ marginTop: '9px' }}
                className="mr-5"
              />
            </a>
            {text}
          </Radio.Button>
        ),
      },
      {
        title: 'Vehicle',
        dataIndex: 'orderVehicles',
        render: (
          data: { vehicleName: string }[],
          record: OrderTableDataType,
        ) =>
          data?.length ? (
            <div className="table__vehicle">
              <div className="table__vehicle__imgs">
                {record.condition == 'rols' && (
                  <img src="./img/dt_table/engine.svg" alt="engine" />
                )}
                {record.trailerType === 'open' &&
                  (data || []).map((i, index) => (
                    <img
                      key={index}
                      src="./img/dt_table/trailer-red.svg"
                      alt={i + 'trailer-red'}
                    />
                  ))}
              </div>
              <div className="table__vehicle__text">
                {(data || []).map((item, index) => (
                  <div key={index}>{item.vehicleName}</div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">-</p>
          ),
      },
      {
        title: 'Origin',
        dataIndex: 'originName',
      },
      {
        title: 'Destination',
        dataIndex: 'destinationName',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        width: 96,
        render: (price: number) => (
          <div>
            <span className="table__price">$</span>
            {price}
          </div>
        ),
      },
      {
        title: 'Est. Ship',
        dataIndex: 'dateEstShip',
      },
    ];
    setColumns(columnsConfig);
  }, [searchParams]);
  const status = searchParams.get('status') || 'quote';

  return (
    <>
      <div className="dt-header">
        <TableHeaderActions
          pageName="order"
          sourceType="order"
          onOpenModal={onOpenModal}
          checkedTableRows={checkedTableRows}
        />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType="order"
        />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Radio.Group style={{ width: '100%' }}>
            <Table
              rowKey="id"
              rowSelection={{ ...rowSelection }}
              columns={columns}
              tableLayout="fixed"
              dataSource={
                (orders || []) as unknown as OrderTableDataType[] | undefined
              }
              loading={loadingList || (loadingItem && !!guid)}
              pagination={{ position: ['bottomRight'], hideOnSinglePage: true }}
              onRow={(data) => ({
                onClick: (event) => {
                  const target = event.target as HTMLTextAreaElement;
                  const element = target.className;
                  element == 'table__id' && onOpenDrawer?.(data.guid);
                },
              })}
            />
          </Radio.Group>
        </div>
      </div>
    </>
  );
}

export default OrdersTable;
