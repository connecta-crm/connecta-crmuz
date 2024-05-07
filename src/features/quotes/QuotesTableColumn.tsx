import TableDropdown from "../../ui/TableDropdown";
export const QuotesTableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      render: (text: string) => <a className="table__id">{text}</a>,
    },
    {
      title: 'Quotes	',
      dataIndex: 'quotes',
    },
    {
      title: 'Note	',
      dataIndex: 'node',
      render: (text: string) => <TableDropdown text={text} />,
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
      dataIndex: 'customer',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: (text: string) => (
        <div className="table__phone">
          <img src="./img/dt_table/call.svg" alt="" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      render: () => (
        <div className="table__vehicle">
          <div className="table__vehicle__imgs">
            <img src="./img/dt_table/engine.svg" alt="engine" />
            <img src="./img/dt_table/trailer.svg" alt="trailer" />
          </div>
          <div className="table__vehicle__text">2022 Toyota Sienna</div>
        </div>
      ),
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
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
      dataIndex: 'ship',
    },
  ];