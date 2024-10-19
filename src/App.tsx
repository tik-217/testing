import { store } from "./store/configureStore";

import "./styles.css";
import { NewTaskBar } from "./modules/NewTaskBar";
import { TaskList } from "./modules/TaskList";
import { Provider } from "react-redux";
import { NotifierContainer } from "./modules/NotifierContainer";
import { FilterTasks } from "src/modules/FilterTasks";

export const App = () => {
  return (
    <div className="root-container">
      <Provider store={store}>
        <h3>Список задач</h3>
        <NewTaskBar />
        <FilterTasks />
        <TaskList />
        <NotifierContainer />
      </Provider>
    </div>
  );
};
