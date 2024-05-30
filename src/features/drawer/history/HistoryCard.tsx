import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Radio } from 'antd';
import { useState } from 'react';
import { SourceType } from '../../../ui/Drawer';
import { useDeleteLeadAttachments } from '../../attachments/useDeleteLeadAttachments';
import { useDeleteOrderAttachments } from '../../attachments/useDeleteOrderAttachments';
import { useDeleteQuoteAttachments } from '../../attachments/useDeleteQuoteAttachments';
import { NoteItemType } from './History';

export type HistoryCardProps = {
  type: 'note' | 'task' | 'phone';
  isLoading: boolean;
  sourceType: SourceType;
  item?: NoteItemType;
  onEdit: (id: number) => void;
};
function HistoryCard({
  type,
  item,
  sourceType,
  isLoading,
  onEdit,
}: HistoryCardProps) {
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const { deleteLeadAttachments, isLoadingDeleteAttachForLead } =
    useDeleteLeadAttachments();

  const { deleteQuoteAttachments, isLoadingDeleteAttachForQuote } =
    useDeleteQuoteAttachments();

  const { deleteOrderAttachments, isLoadingDeleteAttachForOrder } =
    useDeleteOrderAttachments();

  let isLoadingDelete = false;

  switch (sourceType) {
    case 'lead':
      isLoadingDelete = isLoadingDeleteAttachForLead;
      break;
    case 'quote':
      isLoadingDelete = isLoadingDeleteAttachForQuote;
      break;
    case 'order':
      isLoadingDelete = isLoadingDeleteAttachForOrder;
      break;
    default:
      break;
  }

  if (!item) {
    return null;
  }

  const handleDelete = () => {
    switch (sourceType) {
      case 'lead':
        deleteLeadAttachments(item.id);
        break;
      case 'quote':
        deleteQuoteAttachments(item.id);
        break;
      case 'order':
        deleteOrderAttachments(item.id);
        break;
      default:
        break;
    }
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
                onConfirm={handleDelete}
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
