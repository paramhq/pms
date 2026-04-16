import { icons } from "../icons";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function Header() {
  return (
    <header className="h-[56px] min-h-[56px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px]">
        <a
          href="#"
          className="text-text-tertiary hover:text-text-primary transition-colors"
        >
          Projects
        </a>
        <span className="text-gray-300">/</span>
        <a
          href="#"
          className="text-text-tertiary hover:text-text-primary transition-colors"
        >
          PMS
        </a>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-text-primary">Board</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2.5">
        {/* Search */}
        <div className="flex items-center gap-2 bg-surface rounded-lg border border-gray-200 px-3 h-9 w-[220px] focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
          <span className="text-text-tertiary">
            <Icon name="search" />
          </span>
          <input
            type="text"
            placeholder="Search issues..."
            className="bg-transparent border-none outline-none text-[13px] text-text-primary placeholder:text-text-tertiary w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-surface border border-gray-200 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
          <Icon name="bell" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Create */}
        <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold px-4 h-9 rounded-lg transition-colors shadow-sm">
          <Icon name="plus" />
          <span>Create Issue</span>
        </button>
      </div>
    </header>
  );
}
