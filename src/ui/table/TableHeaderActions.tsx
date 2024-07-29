/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Dropdown, DropdownProps } from 'antd';
import { Key, useState } from 'react';
import { getUser } from '../../features/authentication/authSlice';
import { UsersTableDataType } from '../../features/users/usersTableDataType';
import { useUsers } from '../../features/users/useUsers';
import { useAppSelector } from '../../store/hooks';
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

  const currentUser = useAppSelector(getUser);

  const [isOpenUsers, setOpenUsers] = useState(false);
  const [isOpenReassignModal, setOpenReassignModal] = useState(false);
  const [reassignUserId, setReassignUserId] = useState(0);

  const {
    users,
    isLoading: isLoadingUsers,
    isFetchingUsers,
  } = useUsers(isOpenUsers);

  // USERS ITEMS
  const itemsUsers = [
    ...((users || []).filter((f: { isActive: boolean }) => f?.isActive)
      ? [
          {
            label: (
              <small className="pb-0 pt-0">Available users to re-assign</small>
            ),
            key: '4-02',
            type: 'group',
            children: (users || [])
              .filter((f: { isActive: boolean }) => f?.isActive)
              .map((user: UsersTableDataType) =>
                Number(user.id) !== Number(currentUser?.id)
                  ? {
                      key: '40-' + user.id,
                      label: (
                        <button
                          style={{ background: 'none' }}
                          // disabled={isLoadingUpdateUser}
                          onClick={() => {
                            setReassignUserId(user?.id);
                            setOpenUsers(false);
                            setOpenModal((prev) => ({
                              ...prev,
                              reassignModal: true,
                            }));
                          }}
                        >
                          {user.firstName + ' ' + user.lastName}
                        </button>
                      ),
                    }
                  : null,
              ),
          },
        ]
      : []),
  ];

  const handleOpenUsers: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenUsers(nextOpen);
    }
  };
  console.log('checkedTableRows', checkedTableRows);

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

            <Dropdown
              menu={{
                items: itemsUsers,
                selectable: false,
                defaultSelectedKeys: [''],
              }}
              placement="bottom"
              trigger={['click']}
              arrow={{ pointAtCenter: true }}
              open={isOpenUsers && !isLoadingUsers}
              destroyPopupOnHide={true}
              onOpenChange={handleOpenUsers}
              className={classNames(
                // feature === 'lead' ? 'lead-page' : '',
                'drawer-header__settings',
              )}
            >
              <div
                className="dt-header__calendaricon dt-header__group-item ml-10 d-flex align-center"
                style={{ width: 'auto' }}
              >
                <img src="/img/dt_table/customer.svg" alt="" />
                <span className="ml-5 f-16">Reassign</span>
                {isFetchingUsers && !users?.length && isOpenUsers && (
                  <LoadingOutlined className="ml-5" style={{ fontSize: 16 }} />
                )}
              </div>
            </Dropdown>
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
        ids={checkedTableRows}
        sourceType={sourceType}
        isOpenModal={isOpenModal.smsModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, smsModal: false }))
        }
      />
      <TableGroupEmailModal
        ids={checkedTableRows}
        sourceType={sourceType}
        isOpenModal={isOpenModal.emailModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, emailModal: false }))
        }
      />
      <TableReassignModal
        ids={checkedTableRows}
        isOpenModal={isOpenModal.reassignModal}
        sourceType={sourceType}
        reassignUserId={reassignUserId}
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
