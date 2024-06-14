export interface FieldsTableDataType {
  title: string;
  block: { blockName: string; data: { key: string; value: string }[] }[];
}
