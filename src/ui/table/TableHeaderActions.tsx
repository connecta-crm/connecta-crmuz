// import { useModal } from '../context/ModalContext';
import { classNames } from '../../utils/helpers';
import calendar from '/img/dt_table/calendar.svg';
import sell from '/img/dt_table/table_sells.svg';
import plus from '/img/plus_w.svg';

type TableHeaderActionsProps = {
  pageName: string;
  checkedRows: number[];
  onOpenModal: (a: boolean) => void;
};

function TableHeaderActions({
  pageName,
  checkedRows,
  onOpenModal,
}: TableHeaderActionsProps) {
  return (
    <div className="dt-header__actions">
      {!(checkedRows.length > 0) && (
        <div className="dt-header__tableicon cursor-not-allowed">
          <img src={sell} alt="" />
        </div>
      )}
      <div
        className={classNames(
          'dt-header__calendaricon cursor-not-allowed mr-10',
          !checkedRows.length ? 'ml-10' : '',
        )}
      >
        <img src={calendar} alt="" />
      </div>
      {checkedRows.length > 0 ? (
        <>
          <div
            className="dt-header__calendaricon dt-header__group-item ml-10"
            style={{ width: 'auto' }}
          >
            <img src="/img/dt_table/sms.svg" alt="" />
            <span className="ml-5 f-16">Send group SMS</span>
          </div>
          <div
            className="dt-header__calendaricon dt-header__group-item ml-10"
            style={{ width: 'auto' }}
          >
            <img src="/img/dt_table/email.svg" alt="" />
            <span className="ml-5 f-16">Send group email</span>
          </div>
          <div
            className="dt-header__calendaricon dt-header__group-item ml-10"
            style={{ width: 'auto' }}
          >
            <img src="/img/dt_table/customer.svg" alt="" />
            <span className="ml-5 f-16">Reassign</span>
          </div>
          <div
            className="dt-header__calendaricon dt-header__group-item ml-10 mr-10"
            style={{ width: 'auto' }}
          >
            <img style={{ height: 16 }} src="/img/dt_table/delete.svg" alt="" />
          </div>
        </>
      ) : (
        <button
          type="button"
          className="dt-header__add-btn btn--primary"
          onClick={() => onOpenModal(true)}
        >
          <img src={plus} alt="" />
          <span>New {pageName}</span>
        </button>
      )}
    </div>
  );
}

export default TableHeaderActions;
