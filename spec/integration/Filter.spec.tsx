import { render, screen } from "@testing-library/react";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import { TaskList } from "src/modules/TaskList";
import userEvent from "@testing-library/user-event";
import { NewTaskBar } from "src/modules/NewTaskBar";
import { FilterTasks } from "src/modules/FilterTasks";

describe("Список задач", () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(
      <>
        <NewTaskBar />
        <FilterTasks />
        <TaskList />
      </>,
      {
        wrapper: JestStoreProvider,
      }
    );

    const user = userEvent.setup({ delay: null });

    const filterBtnEl = screen.getByTestId("filterTasksBtn");
    const addTaskBtnEl = screen.getByAltText("Добавить");
    const inputTask = screen.getByTestId("input-field");

    // добавление задач в список
    await user.type(inputTask, "New task");
    await user.click(addTaskBtnEl);

    await user.type(inputTask, "New task 2");
    await user.click(addTaskBtnEl);

    // все checkbox задач
    const allTasksCheckboxes = screen.getAllByRole("checkbox");

    // выполнение одной задачи
    await user.click(allTasksCheckboxes[0]);
    // await user.click(allTasksCheckboxes[1]);

    // фильтрации задач
    await user.click(filterBtnEl);

    // новый список всех checkbox
    const allCheckedTasks = screen.getAllByRole("checkbox");

    // проверка, что все checkbox невыполненны
    const isCheckedTasks = allCheckedTasks.every((el) => {
      return !el.hasAttribute("checked");
    });

    expect(isCheckedTasks).toBeTruthy();
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(
      <>
        <NewTaskBar />
        <FilterTasks />
        <TaskList />
      </>,
      {
        wrapper: JestStoreProvider,
      }
    );
    const user = userEvent.setup({ delay: null });

    const filterBtnEl = screen.getByTestId("filterTasksBtn");

    // фильтрации задач
    await user.click(filterBtnEl);
    await user.click(filterBtnEl);

    // новый список всех checkbox
    const allCheckedTasks = screen.getAllByRole("checkbox");

    expect(allCheckedTasks.length).toBe(1);
  });
});
