import { Dropdown, MenuProps, Space } from 'antd';
import CheckButton from './CheckButton';
import hamburg from '/img/dt_table/hamburg_menu.svg';
import ellipse from '/img/dt_table/ellipse.svg';

export type TableHeaderFiltersProps = {
  count?: number;
  hasFilterSelect?: boolean;
  hasFilterBtn?: boolean;
  pagename?: string;
  typesData?:MenuProps['items']};
function SettingsTableHeaderFilters({
  count = 4,
  hasFilterSelect = true,
  hasFilterBtn = true,
  pagename,
  typesData=[]
}: TableHeaderFiltersProps) {
  const items: MenuProps['items'] = typesData;
  return (
    <div className="dt-header__filters">
      {hasFilterBtn && (
        <div className="dt-header__filter-btns">
          <CheckButton type="type" title="standard" />
          <CheckButton type="type" title="exclusive" />
        </div>
      )}
      {hasFilterSelect && <>
        <div className="dt-header__allsources dt-header-select">
      <img className="dt-header-select_icon" src={ellipse} alt="" />
      <div className="dt-header__allsources_select">
        <Dropdown
          
          menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          destroyPopupOnHide={true}
          overlayClassName="dt-header__dropdown"
          // open={true}
          // onOpenChange={}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="dt-header__showlist_price">All types</p>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
      </>}
      <div className="dt-header__data-count">
        Total {count} {pagename}
      </div>
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default SettingsTableHeaderFilters;
