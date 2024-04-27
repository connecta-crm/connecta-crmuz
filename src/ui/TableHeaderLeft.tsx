import { useModal } from "../context/Modal";
import sell from "../../public/img/dt_table/table_sells.svg"
import calendar from "../../public/img/dt_table/calendar.svg"
import plus from "../../public/img/plus_w.svg"
function TableHeaderLeft({pageName}:{pageName:string}) {

  
  const {showModal } = useModal()
  
  return (
    <div className="dt-header__left">
      <div className="dt-header__tableicon cursor-pointer">
        <img src={sell} alt="" />
      </div>
      <div className="dt-header__calendaricon cursor-pointer">
        <img src={calendar} alt="" />
      </div>
      <button type="button" className="dt-header__add-btn btn--primary" onClick={showModal}>
        <img src={plus} alt="" />
        <span>New {pageName}</span>
      </button>
    </div>
  );
}

export default TableHeaderLeft;
