/* eslint-disable @typescript-eslint/no-unused-vars */
import { Radio, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TableDropdown from '../../ui/table/TableDropdown';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { TableProps } from '../leads/LeadTable';
import { QuotesTableDataType } from './QuoteTableColumnType';
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: QuotesTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: QuotesTableDataType) => ({
    name: record.customerName,
  }),
};

function QuotesTable({
  dataSource: quotes,
  loadingList,
  loadingItem,
  guid,
  count,
  onOpenModal,
  onOpenDrawer,
}: TableProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const filteredHeader = () => {
      switch (status) {
        case 'quote':
          return {
            title: 'Quoted on',
            dataIndex: 'updatedAt',
          };
        case 'followUp':
          return {
            title: 'Quoted',
            dataIndex: 'updatedAt',
          };
        case 'warm':
          return {
            title: 'Put on warm',
            dataIndex: 'updatedAt',
          };
        case 'ongoing':
          return {
            title: 'Last edited on',
            dataIndex: 'updatedAt',
          };
        case 'upcoming':
          return {
            title: 'Dedline',
            dataIndex: 'updatedAt',
          };
        case 'onHold':
          return {
            title: 'Put on hold',
            dataIndex: 'updatedAt',
          };
        case 'notNow':
          return {
            title: 'Last edited on',
            dataIndex: 'updatedAt',
          };
        case 'archived':
          return {
            title: 'Archived',
            dataIndex: 'updatedAt',
          };
        default:
          return {
            title: 'Quoted on',
            dataIndex: 'updatedAt',
          };
      }
    };

    const columnsConfig = [
      {
        title: 'Id',
        width:120,
        dataIndex: 'id',
        render: (text: string) => <a className="table__id">#100{text}</a>,
      },
      filteredHeader(),
      {
        title: 'Note',
        width:55,
        dataIndex: 'node',
        render: (text: string, record: QuotesTableDataType) => (
          <TableDropdown record={record} text={text} />
        ),
      },
      {
        title: 'User',
        dataIndex: 'user',
        width:55,
        render: (data: { id: string; picture: string }) => (
          <div className="table__img__container">
            <img src={data?.picture} alt="" className="table__user__img" />
          </div>
        ),
      },
      {
        title: 'Customer',
        dataIndex: 'customerName',
      },
      {
        title: 'Phone',
        width:165,
        dataIndex: 'customerPhone',
        render: (text: string, record: QuotesTableDataType) => (
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
        dataIndex: 'quoteVehicles',
        render: (
          data: { vehicleName: string }[],
          record: QuotesTableDataType,
        ) => (
          <div className="table__vehicle">
            {
              <div className="table__vehicle__imgs">
                {(record.condition == 'rols' ||
                  record.condition == 'forklift') && (
                  <img src="./img/dt_table/engine.svg" alt="engine" />
                )}
                {record.trailerType === 'enclosed' && (
                  <img src="./img/dt_table/trailer-red.svg" />
                )}
              </div>
            }
            <div className="table__vehicle__text">
              {data.map((item, index) => (
                <div key={index}>{item.vehicleName}</div>
              ))}
            </div>
          </div>
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
        render: (price: number) => (
          <div>
            <span className="table__price">$</span>
            {price}
          </div>
        ),
      },
      {
        title: 'Est. Ship',
        width:96,
        dataIndex: 'dateEstShip',
      },
    ];
    setColumns(columnsConfig);
  }, [searchParams]);
  const status = searchParams.get('status') || 'quote';

  return (
    <>
      <div className="dt-header">
        <TableHeaderActions onOpenModal={onOpenModal} pageName="quote" />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType="quote"
        />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Radio.Group style={{ width: '100%' }}>
            <Table
              tableLayout="fixed"
              rowKey="id"
              rowSelection={{ ...rowSelection }}
              columns={columns}
              dataSource={
                quotes as unknown as QuotesTableDataType[] | undefined
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

export default QuotesTable;
