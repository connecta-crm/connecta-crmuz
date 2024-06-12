export interface ParsingTableDataType {
  id: string;
  name: string;
  items: {
    id: string;
    name: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
}
