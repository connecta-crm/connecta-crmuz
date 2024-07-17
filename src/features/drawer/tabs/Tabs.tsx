import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import { getUser } from '../../authentication/authSlice';
import { getLeadData } from '../../leads/leadSlice';
import { getOrderData } from '../../orders/orderSlice';
import { getQuoteData } from '../../quotes/quoteSlice';
import TabContract from './TabContract';
import TabEmail from './TabEmail';
import TabFiles from './TabFiles';
import TabNotes from './TabNotes';
import TabPayment from './TabPayment';
import TabPhone from './TabPhone';
import TabTask from './TabTask';

export type CancelNotesActionType = 'main' | 'phone' | 'task' | 'email';

function TabsApp({ sourceType }: DrawerSourceType) {
  const userData = useAppSelector(getUser);
  const user = userData?.id ? Number(userData?.id) : undefined;
  const userEmail = userData?.email ? userData?.email : undefined;
  const {
    isEditTab,
    toolbarTabActiveKey,
    onEditTab,
    onChangeToolbarTabActiveKey,
  } = useDrawerFeature();

  const {
    id: leadId,
    customerPhone: customerLeadPhone,
    customer: customerLead,
  } = useAppSelector(getLeadData);
  const {
    id: quoteId,
    customerPhone: customerQuotePhone,
    customer: customerQuote,
  } = useAppSelector(getQuoteData);
  const {
    id: orderId,
    customerPhone: customerOrderPhone,
    customer: customerOrder,
    guid: orderGuid,
  } = useAppSelector(getOrderData);

  let customerPhone = '',
    sourceId: number | undefined = undefined,
    customer,
    customerEmail;
  switch (sourceType) {
    case 'lead':
      customerPhone = customerLeadPhone;
      sourceId = Number(leadId);
      customer = customerLead;
      customerEmail = customerLead?.email;
      break;
    case 'quote':
      customerPhone = customerQuotePhone;
      sourceId = Number(quoteId);
      customer = customerQuote;
      customerEmail = customerQuote?.email;
      break;
    case 'order':
      customerPhone = customerOrderPhone;
      sourceId = Number(orderId);
      customer = customerOrder;
      customerEmail = customerOrder?.email;
      break;
    default:
      throw new Error('There is something error in Tabs.tsx');
  }

  const tabIcon = (key: string, icon: string) => {
    const iconPath = toolbarTabActiveKey === key ? `${icon}_a` : icon;

    return (
      <img
        className="tab-icon"
        src={`./img/drawer/tab/${iconPath}.svg`}
        alt="icon"
      />
    );
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox offsetBottom={20} style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
    </StickyBox>
  );

  const tabData = [
    {
      key: '1',
      label: 'Notes',
      value: 'notes',
      icon: tabIcon('1', 'note'),
      children:
        toolbarTabActiveKey !== '1' || isEditTab ? (
          <TabNotes user={user} sourceId={sourceId} sourceType={sourceType} />
        ) : (
          <div onClick={() => onEditTab(true)} className="tab-click-here">
            Click here to type, @name...
          </div>
        ),
    },
    {
      key: '2',
      label: 'Task',
      value: 'task',
      icon: tabIcon('2', 'task'),
      children: (
        <TabTask
          user={user}
          customer={customer}
          sourceId={sourceId}
          sourceType={sourceType}
        />
      ),
    },
    {
      key: '3',
      label: 'Phone',
      value: 'phone',
      icon: tabIcon('3', 'phone'),
      children: (
        <TabPhone
          user={user}
          sourceId={sourceId}
          sourceType={sourceType}
          customerPhone={customerPhone}
        />
      ),
    },
    {
      key: '4',
      label: 'Email',
      value: 'email',
      icon: tabIcon('4', 'email'),
      children: (
        <TabEmail
          user={user}
          sourceId={sourceId}
          userEmail={userEmail}
          sourceType={sourceType}
          customerEmail={customerEmail}
        />
      ),
    },
    ...(sourceType === 'quote' || sourceType === 'order'
      ? [
          {
            key: '5',
            label: 'Files',
            value: 'files',
            icon: tabIcon('5', 'file'),
            children: (
              <TabFiles
                user={user}
                sourceId={sourceId}
                sourceType={sourceType}
              />
            ),
          },
        ]
      : []),
    ...(sourceType === 'order'
      ? [
          {
            key: '6',
            label: 'Contract',
            value: 'contract',
            icon: tabIcon('6', 'contract'),
            children: <TabContract order={orderGuid} />,
          },
        ]
      : []),
    ...(sourceType === 'order'
      ? [
          {
            key: '7',
            label: 'Payment',
            value: 'payment',
            icon: tabIcon('7', 'payment'),
            children: <TabPayment orderId={sourceId} orderGuid={orderGuid} />,
          },
        ]
      : []),
  ];

  const items = tabData.map(({ key, label, value, icon, children }) => {
    return {
      label,
      key,
      children,
      // style: i === 0 ? { height: 200 } : undefined,
      icon,
      value,
    };
  });

  return (
    <div className="tabs">
      <Tabs
        defaultActiveKey="1"
        type="card"
        renderTabBar={renderTabBar}
        items={items}
        activeKey={toolbarTabActiveKey}
        tabBarExtraContent={
          (toolbarTabActiveKey !== '1' || isEditTab) && (
            <p
              style={{ width: 38 }}
              className="d-flex justify-center align-center cursor-pointer"
              onClick={() => {
                onEditTab(false);
                onChangeToolbarTabActiveKey('1');
              }}
            >
              <img src="/img/drawer/tab/close-x.svg" alt="" />
            </p>
          )
        }
        onChange={(key) => onChangeToolbarTabActiveKey(key)}
      />
    </div>
  );
}

export default TabsApp;
