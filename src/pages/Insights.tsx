import InsightMain from '../features/insights/InsightMain';
import InsightSidebar from '../features/insights/InsightSidebar';

function Insights() {
  return (
    <div className="insight">
      <InsightSidebar />
      <InsightMain />
    </div>
  );
}

export default Insights;
