import { LoadingOutlined } from '@ant-design/icons';
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
}: ModalProps) {
  const modalWidth = width === 'small' ? 420 : width === 'middle' ? 840 : 915;

  return (
    <ModalUI
      className="modal"
      title={
        <div className="modal__header">
          <h2>{title}</h2>
          <div>
            <Button size="small" onClick={onCancel}>
              Cancel
            </Button>
            {hasSaveBtn && form ? (
              <Button
                size="small"
                type="primary"
                className="ml-10"
                disabled={loading}
                onClick={form.submit}
                danger={saveBtnDanger}
              >
                {!loading ? (
                  saveBtnText
                ) : (
                  <>
                    saveBtnText <LoadingOutlined />
                  </>
                )}
              </Button>
            ) : (
              <Button
                size="small"
                type="primary"
                className="ml-10"
                disabled={loading}
                onClick={onSave}
                danger={saveBtnDanger}
              >
                {!loading ? (
                  saveBtnText
                ) : (
                  <>
                    saveBtnText <LoadingOutlined />
                  </>
                )}
              </Button>
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
