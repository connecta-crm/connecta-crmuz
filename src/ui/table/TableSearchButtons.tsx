
export default function TableSearchButtons() {
  return (
    <div className="inbox__header">
      <div className="inbox__left">
        <span className="inbox__left__text">All</span>
        <ul className="inbox__menu">
          <li>
            <div className="inbox__menu__item">
              <img src="./img/phone.svg" alt="" />
              <span>Call</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <img src="./img/phone.svg" alt="" />
              <span>Email</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <img src="./img/phone.svg" alt="" />
              <span>Task</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <img src="./img/phone.svg" alt="" />
              <span>Deadline</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <img src="./img/phone.svg" alt="" />
              <span>Payment</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="inbox__right">
        <ul className="inbox__menu">
          <li>
            <div className="inbox__menu__item inbox__right__active">
              <span>To-Do</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>Due</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>Today</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>Tomorrow</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>This week</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>Next week</span>
            </div>
          </li>
          <li>
            <div className="inbox__menu__item">
              <span>Select a period</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
