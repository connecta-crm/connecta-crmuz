import { Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { useModal } from '../context/ModalContext';


const itemsUser: MenuProps['items'] = [
  {
    label: <p onClick={() => {}}>Profile</p>,
    key: '0',
  },
  {
    label: <p onClick={() => {}}>Calls</p>,
    key: '1',
  },
  {
    label: <p onClick={() => {}}>SMS</p>,
    key: '3',
  },
  {
    label: <p onClick={() => {}}>Log out</p>,
    key: '4',
  },
];
function HeaderActions({
  searchHandler,
}: {
  searchHandler: (text: string) => void;
}) {
  const [value, setValue] = useState('');
  const { showFilter, hideFilter } = useFilter();
   const {showModal} =  useModal()
  
const itemsCreate: MenuProps['items'] = [
  {
    label: <p onClick={() => showModal()}>Create a lead</p>,
    key: '0',
  },
  {
    label: <p onClick={() => {}}>Create a contact</p>,
    key: '1',
  },
  {
    label: <p onClick={() => {}}>Create a carrier</p>,
    key: '3',
  },
  {
    label: <p onClick={() => {}}>Create a task</p>,
    key: '4',
  },
];

  const getSearchValue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchHandler(value);
    showFilter();
  };

  return (
    <div className="header__actions">
      <div className="header__search">
        <form onSubmit={getSearchValue}>
          <input
            value={value}
            onChange={(e) => {
              if (!e.target.value) {
                searchHandler('');
                hideFilter();
              }
              setValue(e.target.value);
            }}
            type="search"
            placeholder="Search"
            className="input-search-big"
          />
        </form>
      </div>
      <Dropdown
        menu={{
          items: itemsCreate,
          selectable: false,
          defaultSelectedKeys: [''],
        }}
        trigger={['click']}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        // open={open}
        destroyPopupOnHide={true}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <div className="header__add cursor-pointer">
              <img src="./img/plus_circle.svg" alt="" />
            </div>
          </Space>
        </a>
      </Dropdown>

      <div className="header__lightblub">
        <img src="./img/lightbulb.svg" alt="" />
      </div>
      <Dropdown
        menu={{
          items: itemsUser,
          selectable: false,
          defaultSelectedKeys: [''],
        }}
        trigger={['click']}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        destroyPopupOnHide={true}
      >
        <a onClick={(e) => e.preventDefault()} style={{ marginRight: 18 }}>
          <Space>
            <div className="header__avatar">
              <img src="./img/main_user_img.svg" alt="" />
            </div>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default HeaderActions;
