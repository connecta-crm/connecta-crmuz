import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLeadData, updateField } from '../leads/leadSlice';

function DrawerFeatureNotesContent({ isEditNotes }: { isEditNotes: boolean }) {
  const { notes } = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(updateField({ field: 'notes', value }));
  };

  return (
    <TextArea
      value={notes}
      onChange={handleChange}
      autoSize={{ minRows: 1, maxRows: 5 }}
      className="drawer__feature-notes mt-10"
      disabled={!isEditNotes}
    />
  );
}

export default DrawerFeatureNotesContent;
