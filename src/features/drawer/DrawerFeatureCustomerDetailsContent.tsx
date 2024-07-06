import type { CollapseProps } from 'antd';
import { Collapse, Input } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { getCustomerData } from '../customers/customerSlice';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';

function DrawerFeatureCustomerDetailsContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const customerData = useAppSelector(getCustomerData);

  let data;

  switch (sourceType) {
    case 'customer':
      data = customerData;
      break;
    default:
      throw new Error('Type error: DrawerFeatureCustomerDetailsContent.tsx');
  }

  if (!data) {
    return null;
  }

  const items: CollapseProps['items'] = [
    {
      key: '10',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Name" icon="accounting" />
            {openInnerPanels?.includes('10') ? (
              <FeatItemOpen
                keyValue="10"
                feature={sourceType}
                featureItemField="name"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="10"
                tooltip={true}
                label={data.name}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '11',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Company" icon="company" />
            {openInnerPanels?.includes('11') ? (
              <FeatItemOpen
                keyValue="11"
                feature={sourceType}
                featureItemField="company" // todo rename or create company property in customerData
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="11"
                tooltip={true}
                label={data?.company}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '122',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Email" icon="email-b" />
            {openInnerPanels?.includes('122') ? (
              <FeatItemOpen
                keyValue="122"
                feature={sourceType}
                featureItemField="email"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="122"
                tooltip={true}
                label={data?.email}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '13',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Phone" icon="phone-b" />
            {openInnerPanels?.includes('13') ? (
              <FeatItemOpen
                keyValue="13"
                feature={sourceType}
                featureItemField="phone"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="13"
                tooltip={true}
                label={data?.phone || '-'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '14',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Fax" icon="fax-b" />
            {openInnerPanels?.includes('14') ? (
              <FeatItemOpen
                keyValue="14"
                feature={sourceType}
                featureItemField="fax"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="14"
                tooltip={true}
                label={data?.fax || '-'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
      className: 'mb-20',
    },
    {
      key: '15',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Completed" icon="completed" />
            {openInnerPanels?.includes('15') ? (
              <FeatItemOpen
                keyValue="15"
                feature={sourceType}
                featureItemField="completed"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="15"
                tooltip={true}
                label={data?.completed || '-'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '16',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Ongoing" icon="ongoing" />
            {openInnerPanels?.includes('16') ? (
              <FeatItemOpen
                keyValue="16"
                feature={sourceType}
                featureItemField="ongoing"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="16"
                tooltip={true}
                label={data?.ongoing || '-'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '17',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Uncompleted" icon="uncompleted" />
            {openInnerPanels?.includes('17') ? (
              <FeatItemOpen
                keyValue="17"
                feature={sourceType}
                featureItemField="uncompleted"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="17"
                tooltip={true}
                label={data?.uncompleted || '-'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
      className: 'mb-20',
    },
    {
      key: '18',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Open tasks" icon="insurance" />
            {openInnerPanels?.includes('18') ? (
              <FeatItemOpen
                keyValue="18"
                feature={sourceType}
                featureItemField="tasks"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="18"
                tooltip={true}
                label={data?.tasks || '0'}
                editable={false}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
    {
      key: '19',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Source" icon="link-b" />
            {openInnerPanels?.includes('19') ? (
              <FeatItemOpen
                keyValue="19"
                feature={sourceType}
                featureItemField="source"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="19"
                tooltip={true}
                label={data?.source || '-'}
                editable={false}
                textWithBg={data?.source}
              />
            )}
          </div>
        </div>
      ),
      showArrow: false,
    },
  ];

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={items}
      />
      <div className="d-flex mb-15 mt-5 px-20">
        <div className="w-100">
          <div className="form-label pl-0">Note about the customer</div>
          <Input
            value={data?.note}
            defaultValue={data?.note}
            size="small"
            style={{ width: '100%', float: 'inline-end', height: 24 }}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default DrawerFeatureCustomerDetailsContent;
