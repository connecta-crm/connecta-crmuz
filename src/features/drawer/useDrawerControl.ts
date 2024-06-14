import { LeadData } from '../../models';
import { LeadTableDataType } from '../leads/LeadTableColumnType';
import { QuotesTableDataType } from '../quotes/QuoteTableColumnType';

export function getNextObjectId(
  array: LeadData | LeadTableDataType | QuotesTableDataType,
  currentItemGuid: string,
) {
  if (Array.isArray(array)) {
    const currentIndex = array.findIndex(
      (item: LeadData) => item.guid === currentItemGuid,
    );
    const nextIndex = currentIndex === array.length - 1 ? 0 : currentIndex + 1;
    return array[nextIndex]?.guid;
  }
}

export function getPreviousObjectId(
  array: LeadData | LeadTableDataType | QuotesTableDataType,
  currentItemGuid: string,
) {
  if (Array.isArray(array)) {
    const currentIndex = array.findIndex(
      (item: LeadData) => item.guid === currentItemGuid,
    );
    const previousIndex =
      currentIndex === 0 ? array.length - 1 : currentIndex - 1;
    return array[previousIndex]?.guid;
  }
}
