import { icons } from "../icons";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function SprintBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-text-primary m-0">Sprint 14</h1>
        <div className="flex items-center gap-1.5 bg-surface rounded-full px-3 py-1">
          <span className="text-text-tertiary">
            <Icon name="calendar" />
          </span>
          <span className="text-xs font-medium text-text-secondary">
            Apr 7 – Apr 21, 2026
          </span>
        </div>
        <div className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
          5 days left
        </div>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-32 h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500"
              style={{ width: "58%" }}
            />
          </div>
          <span className="text-[11px] font-semibold text-text-secondary">
            58%
          </span>
        </div>
      </div>
      <button className="flex items-center gap-1.5 border border-gray-300 hover:border-gray-400 text-[13px] font-semibold text-text-secondary hover:text-text-primary px-4 py-1.5 rounded-lg transition-colors">
        Complete Sprint
      </button>
    </div>
  );
}
