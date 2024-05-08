import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { classNames } from '../../../utils/helpers';

type ArrowIconProps = {
  keyValue: string;
};
function ArrowIcon({ keyValue }: ArrowIconProps) {
  const { openInnerPanels } = useDrawerFeature();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        openInnerPanels?.includes(keyValue) ? '_active -ml-25' : '',
        'box-header__arrow-bold cursor-inherit',
      )}
    >
      <img src="./img/drawer/down-arrow-bold.svg" alt="" />
    </div>
  );
}

export default ArrowIcon;
