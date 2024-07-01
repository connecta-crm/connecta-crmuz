function Table() {
  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th className="table__checkbox">
              <input type="checkbox" />
            </th>
            <th>Id</th>
            <th>Received</th>
            <th className="table__user">User</th>
            <th>Node</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Vehicle</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Est. Ship</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <span className="table__id">600009</span>
            </td>
            <td>03/25/2024 03:00 PM</td>
            <td>
              <div className="table__img__container">
                <img
                  src="./img/dt_table/default_user_image.png"
                  alt=""
                  className="table__user__img"
                />
              </div>
            </td>
            <td>
              <div className="table__node">
                <div className="table__node__data">
                  <img src="./img/dt_table/nodeimg.png" alt="" />
                  <div className="table__node__count">
                    <span>25</span>
                    <div className="table__node__modal">
                      <div className="table__node__content">
                        {/* <textarea cols={40} rows={4} className="table__node__textarea"></textarea>
                            <div className="table__node__footer">
                                <button type="button" className="table__node__info">Cancel</button>
                                <button type="button" className="table__node__primary">Save</button>
                            </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>Ali Brian</td>
            <td>
              <div className="table__phone">
                <img src="./img/dt_table/call.svg" alt="" />
                <span>(999) 999-9999</span>
              </div>
            </td>{' '}
            <td>
              <div className="table__vehicle">
                <div className="table__vehicle__imgs">
                  <img src="./img/dt_table/engine.svg" alt="engine" />
                  <img src="./img/dt_table/trailer.svg" alt="trailer" />
                </div>
                <div className="table__vehicle__text">2022 Toyota Sienna</div>
              </div>
            </td>
            <td>California, CA 91101</td>
            <td>Maine, ME 04735</td>
            <td>2024-03-26</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
