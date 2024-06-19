/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import Modal from '../../../ui/Modal';
import Notes from '../../../ui/Notes';
import { EndPointType } from '../../attachments/useCreateNote';
import { useNote } from '../../attachments/useNote';
import { useUpdateNote } from '../../attachments/useUpdateNote';
import { getUser } from '../../authentication/authSlice';
import { CancelNotesActionType } from '../tabs/Tabs';
import HistoryCard from './HistoryCard';

export type NoteItemType = {
  createdAt: string;
  id: number;
  lead: number;
  link: number;
  marked: boolean;
  secondTitle: null;
  title: string;
  type: string;
  user: number;
};

type HistoryProps = {
  sourceType: SourceType;
  attachments: NoteItemType[];
  isLoadingAttachments: boolean;
};

function History({
  sourceType,
  attachments,
  isLoadingAttachments,
}: HistoryProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState(0);
  const [isNoteUpdated, setNoteUpdated] = useState(false);

  const user = useAppSelector(getUser);

  const { noteData, isLoadingNote, errorNote } = useNote(noteId);
  const { updateNote, isLoadingUpdateNote, errorUpdateNote } = useUpdateNote(
    sourceType as EndPointType,
  );

  const onSetContent = (_: CancelNotesActionType, val: string) => {
    setContent(val);
  };

  // * FILTER TO TYPE NOTE
  const notes =
    attachments?.filter(({ type }: { type: string }) => type === 'note') ?? [];

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleEditNote = (link: number) => {
    setNoteId(link);
  };

  const handleSave = () => {
    updateNote({
      id: noteId,
      user: user?.id,
      endpointType: sourceType as EndPointType,
      text: content,
    });
    setNoteUpdated(true);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: isLoadingAttachments ? (
        <div className="text-center">
          <LoadingOutlined style={{ fontSize: 24 }} spin />
        </div>
      ) : attachments?.length ? (
        attachments.map((item: NoteItemType) => (
          <HistoryCard
            key={item.id}
            type="note"
            item={item}
            sourceType={sourceType}
            isLoading={isLoadingNote}
            onEdit={handleEditNote}
          />
        ))
      ) : (
        <p className="text-center" style={{ color: '#d1d1d1' }}>
          Empty history
        </p>
      ),
    },
    {
      key: '2',
      label: `Notes (${notes.length})`,
      children: notes.map((item: NoteItemType) => (
        <HistoryCard
          key={item.id}
          type={'note'}
          item={item}
          sourceType={sourceType}
          isLoading={isLoadingNote}
          onEdit={handleEditNote}
        />
      )),
    },
    // {
    //   key: '3',
    //   label: 'Tasks (1)',
    //   children: (
    //     <HistoryCard
    //       type={'task'}
    //       sourceType={sourceType}
    //       onEdit={() => {}}
    //       isLoading={isLoadingNote}
    //     />
    //   ),
    // },
  ];

  useEffect(() => {
    if (noteData && Object.keys(noteData).length && noteId && !errorNote) {
      setContent(noteData.text);
      setModalOpen(true);
    }
  }, [noteData, noteId, errorNote]);

  useEffect(() => {
    if (isNoteUpdated && !isLoadingUpdateNote && !errorUpdateNote) {
      setModalOpen(false);
      setContent('');
      setNoteUpdated(false);
      setNoteId(0);
    }
  }, [isNoteUpdated, isLoadingUpdateNote, errorUpdateNote]);

  return (
    <div className="history">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Modal
        title="Edit Note"
        width="small"
        padding="0"
        loading={isLoadingUpdateNote}
        open={isModalOpen}
        onCancel={() => {
          setNoteId(0);
          setModalOpen(false);
        }}
        onSave={handleSave}
      >
        <Notes type="main" content={content} onSetContent={onSetContent} />
      </Modal>
    </div>
  );
}

export default History;
