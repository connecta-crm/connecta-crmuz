import { LeadTableDataType } from '../leads/LeadTableColumnType';
import { LeadData } from '../leads/leadSlice';

export function getNextObjectId(
  array: LeadData | LeadTableDataType,
  currentItemGuid: string,
) {
  if (Array.isArray(array)) {
    const currentIndex = array.findIndex(
      (item: LeadData) => item.guid === currentItemGuid,
    );
    const nextIndex = currentIndex === array.length - 1 ? 0 : currentIndex + 1;
    return array[nextIndex].guid;
  }
}

export function getPreviousObjectId(
  array: LeadData | LeadTableDataType,
  currentItemGuid: string,
) {
  if (Array.isArray(array)) {
    const currentIndex = array.findIndex(
      (item: LeadData) => item.guid === currentItemGuid,
    );
    const previousIndex =
      currentIndex === 0 ? array.length - 1 : currentIndex - 1;
    return array[previousIndex].guid;
  }
}
