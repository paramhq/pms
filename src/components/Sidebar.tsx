import { NavLink } from "react-router";
import { icons } from "../icons";
import { navItems, projects } from "../data";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

export function Sidebar() {
  return (
    <aside className="w-[252px] min-w-[252px] bg-sidebar flex flex-col h-full border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-5">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
          <Icon name="logo" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">
          ProjectHub
        </span>
      </div>

      <div className="h-px bg-sidebar-border mx-3" />

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 px-3 py-4">
        {navItems.map((item) => {
          const to =
            item.label === "Board"
              ? "/board"
              : `/${item.label.toLowerCase()}`;
          return (
            <NavLink
              key={item.label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-active text-white"
                    : "text-sidebar-text hover:text-white hover:bg-sidebar-hover"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={
                      isActive ? "text-brand-500" : "text-sidebar-text"
                    }
                  >
                    <Icon name={item.icon as keyof typeof icons} />
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="h-px bg-sidebar-border mx-3" />

      {/* Projects */}
      <div className="px-5 py-4 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-sidebar-text mb-3">
          Your Projects
        </p>
        <div className="flex flex-col gap-1">
          {projects.map((p) => (
            <a
              key={p.key}
              href="#"
              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                p.active
                  ? "text-white bg-sidebar-hover"
                  : "text-sidebar-text hover:text-white hover:bg-sidebar-hover"
              }`}
            >
              <span
                className="w-2 h-2 rounded-sm flex-shrink-0"
                style={{ background: p.color }}
              />
              <span className="truncate">{p.name}</span>
              <span className="text-[11px] text-sidebar-text ml-auto">
                {p.key}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="h-px bg-sidebar-border mx-3" />

      {/* User */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-[11px] font-bold text-white">
          SZ
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-white truncate">
            Sukhdev Z.
          </span>
          <span className="text-[11px] text-sidebar-text">Admin</span>
        </div>
      </div>
    </aside>
  );
}
