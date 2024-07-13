import { Collapse, CollapseProps } from 'antd';
import { useState } from 'react';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import InsightGoalModal from './InsightGoalModal';

function InsightSidebar() {
  const [isOpenModal, setOpenModal] = useState(false);
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const itemsGoalActive: CollapseProps['items'] = [
    {
      key: '1',
      label: <p className="font-bold cl-grey">Active</p>,
      children: (
        <p className="d-flex align-center">
          <img width={22} src="/img/insight/dollar.svg" alt="icon" />
          <span className="ml-5 font-bold cl-grey">January sales plan</span>
        </p>
      ),
      className: 'insight__collapse--inner',
    },
    {
      key: '2',
      label: <p className="font-bold cl-grey">Inactive</p>,
      children: (
        <p className="d-flex align-center">
          <img width={22} src="/img/insight/dollar.svg" alt="icon" />
          <span className="ml-5 font-bold cl-grey">February sales plan</span>
        </p>
      ),
      className: 'insight__collapse--inner',
    },
  ];

  const itemsGoalReport: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="d-flex justify-between">
          <div className="box-header__label">Goal</div>
          <div
            className="box-header__add"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
          >
            <img src="./img/plus_bold.svg" alt="" />
          </div>
        </div>
      ),
      children: (
        <Collapse
          ghost
          items={itemsGoalActive}
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIconPosition="end"
        />
      ),
      className: 'insight__collapse mb-5',
    },
    {
      key: '2',
      label: <div className="box-header__label">Report</div>,
      children: (
        <>
          <ul className="mb-20">
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">Sales</span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">Finance</span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">
                Cost per order (CPO)
              </span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">Shipping by type</span>
            </li>
          </ul>
          <ul>
            <li className="insight__item d-flex align-center active">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">New lead created</span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">
                Lead source conversion
              </span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey"> Quote conversion</span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">Order conversion</span>
            </li>
            <li className="insight__item d-flex align-center">
              <img width={22} src="/img/insight/dollar.svg" alt="icon" />
              <span className="ml-5 font-bold cl-grey">Lost by reason</span>
            </li>
          </ul>
        </>
      ),
      className: 'insight__collapse',
    },
  ];
  return (
    <div className="insight__sidebar">
      <Collapse
        ghost
        items={itemsGoalReport}
        defaultActiveKey={['1', '2']}
        onChange={onChange}
        expandIcon={DrawerArrowIcon}
      />
      <InsightGoalModal
        isOpenModal={isOpenModal}
        onCancelModal={() => setOpenModal(false)}
      />
    </div>
  );
}

export default InsightSidebar;
