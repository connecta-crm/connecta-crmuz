// import { useModal } from '../context/ModalContext';
import calendar from '/img/dt_table/calendar.svg';
import sell from '/img/dt_table/table_sells.svg';
import plus from '/img/plus_w.svg';

type TableHeaderActionsProps = {
  pageName: string;
  onOpenModal: (a: boolean) => void;
};

function TableHeaderActions({
  pageName,
  onOpenModal,
}: TableHeaderActionsProps) {
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
        onClick={() => onOpenModal(true)}
      >
        <img src={plus} alt="" />
        <span>New {pageName}</span>
      </button>
    </div>
  );
}

export default TableHeaderActions;
