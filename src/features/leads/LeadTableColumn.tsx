import { LeadTableDataType } from './LeadTableColumnType';

export const LeadTableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    render: (text: string) => <a className="table__id">#100{text}</a>,
  },
  {
    title: 'Received',
    dataIndex: 'updatedAt',
  },
  {
    title: 'User',
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
    dataIndex: 'leadVehicles',
    render: (data: { vehicleName: string }[], record: LeadTableDataType) => (
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
    title: 'Est. Ship',
    dataIndex: 'dateEstShip',
  },
];
