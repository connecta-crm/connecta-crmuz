import { FilterTableDataType } from './FilterTableColumnType';
export const FilterTableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: string) => <a className="table__id">{text}</a>,
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
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Vehicle',
    dataIndex: 'quoteVehicles',
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
