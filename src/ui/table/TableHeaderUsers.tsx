import { Dropdown, DropdownProps, MenuProps, Space, Spin } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUser } from '../../features/authentication/authSlice';
import {
  UserTeamsParams,
  useUserTeams,
} from '../../features/users/useUserTeams';
import { useAppSelector } from '../../store/hooks';
import { SourceType } from '../Drawer';
import ellipse from '/img/dt_table/ellipse.svg';

type TableHeaderUsersProps = {
  sourceType?: SourceType;
};

function TableHeaderUsers({ sourceType }: TableHeaderUsersProps) {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const type: UserTeamsParams =
    sourceType === 'lead'
      ? 'leads'
      : sourceType === 'order'
        ? 'orders'
        : sourceType === 'quote'
          ? 'quote'
          : undefined;

  const { userTeams, isLoading, error } = useUserTeams(type, open);
  const user = useAppSelector(getUser);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleChangeUserTeam = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    if (checked) {
      newSearchParams.append('user', value);
    } else {
      const filteredSources = newSearchParams
        .getAll('user')
        .filter((user) => user !== value);
      newSearchParams.delete('user'); // Remove all at once
      filteredSources.forEach((user) => newSearchParams.append('user', user));
    }

    setSearchParams(newSearchParams, { replace: true });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="dt-header__user-active d-flex align-center justify-between">
          <p>{user?.firstName + ' ' + user?.lastName} (me)</p>
          <span>{user?.id}</span>
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
            userTeams.map((team, index) => (
              <div key={index} className="mb-10">
                <p className="dropdown-subusername d-inline">{team.name}</p>
                <div className="dropdown-check">
                  {team.users.map((_user) => (
                    <div
                      key={_user.id}
                      className="dropdown-check__item d-flex align-center justify-between"
                    >
                      <input
                        type="checkbox"
                        name="source"
                        id={`user-${_user.id}`}
                        className="dropdown-check__input"
                        value={_user.id}
                        checked={searchParams
                          .getAll('user')
                          .includes(String(_user.id))}
                        onChange={handleChangeUserTeam}
                      />
                      <label
                        htmlFor={`user-${_user.id}`}
                        className="label-contents d-flex align-center justify-between"
                      >
                        <p className="dropdown-text">
                          {_user.firstName + ' ' + _user.lastName}
                        </p>
                        <span className="ml-20">{_user.count}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      ),
    },
  ];

  return (
    <div className="dt-header__users dt-header-select">
      <img className="dt-header-select_icon" src={ellipse} alt="" />
      <img
        className="dt-header-select_avater"
        src={user?.picture ?? '/img/empty-user.jpeg'}
        alt=""
      />
      <div className="dt-header__allsources_select">
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
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="dt-header__showlist_price">All users</p>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default TableHeaderUsers;
