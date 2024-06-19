import { LoadingOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { SourceType } from '../../../ui/Drawer';
import Notes from '../../../ui/Notes';
import { EndPointType, useCreateNote } from '../../attachments/useCreateNote';

type TabNotesProps = {
  user: number | undefined;
  sourceType: SourceType;
  sourceId: number;
};

function TabNotes({ user, sourceType, sourceId }: TabNotesProps) {
  const [note, setNote] = useState('');

  const { createNote, isLoading, error } = useCreateNote(
    sourceType as EndPointType,
  );

  const handleSave = () => {
    createNote({
      rel: sourceId,
      endpointType: sourceType as EndPointType,
      text: note,
      user,
    });
  };

  useEffect(() => {
    if (!isLoading && !error) {
      setNote('');
    }
  }, [isLoading, error]);

  return (
    <div>
      <Notes tabIndex={1} content={note} onSetContent={(val) => setNote(val)} />
      <Flex
        className="p-5"
        gap="small"
        wrap="wrap"
        style={{ backgroundColor: 'rgba(234, 234, 234, 1)' }}
      >
        <Button size="small" disabled={isLoading} onClick={() => setNote('')}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          disabled={isLoading}
          onClick={handleSave}
        >
          {isLoading ? (
            <>
              <span>
                Save <LoadingOutlined />
              </span>
            </>
          ) : (
            'Save'
          )}
        </Button>
      </Flex>
    </div>
  );
}

export default TabNotes;
