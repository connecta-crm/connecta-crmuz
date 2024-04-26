import type { CollapseProps } from 'antd';
import { Button, Collapse } from 'antd';
import { useState } from 'react';
import DetailInner from './DrawerDetailInner';
import { DrawerContentHead, IconArrow } from './DrawerFeatures';
import DrawerPerson from './DrawerPerson';

type BoxHeaderType = {
  keyValue: string;
  label: string;
  value: string;
  onChange: (e: string) => void;
};
function Detail() {
  const [openPanels, setOpenPanels] = useState<string[]>([]);

  const BoxHeader = ({ keyValue, label, value, onChange }: BoxHeaderType) => {
    const Content = () => {
      let element = null;

      switch (value) {
        case 'detail':
          element = (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('CD Price');
                }}
                type="primary"
                size="small"
                danger
              >
                CD Price
              </Button>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(keyValue);
                  console.log('Edit');
                }}
                className="box-header__edit ml-10"
              >
                <img src="./img/drawer/pen.svg" alt="" />
              </div>
            </>
          );
          break;
        case 'person':
          element = (
            <>
              <div className="box-header__edit ml-10" onClick={() => {}}>
                <img src="./img/drawer/pen.svg" alt="" />
              </div>
              <div className="box-header__more ml-10">
                <img src="./img/drawer/more-2.svg" alt="" />
              </div>
            </>
          );
          break;
        case 'other':
          element = 'other';
          break;
      }

      return element;
    };

    return (
      <DrawerContentHead label={label}>
        <Content />
      </DrawerContentHead>
    );
  };

  const onChange = (key: string | string[]) => {
    const keyString = Array.isArray(key) ? key[0] : key;
    setOpenPanels(
      openPanels.includes(keyString)
        ? openPanels.filter((item) => item !== keyString)
        : [...openPanels, keyString],
    );
  };

  const onChangeCollapse = (panelKey: string[] | string) => {
    if (Array.isArray(panelKey)) {
      setOpenPanels(panelKey);
    } else {
      setOpenPanels((currentPanels) => {
        const currentSet = new Set(currentPanels);
        if (currentSet.has(panelKey)) {
          currentSet.delete(panelKey);
        } else {
          currentSet.add(panelKey);
        }
        return Array.from(currentSet);
      });
    }
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <BoxHeader
          keyValue={'1'}
          label="Details"
          value="detail"
          onChange={onChange}
        />
      ),
      children: <DetailInner />,
    },
    {
      key: '2',
      label: (
        <BoxHeader
          keyValue={'2'}
          label="Person"
          value="person"
          onChange={onChange}
        />
      ),
      children: <DrawerPerson />,
    },
  ];

  return (
    <Collapse
      activeKey={openPanels}
      onChange={onChangeCollapse}
      ghost
      collapsible="header"
      expandIcon={IconArrow}
      items={items}
    />
  );
}

export default Detail;
