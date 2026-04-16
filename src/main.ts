import "./style.css";
import { icons } from "./icons";
import { columns, navItems, projects, type Issue, type Column } from "./data";

function icon(name: keyof typeof icons): string {
  return icons[name] ?? "";
}

function priorityIcon(priority: Issue["priority"]): string {
  const map = {
    critical: "criticalPriority",
    high: "highPriority",
    medium: "mediumPriority",
    low: "lowPriority",
  } as const;
  return icon(map[priority]);
}

function renderIssueCard(issue: Issue): string {
  return `
    <div class="group bg-surface-card rounded-lg border border-gray-100 p-3.5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-150 cursor-pointer">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-1.5">
          <span class="flex-shrink-0">${icon(issue.type)}</span>
          <span class="text-xs font-medium text-text-tertiary">${issue.id}</span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-gray-100 text-text-tertiary">
          ${icon("moreHorizontal")}
        </button>
      </div>

      <p class="text-sm font-medium text-text-primary leading-snug mb-3">${issue.title}</p>

      ${
        issue.labels
          ? `<div class="flex flex-wrap gap-1 mb-3">${issue.labels.map((l) => `<span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-brand-50 text-brand-600">${l}</span>`).join("")}</div>`
          : ""
      }

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="flex-shrink-0" title="${issue.priority} priority">${priorityIcon(issue.priority)}</span>
          ${issue.storyPoints ? `<span class="flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded bg-gray-100 text-text-secondary">${issue.storyPoints}</span>` : ""}
          ${issue.commentCount ? `<span class="flex items-center gap-0.5 text-text-tertiary">${icon("message")}<span class="text-[11px]">${issue.commentCount}</span></span>` : ""}
          ${issue.attachmentCount ? `<span class="flex items-center gap-0.5 text-text-tertiary">${icon("paperclip")}<span class="text-[11px]">${issue.attachmentCount}</span></span>` : ""}
        </div>
        <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style="background:${issue.assignee.color}" title="${issue.assignee.name}">
          ${issue.assignee.initials}
        </div>
      </div>
    </div>`;
}

function renderColumn(col: Column): string {
  return `
    <div class="flex flex-col min-w-[272px] w-[272px] max-h-full">
      <div class="flex items-center justify-between px-2 mb-3">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full" style="background:${col.dotColor}"></span>
          <span class="text-xs font-bold tracking-wider text-text-secondary">${col.title}</span>
          <span class="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-gray-100 text-text-tertiary">${col.issues.length}</span>
        </div>
        <button class="p-1 rounded hover:bg-gray-100 text-text-tertiary transition-colors">
          ${icon("plus")}
        </button>
      </div>
      <div class="flex flex-col gap-2.5 overflow-y-auto flex-1 pr-1 pb-2">
        ${col.issues.map(renderIssueCard).join("")}
      </div>
    </div>`;
}

function renderSidebar(): string {
  return `
  <aside class="w-[252px] min-w-[252px] bg-sidebar flex flex-col h-full border-r border-sidebar-border">
    <div class="flex items-center gap-2.5 px-5 pt-5 pb-5">
      <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
        ${icon("logo")}
      </div>
      <span class="text-lg font-bold text-white tracking-tight">ProjectHub</span>
    </div>

    <div class="h-px bg-sidebar-border mx-3"></div>

    <nav class="flex flex-col gap-0.5 px-3 py-4">
      ${navItems
        .map(
          (item) => `
        <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
          item.active
            ? "bg-sidebar-active text-white"
            : "text-sidebar-text hover:text-white hover:bg-sidebar-hover"
        }">
          <span class="${item.active ? "text-brand-500" : "text-sidebar-text"}">${icon(item.icon as keyof typeof icons)}</span>
          ${item.label}
        </a>`
        )
        .join("")}
    </nav>

    <div class="h-px bg-sidebar-border mx-3"></div>

    <div class="px-5 py-4 flex-1">
      <p class="text-[10px] font-semibold uppercase tracking-[1.5px] text-sidebar-text mb-3">Your Projects</p>
      <div class="flex flex-col gap-1">
        ${projects
          .map(
            (p) => `
          <a href="#" class="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
            p.active
              ? "text-white bg-sidebar-hover"
              : "text-sidebar-text hover:text-white hover:bg-sidebar-hover"
          }">
            <span class="w-2 h-2 rounded-sm flex-shrink-0" style="background:${p.color}"></span>
            <span class="truncate">${p.name}</span>
            <span class="text-[11px] text-sidebar-text ml-auto">${p.key}</span>
          </a>`
          )
          .join("")}
      </div>
    </div>

    <div class="h-px bg-sidebar-border mx-3"></div>

    <div class="flex items-center gap-2.5 px-5 py-4">
      <div class="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-[11px] font-bold text-white">SZ</div>
      <div class="flex flex-col min-w-0">
        <span class="text-[13px] font-semibold text-white truncate">Sukhdev Z.</span>
        <span class="text-[11px] text-sidebar-text">Admin</span>
      </div>
    </div>
  </aside>`;
}

