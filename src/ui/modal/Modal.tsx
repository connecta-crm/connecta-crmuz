import { LoadingOutlined } from '@ant-design/icons';
import { useModal } from '../../context/ModalContext';
type onSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;

export default function Modal({
  title,
  children,
  isLoading,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: onSubmitType;
  isLoading: boolean;
}) {
  const { show, hideModal } = useModal();

  return (
    <>
      {show && (
        <div className={'modal'}>
          <div className="modal__content">
            <form onSubmit={onSubmit}>
              <div className="modal__header">
                <div className="modal__header__title">
                  {title ? title : '...'}
                </div>
                <div className="modal__header__btns">
                  <button
                    type="reset"
                    className="modal__cancel"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="modal__save">
                    {!isLoading ? 'Save' : <LoadingOutlined />}
                  </button>
                  {/* <Button type="primary" size="small"> Save </Button> */}
                  {/* <button className='modal__close modal__cancel'>Close</button> */}
                </div>
              </div>
              <div className="modal__body">{children}</div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
