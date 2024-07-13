import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Radio } from 'antd';
import parse from 'html-react-parser';
import { useState } from 'react';
import { SourceType } from '../../../ui/Drawer';
import { classNames } from '../../../utils/helpers';
import { useDeleteLeadAttachments } from '../../attachments/useDeleteLeadAttachments';
import { useDeleteOrderAttachments } from '../../attachments/useDeleteOrderAttachments';
import { useDeleteQuoteAttachments } from '../../attachments/useDeleteQuoteAttachments';
import { NoteItemType } from './History';

export type HistoryCardProps = {
  type: string;
  isLoading: boolean;
  sourceType: SourceType;
  item?: NoteItemType;
  onEdit: (type: string, id: number) => void;
};
function HistoryCard({
  type,
  item,
  sourceType,
  isLoading,
  onEdit,
}: HistoryCardProps) {
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    return <p className="text-center">Empty data</p>;
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

  const handleExtract = () => {
    setIsExpanded(!isExpanded);
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
              <div className="card__texts d-flex mb-5">
                <div
                  className={classNames(
                    isExpanded ? 'expanded' : '',
                    'card__text',
                  )}
                >
                  {type === 'task' ? (
                    <label className="d-flex" htmlFor={String(item.id)}>
                      <Radio
                        style={{ display: 'block' }}
                        id={String(item.id)}
                      />
                      <span>{item.title}</span>
                    </label>
                  ) : (
                    <span>{parse(item.title)}</span>
                  )}
                </div>
              </div>
              <div className="card__bottom d-flex align-center">
                <p>{item.createdAt ?? 'Unknown'}</p>
                <p>{item.user ?? 'Unknown'}</p>
                {type !== 'phone' && (
                  <p>Call was scheduled on {item.createdAt}</p>
                )}
              </div>
            </div>
            <div className="card__right d-flex align-center">
              {type === 'phone' && (
                <p
                  className="card__action w-auto"
                  style={{ color: '#666666', fontWeight: 400 }}
                >
                  Listen
                </p>
              )}
              {['email', 'contract', 'payment', 'activity'].includes(type) && (
                <p
                  className="card__action w-auto"
                  style={{ color: '#666666', fontWeight: 400 }}
                >
                  View
                </p>
              )}
              {!['contract', 'payment'].includes(type) && (
                <p onClick={handleExtract} className="card__action">
                  <img
                    src={`./img/drawer/${isExpanded ? 'extract-o' : 'extract'}.svg`}
                    alt=""
                  />
                </p>
              )}
              {['note', 'file'].includes(type) && (
                <>
                  <button
                    title="edit-attachment"
                    className="card__action"
                    disabled={isLoading}
                    onClick={() => onEdit(item.type, item.link)}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
