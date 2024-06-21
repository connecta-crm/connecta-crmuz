/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Spin, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import Modal from '../../../ui/Modal';
import Notes from '../../../ui/Notes';
import { EndPointType } from '../../attachments/useCreateNote';
import { useNote } from '../../attachments/useNote';
import { useUpdateNote } from '../../attachments/useUpdateNote';
import { getUser } from '../../authentication/authSlice';
import HistoryCard from './HistoryCard';

export type NoteItemType = {
  createdAt: string;
  id: number;
  lead: number;
  link: number;
  marked: boolean;
  secondTitle: null;
  title: string;
  type: 'task' | 'note' | 'email';
  user: number;
};

export type HistoryProps = {
  sourceType: SourceType;
  attachments: NoteItemType[];
  isLoadingAttachments: boolean;
};

function History({
  sourceType,
  attachments: data,
  isLoadingAttachments,
}: HistoryProps) {
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [attachmentId, setAttachmentId] = useState(0);
  const [attachmentType, setAttachmentType] = useState('');
  const [isNoteUpdated, setNoteUpdated] = useState(false);

  const user = useAppSelector(getUser);

  const { noteData, isLoadingNote, errorNote } = useNote(
    attachmentId,
    attachmentType === 'note',
  );
  // const { noteData, isLoadingNote, errorNote } = useTask(attachmentId, attachmentType === 'task');
  const { updateNote, isLoadingUpdateNote, errorUpdateNote } = useUpdateNote(
    sourceType as EndPointType,
  );

  const onSetContent = (val: string) => {
    setContent(val);
  };

  const fakeData = [
    {
      id: 230,
      text: `Hi Francisco ! I was just wondering if you still need a transportation service. Please, reply to me with either “Yes” or “No”, so I can proceed with your request. 
Ali Brian call or text me at (973) 245-9373.`,
      createdAt: '2024-06-21T04:54:39.627Z',
      fromPhone: '(929) 999-9999',
      toPhone: ['string'],
      type: 'phone',
      user: 0,
    },
    {
      id: 332,
      text: 'Insurance',
      createdAt: '2024-06-21T04:54:39.627Z',
      file: 'string',
      type: 'file',
      user: 0,
    },
    {
      id: 3343432,
      text: 'Driver Prime Auto Transport PU today DEL tom (929) 929-2929',
      createdAt: '2024-06-21T04:54:39.627Z',
      file: 'string',
      type: 'note',
      user: 0,
    },
    {
      id: 443,
      text: 'Contract is sent',
      createdAt: '2024-06-21T04:54:39.627Z',
      type: 'contract',
      user: 'Ali Brian',
    },
    {
      id: 512,
      text: '$200 is paid by Zelle',
      createdAt: '2024-06-21T04:54:39.627Z',
      type: 'payment',
      user: 'Ali Brian',
    },
    {
      id: 643,
      text: 'Converted to order',
      createdAt: '2024-06-21T04:54:39.627Z',
      type: 'activity',
      user: 'Ali Brian',
    },
    {
      id: 754,
      text: 'Initial quote',
      createdAt: '2024-06-21T04:54:39.627Z',
      type: 'email',
      user: 'Ali Brian',
      fromEmail: 'brian@matelogisticss.com',
    },
    {
      id: 854,
      text: 'Need to call back, wants to speak with his wife',
      createdAt: '2024-06-21T04:54:39.627Z',
      type: 'task',
      user: 'Ali Brian',
      fromEmail: 'Call was scheduled on 12.31.2024 at 3:40 pm',
    },
  ];
  const attachments = data?.concat(fakeData);

  // * FILTER TO TYPE NOTE
  const typeNoteData =
    attachments?.filter(({ type }: { type: string }) => type === 'note') ?? [];
  const typeTaskData =
    attachments?.filter(({ type }: { type: string }) => type === 'task') ?? [];
  const typePhoneData =
    attachments?.filter(({ type }: { type: string }) => type === 'phone') ?? [];
  const typeEmailData =
    attachments?.filter(({ type }: { type: string }) => type === 'email') ?? [];
  const typeFileData =
    attachments?.filter(({ type }: { type: string }) => type === 'file') ?? [];
  const typeContractData =
    attachments?.filter(({ type }: { type: string }) => type === 'contract') ??
    [];
  const typePaymentData =
    attachments?.filter(({ type }: { type: string }) => type === 'payment') ??
    [];
  const typeActivityData =
    attachments?.filter(({ type }: { type: string }) => type === 'activity') ??
    [];

  const onChange = (key: string) => {
    console.log(key);
  };

  const handleEditAttachment = (type: string, link: number) => {
    setAttachmentType(type);
    setAttachmentId(link);
    switch (type) {
      case 'note':
        setNoteModalOpen(true);
        break;
      default:
        throw new Error('There is smth error in `handleEditAttachment`');
    }
  };

  const handleSave = () => {
    switch (attachmentType) {
      case 'note':
        updateNote({
          id: attachmentId,
          user: user?.id,
          endpointType: sourceType as EndPointType,
          text: content,
        });
        break;
      default:
        break;
    }

    setNoteUpdated(true);
  };

  console.log('attachments:', attachments);

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
            type={item.type}
            item={item}
            sourceType={sourceType}
            isLoading={isLoadingNote}
            onEdit={handleEditAttachment}
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
      label: `Note (${typeNoteData.length})`,
      children: typeNoteData.length ? (
        typeNoteData.map((item: NoteItemType) => (
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
          Empty Note
        </p>
      ),
    },
    {
      key: '3',
      label: `Tasks (${typeTaskData.length})`,
      children: typeTaskData.length ? (
        typeTaskData.map((item: NoteItemType) => (
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
          Empty Task
        </p>
      ),
    },
    {
      key: '4',
      label: `Phone (${typePhoneData.length})`,
      children: typePhoneData.length ? (
        typePhoneData.map((item: NoteItemType) => (
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
          Empty Phone
        </p>
      ),
    },
    {
      key: '5',
      label: `Email (${typeEmailData.length})`,
      children: typeEmailData.length ? (
        typeEmailData.map((item: NoteItemType) => (
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
          Empty Email
        </p>
      ),
    },
    ...(sourceType === 'quote' || sourceType === 'order'
      ? [
          {
            key: '6',
            label: `Files (${typeFileData.length})`,
            children: typeFileData.length ? (
              typeFileData.map((item: NoteItemType) => (
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
                Empty File
              </p>
            ),
          },
        ]
      : []),
    ...(sourceType === 'order'
      ? [
          {
            key: '7',
            label: `Contract (${typeContractData.length})`,
            children: typeContractData.length ? (
              typeContractData.map((item: NoteItemType) => (
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
                Empty Contract
              </p>
            ),
          },
        ]
      : []),
    ...(sourceType === 'order'
      ? [
          {
            key: '8',
            label: `Payment (${typePaymentData.length})`,
            children: typePaymentData.length ? (
              typePaymentData.map((item: NoteItemType) => (
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
                Empty Payment
              </p>
            ),
          },
        ]
      : []),
    {
      key: '9',
      label: `Activity (${typeActivityData.length})`,
      children: typeActivityData.length ? (
        typeActivityData.map((item: NoteItemType) => (
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
          Empty Activity
        </p>
      ),
    },
  ];

  useEffect(() => {
    if (
      noteData &&
      Object.keys(noteData).length &&
      attachmentId &&
      !errorNote
    ) {
      setContent(noteData.text);
    }
  }, [noteData, attachmentId, errorNote]);

  useEffect(() => {
    if (isNoteUpdated && !isLoadingUpdateNote && !errorUpdateNote) {
      setNoteModalOpen(false);
      setContent('');
      setNoteUpdated(false);
      setAttachmentId(0);
    }
  }, [isNoteUpdated, isLoadingUpdateNote, errorUpdateNote]);

  return (
    <div className="history">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Modal
        title="Edit Note"
        width="middle"
        padding="0"
        loading={isLoadingUpdateNote}
        open={isNoteModalOpen}
        onCancel={() => {
          setAttachmentId(0);
          setNoteModalOpen(false);
        }}
        onSave={handleSave}
      >
        {isLoadingNote ? (
          <p className="text-center py-10">
            <Spin />
          </p>
        ) : errorNote ? (
          <p className="text-center">Error in loading note</p>
        ) : (
          <Notes content={content} onSetContent={onSetContent} />
        )}
      </Modal>
    </div>
  );
}

export default History;
