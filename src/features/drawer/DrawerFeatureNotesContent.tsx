/* eslint-disable @typescript-eslint/no-unused-vars */
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SourceType } from '../../ui/Drawer';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../leads/leadSlice';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../quotes/quoteSlice';

type DrawerFeatureNotesContentProps = {
  isEditNotes: boolean;
  sourceType: SourceType;
};

function DrawerFeatureNotesContent({
  isEditNotes,
  sourceType,
}: DrawerFeatureNotesContentProps) {
  const { notes: notesLead } = useAppSelector(getLeadData);
  const { notes: notesQuote } = useAppSelector(getQuoteData);
  const dispatch = useAppDispatch();

  let notes;
  switch (sourceType) {
    case 'lead':
      notes = notesLead;
      break;
    case 'quote':
      notes = notesQuote;
      break;
    default:
      break;
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    switch (sourceType) {
      case 'lead':
        dispatch(updateLeadField({ field: 'notes', value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field: 'notes', value }));
        break;
      default:
        break;
    }
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
