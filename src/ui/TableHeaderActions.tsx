import calendar from '../../public/img/dt_table/calendar.svg';
import sell from '../../public/img/dt_table/table_sells.svg';
import plus from '../../public/img/plus_w.svg';
import { useModal } from '../context/ModalContext';

function TableHeaderActions({ pageName }: { pageName: string }) {
  const { showModal } = useModal();

  return (
    <div className="dt-header__actions">
      <div className="dt-header__tableicon cursor-not-allowed">
        <img src={sell} alt="" />
      </div>
      <div className="dt-header__calendaricon cursor-not-allowed">
        <img src={calendar} alt="" />
      </div>
      <button
        type="button"
        className="dt-header__add-btn btn--primary"
        onClick={showModal}
      >
        <img src={plus} alt="" />
        <span>New {pageName}</span>
      </button>
    </div>
  );
}

export default TableHeaderActions;
