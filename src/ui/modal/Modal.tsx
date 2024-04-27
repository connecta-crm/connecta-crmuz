import { FormEvent } from 'react';
import { useModal } from '../../context/Modal';
type onSubmitType = (e: FormEvent) => void;

export default function Modal({
  title,
  children,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: onSubmitType;
}) {
  const { show, hideModal } = useModal();

  return (
    <div className={!show ? 'modal' : 'modal modal__active'}>
      <div className="modal__content">
        <form onSubmit={onSubmit}>
          <div className="modal__header">
            <div className="modal__header__title">{title ? title : '...'}</div>
            <div className="modal__header__btns">
              <button
                type="reset"
                className="modal__cancel"
                onClick={hideModal}
              >
                Cancel
              </button>
              <button type="submit" className="modal__save">
                Save
              </button>
              {/* <Button type="primary" size="small"> Save </Button> */}
              {/* <button className='modal__close modal__cancel'>Close</button> */}
            </div>
          </div>
          <div className="modal__body">{children}</div>
        </form>
      </div>
    </div>
  );
}
