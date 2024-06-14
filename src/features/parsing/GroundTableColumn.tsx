import { ParsingTableDataType } from './parsingTableDataType';

export const GroundTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Default',
    dataIndex: 'isDefault',
    render: (data: ParsingTableDataType) => <div>{data ? 'Yes' : 'No'}</div>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={status == 'active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'Created on',
    dataIndex: 'createdAt',
  },
  {
    title: 'Created by',
    dataIndex: 'createdByEmail',
  },
  {
    title: 'Last time edited on',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Las edited by',
    dataIndex: 'updatedFromEmail',
  },
];