function renderHeader(): string {
  return `
  <header class="h-[56px] min-h-[56px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
    <div class="flex items-center gap-1.5 text-[13px]">
      <a href="#" class="text-text-tertiary hover:text-text-primary transition-colors">Projects</a>
      <span class="text-gray-300">/</span>
      <a href="#" class="text-text-tertiary hover:text-text-primary transition-colors">PMS</a>
      <span class="text-gray-300">/</span>
      <span class="font-semibold text-text-primary">Board</span>
    </div>

    <div class="flex items-center gap-2.5">
      <div class="flex items-center gap-2 bg-surface rounded-lg border border-gray-200 px-3 h-9 w-[220px] focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
        <span class="text-text-tertiary">${icon("search")}</span>
        <input type="text" placeholder="Search issues..." class="bg-transparent border-none outline-none text-[13px] text-text-primary placeholder:text-text-tertiary w-full" />
      </div>

      <button class="relative p-2 rounded-lg bg-surface border border-gray-200 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors">
        ${icon("bell")}
        <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
      </button>

      <button class="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-semibold px-4 h-9 rounded-lg transition-colors shadow-sm">
        ${icon("plus")}
        <span>Create Issue</span>
      </button>
    </div>
  </header>`;
}

function renderSprintBar(): string {
  return `
  <div class="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold text-text-primary m-0">Sprint 14</h1>
      <div class="flex items-center gap-1.5 bg-surface rounded-full px-3 py-1">
        <span class="text-text-tertiary">${icon("calendar")}</span>
        <span class="text-xs font-medium text-text-secondary">Apr 7 \u2013 Apr 21, 2026</span>
      </div>
      <div class="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
        5 days left
      </div>
      <div class="flex items-center gap-2 ml-2">
        <div class="w-32 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div class="h-full rounded-full bg-brand-500" style="width: 58%"></div>
        </div>
        <span class="text-[11px] font-semibold text-text-secondary">58%</span>
      </div>
    </div>
    <button class="flex items-center gap-1.5 border border-gray-300 hover:border-gray-400 text-[13px] font-semibold text-text-secondary hover:text-text-primary px-4 py-1.5 rounded-lg transition-colors">
      Complete Sprint
    </button>
  </div>`;
}

function renderFilterBar(): string {
  const filters = [
    { label: "Assignee", active: false },
    { label: "Type", active: false },
    { label: "Priority", active: true },
    { label: "Label", active: false },
    { label: "Epic", active: false },
  ];

  return `
  <div class="flex items-center gap-2 px-6 py-3">
    <span class="text-text-tertiary mr-1">${icon("filter")}</span>
    ${filters
      .map(
        (f) => `
      <button class="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors ${
        f.active
          ? "bg-brand-50 text-brand-600 border-brand-200"
          : "bg-white text-text-secondary border-gray-200 hover:border-gray-300 hover:text-text-primary"
      }">
        ${f.label}
        ${icon("chevronDown")}
      </button>`
      )
      .join("")}
    <div class="w-px h-5 bg-gray-200 mx-1"></div>
    <button class="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-white text-text-secondary border border-gray-200 hover:border-gray-300 transition-colors">
      Group by: Status
      ${icon("chevronDown")}
    </button>
  </div>`;
}

function render(): void {
  const app = document.getElementById("app")!;
  app.innerHTML = `
    <div class="flex h-full">
      ${renderSidebar()}
      <main class="flex flex-col flex-1 min-w-0 bg-surface">
        ${renderHeader()}
        ${renderSprintBar()}
        ${renderFilterBar()}
        <div class="flex gap-4 px-6 pb-6 pt-2 flex-1 overflow-x-auto overflow-y-hidden">
          ${columns.map(renderColumn).join("")}
        </div>
      </main>
    </div>
  `;
}

render();
