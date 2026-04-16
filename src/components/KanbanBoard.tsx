import { icons } from "../icons";
import { columns } from "../data";
import { IssueCard } from "./IssueCard";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function KanbanBoard() {
  return (
    <div className="flex gap-4 px-6 pb-6 pt-2 flex-1 overflow-x-auto overflow-y-hidden">
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex flex-col min-w-[272px] w-[272px] max-h-full"
        >
          {/* Column header */}
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: col.dotColor }}
              />
              <span className="text-xs font-bold tracking-wider text-text-secondary">
                {col.title}
              </span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-gray-100 text-text-tertiary">
                {col.issues.length}
              </span>
            </div>
            <button className="p-1 rounded hover:bg-gray-100 text-text-tertiary transition-colors">
              <Icon name="plus" />
            </button>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 pr-1 pb-2">
            {col.issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
