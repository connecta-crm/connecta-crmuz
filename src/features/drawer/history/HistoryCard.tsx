import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Radio } from 'antd';
import { useState } from 'react';
import { useDeleteLeadAttachments } from '../../attachments/useDeleteLeadAttachments';
import { NoteItemType } from './History';

export type HistoryCardProps = {
  type: 'note' | 'task' | 'phone';
  isLoading: boolean;
  item?: NoteItemType;
  onEdit: (id: number) => void;
};
function HistoryCard({ type, item, isLoading, onEdit }: HistoryCardProps) {
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const { deleteLeadAttachments, isLoading: isLoadingDelete } =
    useDeleteLeadAttachments();

  if (!item) {
    return null;
  }

  const handleDeleteAttachment = () => {
    deleteLeadAttachments(item.id);
  };

  return (
    <div className="card mb-10">
      <div className="card__row">
        <div className="card__col">
          <div className="card__icon">
            <img src={`./img/drawer/tab/${type}.svg`} alt="" />
          </div>
        </div>
        <div className="card__col w-100">
          <div className="card__body">
            <div className="card__left">
              <div className="card__texts d-flex align-center mb-5">
                <div className="card__text">
                  <Radio>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.title || '' }}
                    />
                  </Radio>
                </div>
              </div>
              <div className="card__bottom d-flex align-center">
                <p>12.31.2024 at 3:40</p>
                <p>Ali Brain</p>
                <p>Call was scheduled on {item.createdAt}</p>
              </div>
            </div>
            <div className="card__right d-flex align-center">
              <p className="card__action">
                <img src="./img/drawer/extract.svg" alt="" />
              </p>
              <button
                title="edit-attachment"
                className="card__action"
                disabled={isLoading}
                onClick={() => onEdit(item.link)}
              >
                <img src="./img/drawer/pen.svg" alt="" />
              </button>
              <Popconfirm
                placement="top"
                title={`Delete this ${type} from the history?`}
                description={`Delete this ${type}`}
                okText={isLoadingDelete ? <LoadingOutlined /> : 'Yes'}
                cancelText="No"
                open={popconfirmOpen}
                onConfirm={handleDeleteAttachment}
                onCancel={() => setPopconfirmOpen(false)}
              >
                <button
                  title="delete"
                  className="card__action"
                  disabled={isLoadingDelete}
                  onClick={() => setPopconfirmOpen(true)}
                >
                  <img src="./img/drawer/delete-icon.svg" alt="" />
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
