import { Radio } from 'antd';
import { LeadTableDataType } from './LeadTableColumnType';
export const LeadTableColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    width:80,
    render: (text: string) => <a className="table__id">#100{text}</a>,
  },
  {
    title: 'Received',
    width:170,
    dataIndex: 'updatedAt',
  },
  {
    title: 'User',
    width:56,
    dataIndex: 'user',
    render: (data: { id: string; picture: string }) => (
      <div className="table__img__container">
        <img src={data?.picture} alt="" className="table__user__img" />
      </div>
    ),
  },
  {
    title: 'Customer',
    width:160,
    dataIndex: 'customerName',
  },
  {
    title: 'Phone',
    width:165,
    dataIndex: 'customerPhone',

    render: (text: string, record: LeadTableDataType) => (
      <Radio.Button value={record.id}
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
    width:190,
    dataIndex: 'leadVehicles',
    render: (data: { vehicleName: string }[], record: LeadTableDataType) => (
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
    title: 'Est. Ship',
    width:100,
    dataIndex: 'dateEstShip',
  },
];
