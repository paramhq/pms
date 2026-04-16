import type { NavigateFunction } from "react-router";
import type { SvgIconComponent } from "@mui/icons-material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export interface Command {
  id: string;
  label: string;
  section: "navigation" | "actions";
  icon: SvgIconComponent;
  keywords?: string[];
  shortcut?: string;
  execute: () => void;
}

export function buildCommands(navigate: NavigateFunction): Command[] {
  return [
    // Navigation
    {
      id: "nav-dashboard",
      label: "Go to Dashboard",
      section: "navigation",
      icon: HomeRoundedIcon,
      keywords: ["home", "overview", "my work"],
      shortcut: "G D",
      execute: () => navigate("/dashboard"),
    },
    {
      id: "nav-projects",
      label: "Go to Projects",
      section: "navigation",
      icon: FolderRoundedIcon,
      keywords: ["project", "list"],
      shortcut: "G P",
      execute: () => navigate("/projects"),
    },
    {
      id: "nav-issues",
      label: "Go to Issues",
      section: "navigation",
      icon: ViewListRoundedIcon,
      keywords: ["issue", "list", "table", "bugs", "tasks"],
      execute: () => navigate("/projects/PMS/issues"),
    },
    {
      id: "nav-backlog",
      label: "Go to Backlog",
      section: "navigation",
      icon: AssignmentRoundedIcon,
      keywords: ["backlog", "priority", "order"],
      shortcut: "G L",
      execute: () => navigate("/projects/PMS/backlog"),
    },
    {
      id: "nav-settings",
      label: "Go to Settings",
      section: "navigation",
      icon: SettingsRoundedIcon,
      keywords: ["settings", "preferences", "config"],
      shortcut: "G S",
      execute: () => navigate("/settings"),
    },
    {
      id: "nav-notifications",
      label: "Go to Notifications",
      section: "navigation",
      icon: NotificationsRoundedIcon,
      keywords: ["notifications", "alerts", "inbox"],
      execute: () => navigate("/notifications"),
    },
    // Actions
    {
      id: "action-create-issue",
      label: "Create Issue",
      section: "actions",
      icon: AddRoundedIcon,
      keywords: ["create", "new", "add", "issue", "bug", "task", "story"],
      shortcut: "C",
      execute: () => navigate("/projects/PMS/issues"),
    },
    {
      id: "action-search",
      label: "Search Issues",
      section: "actions",
      icon: SearchRoundedIcon,
      keywords: ["search", "find", "query"],
      execute: () => navigate("/projects/PMS/issues"),
    },
  ];
}
