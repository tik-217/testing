import { useDispatch } from "react-redux";
import { isFilteringTasks } from "src/store/taskSlice";

export function FilterTasks() {
  const dispatch = useDispatch();

  function filterTasks() {
    dispatch(isFilteringTasks());
  }

  return (
    <button data-testid="filterTasksBtn" onClick={() => filterTasks()}>
      Фильтрация
    </button>
  );
}
