import { Radio } from 'antd';
import TableDropdown from '../../ui/table/TableDropdown';
import { QuotesTableDataType } from './QuoteTableColumnType';

export const QuotesTableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: string) => <a className="table__id">#100{text}</a>,
  },
  {
    title: 'Quoted on',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Note',
    dataIndex: 'node',
    render: (text: string, record: QuotesTableDataType) => (
      <TableDropdown record={record} text={text} />
    ),
  },
  {
    title: 'User',
    dataIndex: 'user',
    render: () => (
      <div className="table__img__container">
        <img
          src="./img/dt_table/default_user_image.png"
          alt=""
          className="table__user__img"
        />
      </div>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customerName',
  },
  {
    title: 'Phone',
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
    render: (data: { vehicleName: string }[], record: QuotesTableDataType) => (
      <div className="table__vehicle">
        {
          <div className="table__vehicle__imgs">
            {(record.condition == 'rols' || record.condition == 'forklift') && (
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
    dataIndex: 'dateEstShip',
  },
];
