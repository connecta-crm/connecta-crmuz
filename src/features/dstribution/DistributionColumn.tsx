import { DistributionDataType } from './DistributionDataType';

export const DistributionColumn = [
  {
    title: 'Users',
    dataIndex: 'userEmail',
    render: (name: string, recored: DistributionDataType) => (
      <a className="table__id">{name ? name : recored?.id}</a>
    ),
  },
  {
    title: 'Received today',
    dataIndex: 'receivedToday',
  },
  {
    title: 'Queue now',
    dataIndex: 'queueNow',
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
    title: 'Multiple',
    dataIndex: 'multiple',
  },
  {
    title: 'Receiving hours',
    dataIndex: 'startHour',
    render: (startHour: string, recored: DistributionDataType) => (
      <span>{startHour} - {recored.finishHour}</span>
    ),
  },
  {
    title: 'Paused by',
    dataIndex: 'updatedFromEmail',
  },
];
