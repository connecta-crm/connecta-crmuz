import { Table } from 'antd';
import {
  InsightLeadsTableColumns,
  InsightLeadsTableData,
} from '../../utils/table';
import { TaskTableDataType } from '../tasks/TaskTableDataType';

function InsightTable() {
  return (
    <div className="insight__table table-insight">
      <p className="ml-5 f-16 font-bold mt-20 mb-10">Leads</p>
      <hr />
      <div className="table__container mt-0 radius-none">
        <Table
          rowKey="id"
          columns={InsightLeadsTableColumns}
          dataSource={
            InsightLeadsTableData as unknown as TaskTableDataType[] | undefined
          }
          // loading={loadingList || (loadingItem && !!guid)}
        />
      </div>
    </div>
  );
}

export default InsightTable;
