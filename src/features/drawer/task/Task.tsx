import HistoryCard from '../history/HistoryCard';

function Task() {
  return (
    <HistoryCard
      isLoading={false}
      onEdit={(num: number) => {
        console.log(num);
      }}
      type="task"
    />
  );
}

export default Task;
