import CheckButton from './CheckButton';
import plus from '/img/plus_w.svg';

type TableHeaderActionsProps = {
  pageName?: string;
  onOpenModal?: (a: boolean) => void;
  hasActions?: boolean;
  hasAddBtn?: boolean;
};

function SettingsTableHeaderActions({
  pageName,
  onOpenModal,
  hasActions = true,
  hasAddBtn = true,
}: TableHeaderActionsProps) {
  return (
    <div className="dt-header__actions">
      <h2 className="dt-header__page-name">{pageName ? pageName : ''}</h2>
      {hasAddBtn && (
        <button
          type="button"
          className="dt-header__add-btn btn--primary"
          onClick={() => onOpenModal && onOpenModal(true)}
        >
          <img src={plus} alt="" />
          <span>New</span>
        </button>
      )}

      {hasActions && (
        <div className="dt-header__actions-btns">
          <CheckButton type="status" title="active" />
          <CheckButton type="status" title="inactive" />
        </div>
      )}
    </div>
  );
}

export default SettingsTableHeaderActions;
