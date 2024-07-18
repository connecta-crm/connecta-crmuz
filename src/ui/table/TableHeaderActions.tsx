/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useState } from 'react';
import { classNames } from '../../utils/helpers';
import { SourceType } from '../Drawer';
import TableArchieveModal from './TableArchieveModal';
import TableGroupEmailModal from './TableGroupEmailModal';
import TableGroupSMSModal from './TableGroupSMSModal';
import TableReassignModal from './TableReassignModal';
import calendar from '/img/dt_table/calendar.svg';
import sell from '/img/dt_table/table_sells.svg';
import plus from '/img/plus_w.svg';

type TableHeaderActionsProps = {
  pageName: string;
  sourceType?: SourceType;
  checkedTableRows?: Key[];
  onOpenModal: (a: boolean) => void;
};

function TableHeaderActions({
  sourceType,
  pageName,
  checkedTableRows,
  onOpenModal,
}: TableHeaderActionsProps) {
  const [isOpenModal, setOpenModal] = useState({
    smsModal: false,
    emailModal: false,
    reassignModal: false,
    archieveModal: false,
  });

  return (
    <>
      <div className="dt-header__actions">
        {checkedTableRows && !(checkedTableRows.length > 0) && (
          <div className="dt-header__tableicon cursor-not-allowed">
            <img src={sell} alt="" />
          </div>
        )}
        <div
          className={classNames(
            'dt-header__calendaricon cursor-not-allowed mr-10',
            checkedTableRows && !checkedTableRows.length ? 'ml-10' : '',
          )}
        >
          <img src={calendar} alt="" />
        </div>
        {checkedTableRows && checkedTableRows.length > 0 ? (
          <>
            <div
              className="dt-header__calendaricon dt-header__group-item ml-10"
              style={{ width: 'auto' }}
              onClick={() =>
                setOpenModal((prev) => ({ ...prev, smsModal: true }))
              }
            >
              <img src="/img/dt_table/sms.svg" alt="" />
              <span className="ml-5 f-16">Send group SMS</span>
            </div>
            <div
              className="dt-header__calendaricon dt-header__group-item ml-10"
              style={{ width: 'auto' }}
              onClick={() =>
                setOpenModal((prev) => ({ ...prev, emailModal: true }))
              }
            >
              <img src="/img/dt_table/email.svg" alt="" />
              <span className="ml-5 f-16">Send group email</span>
            </div>
            <div
              className="dt-header__calendaricon dt-header__group-item ml-10"
              style={{ width: 'auto' }}
              onClick={() =>
                setOpenModal((prev) => ({ ...prev, reassignModal: true }))
              }
            >
              <img src="/img/dt_table/customer.svg" alt="" />
              <span className="ml-5 f-16">Reassign</span>
            </div>
            <div
              className="dt-header__calendaricon dt-header__group-item ml-10 mr-10"
              style={{ width: 'auto' }}
              onClick={() =>
                setOpenModal((prev) => ({ ...prev, archieveModal: true }))
              }
            >
              <img
                style={{ height: 16 }}
                src="/img/dt_table/delete.svg"
                alt=""
              />
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

      <TableGroupSMSModal
        isOpenModal={isOpenModal.smsModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, smsModal: false }))
        }
      />
      <TableGroupEmailModal
        isOpenModal={isOpenModal.emailModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, emailModal: false }))
        }
      />
      <TableReassignModal
        isOpenModal={isOpenModal.reassignModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, reassignModal: false }))
        }
      />
      <TableArchieveModal
        feature={sourceType}
        isOpenModal={isOpenModal.archieveModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, archieveModal: false }))
        }
      />
    </>
  );
}

export default TableHeaderActions;
