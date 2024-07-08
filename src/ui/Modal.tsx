import { Button, FormInstance, Modal as ModalUI } from 'antd';
import { ReactNode } from 'react';

type ModalProps = {
  form?: FormInstance;
  title: string;
  loading?: boolean;
  open: boolean;
  width: 'small' | 'middle' | 'large';
  padding: '0' | '15';
  saveBtnDanger?: boolean;
  saveBtnText?: 'Save' | 'Archived' | string;
  hasSaveBtn?: boolean;
  extraBtnToHeader?: ReactNode;
  children: ReactNode;
  onSave?: () => void;
  onCancel: () => void;
  hasEdit?: boolean;
};

function Modal({
  form,
  title,
  open = false,
  loading,
  padding = '15',
  width = 'small',
  onSave,
  onCancel,
  extraBtnToHeader,
  saveBtnDanger = false,
  saveBtnText = 'Save',
  hasSaveBtn = true,
  children,
  hasEdit = false,
}: ModalProps) {
  const modalWidth = width === 'small' ? 420 : width === 'middle' ? 840 : 915;

  return (
    <ModalUI
      destroyOnClose={true}
      className="modal"
      title={
        <div className="modal__header">
          <h2>{title}</h2>
          <div>
            <Button size="small" disabled={loading} onClick={onCancel}>
              Cancel
            </Button>
            {!hasEdit && (
              <>
                {hasSaveBtn && form ? (
                  <Button
                    size="small"
                    type="primary"
                    className="ml-10"
                    disabled={loading}
                    loading={loading}
                    onClick={form.submit}
                    danger={saveBtnDanger}
                  >
                    {saveBtnText}
                  </Button>
                ) : (
                  <Button
                    size="small"
                    type="primary"
                    className="ml-10"
                    disabled={loading}
                    loading={loading}
                    onClick={onSave}
                    danger={saveBtnDanger}
                  >
                    {saveBtnText}
                  </Button>
                )}
              </>
            )}
            {extraBtnToHeader ? extraBtnToHeader : null}
          </div>
        </div>
      }
      open={open}
      width={modalWidth}
      footer={null}
      closable={false}
      maskClosable={false}
      afterClose={() => {}}
    >
      <div className="modal__body" style={{ padding: Number(padding) }}>
        {children}
      </div>
    </ModalUI>
  );
}

export default Modal;
