/* eslint-disable @typescript-eslint/no-unused-vars */
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import InsightChart from './InsightChart';
import InsightFilter from './InsightFilter';
import InsightTable from './InsightTable';

function InsightMain() {
  return (
    <div className="insight__main">
      <div className="dt-header mb-10 align-baseline">
        <div className="dt-header__actions">
          <h2 className="insight__title font-bold">New lead created</h2>
        </div>
        <TableHeaderFilters
          count={0}
          sumPrice={undefined}
          sourceType="insight"
        />
      </div>

      <InsightFilter />
      <InsightChart />
      <InsightTable />
    </div>
  );
}

export default InsightMain;
