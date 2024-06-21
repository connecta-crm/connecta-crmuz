import { LoadingOutlined } from '@ant-design/icons';
import { HistoryProps, NoteItemType } from '../history/History';
import HistoryCard from '../history/HistoryCard';

type TaskProps = HistoryProps;

function Task({ sourceType, attachments, isLoadingAttachments }: TaskProps) {
  const handleEditAttachment = (type: string, link: number) => {
    console.log(type, link);
  };

  const isLoadingNote = false;

  return isLoadingAttachments ? (
    <div className="text-center">
      <LoadingOutlined style={{ fontSize: 24 }} spin />
    </div>
  ) : attachments?.length ? (
    attachments.map((item: NoteItemType) => (
      <HistoryCard
        key={item.id}
        type={item.type}
        item={item}
        sourceType={sourceType}
        isLoading={isLoadingNote}
        onEdit={handleEditAttachment}
      />
    ))
  ) : (
    <p className="text-center" style={{ color: '#d1d1d1' }}>
      Empty task
    </p>
  );
}

export default Task;
