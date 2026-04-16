import { useState } from "react";
import { icons } from "../icons";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

interface FilterChip {
  label: string;
  active: boolean;
}

export function FilterBar() {
  const [filters, setFilters] = useState<FilterChip[]>([
    { label: "Assignee", active: false },
    { label: "Type", active: false },
    { label: "Priority", active: true },
    { label: "Label", active: false },
    { label: "Epic", active: false },
  ]);

  const toggleFilter = (index: number) => {
    setFilters((prev) =>
      prev.map((f, i) => (i === index ? { ...f, active: !f.active } : f)),
    );
  };

  return (
    <div className="flex items-center gap-2 px-6 py-3">
      <span className="text-text-tertiary mr-1">
        <Icon name="filter" />
      </span>
      {filters.map((f, i) => (
        <button
          key={f.label}
          onClick={() => toggleFilter(i)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
            f.active
              ? "bg-brand-50 text-brand-600 border-brand-200"
              : "bg-white text-text-secondary border-gray-200 hover:border-gray-300 hover:text-text-primary"
          }`}
        >
          {f.label}
          <Icon name="chevronDown" />
        </button>
      ))}
      <div className="w-px h-5 bg-gray-200 mx-1" />
      <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white text-text-secondary border border-gray-200 hover:border-gray-300 transition-colors">
        Group by: Status
        <Icon name="chevronDown" />
      </button>
    </div>
  );
}
