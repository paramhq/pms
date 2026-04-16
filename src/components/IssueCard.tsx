import { icons } from "../icons";
import type { Issue } from "../data";

function Icon({ name }: { name: keyof typeof icons }) {
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} />;
}

const priorityIconMap = {
  critical: "criticalPriority",
  high: "highPriority",
  medium: "mediumPriority",
  low: "lowPriority",
} as const;

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="group bg-surface-card rounded-lg border border-gray-100 p-3.5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all duration-150 cursor-pointer">
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="flex-shrink-0">
            <Icon name={issue.type} />
          </span>
          <span className="text-xs font-medium text-text-tertiary">
            {issue.id}
          </span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-gray-100 text-text-tertiary">
          <Icon name="moreHorizontal" />
        </button>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-text-primary leading-snug mb-3">
        {issue.title}
      </p>

      {/* Labels */}
      {issue.labels && (
        <div className="flex flex-wrap gap-1 mb-3">
          {issue.labels.map((label) => (
            <span
              key={label}
              className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-brand-50 text-brand-600"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0" title={`${issue.priority} priority`}>
            <Icon name={priorityIconMap[issue.priority]} />
          </span>
          {issue.storyPoints != null && (
            <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded bg-gray-100 text-text-secondary">
              {issue.storyPoints}
            </span>
          )}
          {issue.commentCount != null && (
            <span className="flex items-center gap-0.5 text-text-tertiary">
              <Icon name="message" />
              <span className="text-[11px]">{issue.commentCount}</span>
            </span>
          )}
          {issue.attachmentCount != null && (
            <span className="flex items-center gap-0.5 text-text-tertiary">
              <Icon name="paperclip" />
              <span className="text-[11px]">{issue.attachmentCount}</span>
            </span>
          )}
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ background: issue.assignee.color }}
          title={issue.assignee.name}
        >
          {issue.assignee.initials}
        </div>
      </div>
    </div>
  );
}
