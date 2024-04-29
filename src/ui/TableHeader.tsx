import TableHeaderActions from './TableHeaderActions';
import TableHeaderFilters from './TableHeaderFilters';

function TableHeader({ pageName }: { pageName: string }) {
  return (
    <div className="dt-header">
      <TableHeaderActions pageName={pageName} />
      <TableHeaderFilters />
    </div>
  );
}

export default TableHeader;
