import { useSelector } from "react-redux";
import { Item } from "./Item";
import { filteredTasksSelector } from "src/store/taskSlice";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
  const isFiltering = useSelector(filteredTasksSelector);

  return (
    <ul className="task-list tasks">
      {items.map((item) => {
        if (isFiltering && !item.done) {
          return (
            <Item
              {...item}
              key={item.id}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          );
        } else if (!isFiltering) {
          return (
            <Item
              {...item}
              key={item.id}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          );
        }
      })}
    </ul>
  );
};
