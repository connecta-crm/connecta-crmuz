import { Dropdown, DropdownProps, MenuProps, Space, Spin } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUser } from '../../features/authentication/authSlice';
import {
  UserTeamsParams,
  useUserTeams,
} from '../../features/users/useUserTeams';
import { useAppSelector } from '../../store/hooks';
import { classNames } from '../../utils/helpers';
import { SourceType } from '../Drawer';
import ellipse from '/img/dt_table/ellipse.svg';

type TableHeaderUsersProps = {
  sourceType?: SourceType;
};

function TableHeaderUsers({ sourceType }: TableHeaderUsersProps) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const type: UserTeamsParams =
    sourceType === 'lead'
      ? 'leads'
      : sourceType === 'order'
        ? 'orders'
        : sourceType === 'quote'
          ? 'quote'
          : undefined;

  const { userTeams, isLoading, error } = useUserTeams(type, true);
  const currentUser = useAppSelector(getUser);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleChangeUserTeam = (userId: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const userParam = searchParams.get('user') || null;
    if (userParam) {
      if (userParam === String(userId)) {
        newSearchParams.delete('user');
      } else {
        newSearchParams.set('user', String(userId));
      }
    } else {
      newSearchParams.set('user', String(userId));
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  const findUserById = (userId) => {
    if (userTeams?.length) {
      for (const team of userTeams) {
        const user = team.users.find((user) => user.id === Number(userId));
        if (user) {
          return user;
        }
      }
      return null;
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          className={classNames(
            'dt-header__user-active d-flex align-center justify-between',
            searchParams.get('user') === String(currentUser?.id)
              ? 'active'
              : '',
          )}
          onClick={() => handleChangeUserTeam(currentUser?.id)}
        >
          <p>
            {(currentUser?.firstName ?? 'Unknown') +
              ' ' +
              (currentUser?.lastName ?? 'name')}{' '}
            (me)
          </p>
          <span>{findUserById(currentUser?.id)?.count}</span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <>
          {isLoading ? (
            <Spin size="small" className="d-flex align-center justify-center" />
          ) : error ? (
            <p className="error-color">Error loading teams</p>
          ) : (
            userTeams?.length &&
            (userTeams || []).map((team, index) => (
              <div key={index} className="mb-10">
                <p className="dropdown-subusername d-inline">{team.name}</p>
                <div className="dropdown-check">
                  {team.users.map((_user) =>
                    currentUser?.id === _user.id ? null : (
                      <div
                        key={_user.id}
                        onClick={() => handleChangeUserTeam(_user.id)}
                        className={classNames(
                          'dropdown-check__item d-flex align-center justify-between',
                          searchParams.get('user') === String(_user?.id)
                            ? 'active'
                            : '',
                        )}
                      >
                        <div className="label-contents d-flex align-center justify-between">
                          <p className="dropdown-text">
                            {_user.firstName + ' ' + _user.lastName}
                          </p>
                          <span className="ml-20">
                            {_user.count.toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))
          )}
        </>
      ),
    },
  ];

  return (
    <div className="dt-header-select ml-10">
      <Dropdown
        menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
        open={open}
        destroyPopupOnHide={true}
        overlayClassName="dt-header__dropdown"
        overlayStyle={{ width: 220 }}
        onOpenChange={handleOpenChange}
      >
        <a className="dt-header__users" onClick={(e) => e.preventDefault()}>
          <img className="dt-header-select_icon" src={ellipse} alt="" />
          <img
            className="dt-header-select_avater"
            src={
              findUserById(searchParams.get('user'))?.picture ||
              '/img/empty-user.jpeg'
            }
            alt=""
          />
          <Space>
            <p className="dt-header__showlist_price">
              {findUserById(searchParams.get('user'))?.firstName || 'All users'}
              {findUserById(searchParams.get('user'))?.id === currentUser?.id
                ? ' (me)'
                : ''}
            </p>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default TableHeaderUsers;
