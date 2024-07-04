/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collapse } from 'antd';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import DrawerArrowIcon from '../../drawer/DrawerArrowIcon';
import DrawerFeatureRow from '../../drawer/DrawerFeatureRow';
import FeatItemLabel from '../../drawer/feature-details/FeatItemLabel';
import FeatVehicleInner from '../../drawer/feature-details/FeatVehicleInner';
import {
  fetchQuoteConvertData,
  getQuoteConvertData,
} from '../quoteConvertSlice';

function ConvertVehicleItems() {
  const quoteConvertData = useAppSelector(getQuoteConvertData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuoteConvertData());
  }, [dispatch]);

  const vehiclesList = useMemo(
    () => quoteConvertData?.quoteVehicles,
    [quoteConvertData?.quoteVehicles],
  );

  const renderVehicles = useMemo(() => {
    return vehiclesList?.map((vehicle, index: number) => ({
      key: String(index + 20),
      label: (
        <div className="detail detail-origin detail-convert">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel
              label={index === 0 ? 'Vehicle' : `Vehicle #${index + 1}`}
              icon="car"
            />
            <div
              onClick={(e) => e.stopPropagation()}
              className="box-header__arrow-bold cursor-inherit"
            >
              <img src="./img/drawer/down-arrow-bold.svg" alt="" />
            </div>
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatVehicleInner
            feature="quote/convert"
            vehicleIndex={index}
            vehicleItem={vehicle}
          />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    }));
  }, [vehiclesList]);

  return (
    <Collapse
      ghost
      collapsible="header"
      defaultActiveKey={['1', '20', '21', '22', '23']}
      expandIcon={DrawerArrowIcon}
      items={renderVehicles}
      className="convert-vehicle__inner"
    />
  );
}

export default ConvertVehicleItems;
