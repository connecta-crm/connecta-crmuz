import { classNames } from '../../../utils/helpers';

type ArrowIconProps = {
  keyValue: string;
  openPanels: string[];
};
function ArrowIcon({ keyValue, openPanels }: ArrowIconProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        openPanels?.includes(keyValue) ? '_active -ml-25' : '',
        'box-header__arrow-bold cursor-inherit',
      )}
    >
      <img src="./img/drawer/down-arrow-bold.svg" alt="" />
    </div>
  );
}

export default ArrowIcon;
