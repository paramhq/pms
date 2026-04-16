import { SprintBar } from "../components/SprintBar";
import { FilterBar } from "../components/FilterBar";
import { KanbanBoard } from "../components/KanbanBoard";

export function BoardPage() {
  return (
    <>
      <SprintBar />
      <FilterBar />
      <KanbanBoard />
    </>
  );
}
