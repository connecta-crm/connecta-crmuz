import { Radio } from 'antd';
import { FilterTableDataType } from './FilterTableColumnType';
export const FilterTableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: string) => <span>#100{text}</span>,
    // render: (text: string) => <a className="table__id">#100{text}</a>,
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
    render: (text: string, record: FilterTableDataType) => (
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
    title: 'Status',
    dataIndex: 'statusType',
  },
  // {
  //   title: 'Vehicle',
  //   dataIndex: 'vehicles',
  // },
  {
    title: 'Vehicle',
    dataIndex: 'vehicles',
    render: (data: { vehicleName: string }[], record: FilterTableDataType) => (
      <div className="table__vehicle">
        {
          <div className="table__vehicle__imgs">
            {record.condition == 'rols' && (
              <img src="./img/dt_table/engine.svg" alt="engine" />
            )}
            {record.trailerType === 'open' &&
              data.map((i, index) => (
                <img
                  key={index}
                  src="./img/dt_table/trailer-red.svg"
                  alt={i + 'trailer-red'}
                />
              ))}
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
