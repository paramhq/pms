import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3c71ff",
      light: "#eef2ff",
      dark: "#1a44cc",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      disabled: "#9ca3af",
    },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    success: { main: "#10b981" },
    info: { main: "#3b82f6" },
    divider: "#e5e7eb",
  },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    fontSize: 13,
    h1: { fontSize: "1.25rem", fontWeight: 700 },
    h2: { fontSize: "1rem", fontWeight: 600 },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8125rem" },
    caption: { fontSize: "0.75rem" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#f5f6f8" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
        sizeSmall: { fontSize: "0.75rem", padding: "4px 10px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        sizeSmall: { fontSize: "0.6875rem", height: 24 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: { padding: 4 },
      },
    },
  },
});

// Custom tokens used across the app
export const sidebar = {
  width: 252,
  bg: "#0f1117",
  hover: "#1a1d2b",
  active: "rgba(60, 113, 255, 0.12)",
  border: "rgba(255, 255, 255, 0.06)",
  text: "#8b8fa3",
  textActive: "#ffffff",
} as const;

export const status = {
  todo: "#6b7280",
  in_progress: "#3b82f6",
  in_review: "#f59e0b",
  done: "#10b981",
} as const;

export const priority = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#6b7280",
} as const;

export const issueType = {
  story: "#10b981",
  bug: "#ef4444",
  task: "#3b82f6",
  subtask: "#8b5cf6",
} as const;
