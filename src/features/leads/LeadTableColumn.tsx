// =======Lead===========
export const LeadTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Received	',
      dataIndex: 'updatedAt',
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
      dataIndex: 'leadVehicles',
      render: (data: { vehicleName: string }[]) => (
        <div className="table__vehicle">
          {data.length > 0 && (
            <div className="table__vehicle__imgs">
              <img src="./img/dt_table/engine.svg" alt="engine" />
              <img src="./img/dt_table/trailer.svg" alt="trailer" />
            </div>
          )}
          <div className="table__vehicle__text">
            {data.map((item) => (
              <div key={item.vehicleName}>{item.vehicleName}</div>
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