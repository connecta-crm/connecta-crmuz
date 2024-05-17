import { LoadingOutlined } from '@ant-design/icons';
import { Button, FormInstance, Modal as ModalUI } from 'antd';
import { ReactNode } from 'react';

type ModalProps = {
  form?: FormInstance;
  title: string;
  loading: boolean;
  open: boolean;
  width: 'small' | 'middle' | 'large';
  padding: '0' | '15';
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
            {form ? (
              <Button
                size="small"
                type="primary"
                className="ml-10"
                disabled={loading}
                onClick={form.submit}
              >
                {!loading ? (
                  'Save'
                ) : (
                  <>
                    Save <LoadingOutlined />
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
              >
                {!loading ? (
                  'Save'
                ) : (
                  <>
                    Save <LoadingOutlined />
                  </>
                )}
              </Button>
            )}
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
