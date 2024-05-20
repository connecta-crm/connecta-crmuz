import TableDropdown from '../../ui/TableDropdown';
import { OrdersTableColumnType } from './OrdersTableColumnType';
export const OrdersTableColumn = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: string) => <a className="table__id">#100{text}</a>,
  },
  {
    title: 'Las edited on',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Note	',
    dataIndex: 'node',
    render: (text: string, record: OrdersTableColumnType) => (
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
    render: (text: string) => (
      <div className="table__phone">
        <img src="./img/dt_table/call.svg" alt="" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: 'Vehicle',
    dataIndex: 'orderVehicles',
    render: (
      data: { vehicleName: string }[],
      record: OrdersTableColumnType,
    ) => (
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
