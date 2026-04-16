import { createTheme, alpha } from "@mui/material/styles";

// ─── Toggl-inspired purple palette ───
export const palette = {
  // Brand purple
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
  // Sidebar
  sidebar: {
    bg: "#1e1035",
    bgLight: "#291645",
    active: "#3b2066",
    border: "rgba(255,255,255,0.07)",
    text: "#a09bbf",
    textHover: "#d4cfe6",
    textActive: "#ffffff",
  },
  // Page
  page: {
    bg: "#f8f5fe",
    card: "#ffffff",
    cardBorder: "#ede9fe",
  },
} as const;

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.purple[600],
      light: palette.purple[100],
      dark: palette.purple[800],
      contrastText: "#fff",
    },
    background: {
      default: palette.page.bg,
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1035",
      secondary: "#6b6185",
      disabled: "#a09bbf",
    },
    error: { main: "#e11d48" },
    warning: { main: "#f59e0b" },
    success: { main: "#10b981" },
    info: { main: "#6366f1" },
    divider: "#e9e2f5",
  },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    fontSize: 13,
    h1: { fontSize: "1.25rem", fontWeight: 700, color: "#1a1035" },
    h2: { fontSize: "1rem", fontWeight: 600, color: "#1a1035" },
    body1: { fontSize: "0.875rem" },
    body2: { fontSize: "0.8125rem" },
    caption: { fontSize: "0.75rem", color: "#6b6185" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.page.bg,
          // Subtle warm gradient overlay
          backgroundImage: `radial-gradient(ellipse at top left, ${alpha(palette.purple[200], 0.15)} 0%, transparent 50%)`,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
        },
        sizeSmall: { fontSize: "0.8125rem", padding: "6px 14px" },
        contained: {
          background: `linear-gradient(135deg, ${palette.purple[500]} 0%, ${palette.purple[600]} 100%)`,
          "&:hover": {
            background: `linear-gradient(135deg, ${palette.purple[600]} 0%, ${palette.purple[700]} 100%)`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
        sizeSmall: { fontSize: "0.6875rem", height: 26 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none", // remove MUI default gradient overlay
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small", variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: palette.purple[400],
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: { padding: 6 },
      },
    },
  },
});

// Sidebar config
export const sidebarConfig = {
  width: 200,
} as const;

// Auth page tokens
export const authPageTokens = {
  bg: "#0e0a1a",
  gradientStart: "#1e1045",
  cardMaxWidth: 420,
  cardRadius: 20,
  cardShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
} as const;

// Content card tokens (Toggl pattern: white card on warm bg)
export const contentCardTokens = {
  borderRadius: 14,
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
  border: palette.page.cardBorder,
} as const;

// Status colors
export const statusColors = {
  todo: "#6b7280",
  in_progress: "#6366f1",
  in_review: "#f59e0b",
  done: "#10b981",
} as const;

// Priority colors
export const priorityColors = {
  critical: "#e11d48",
  high: "#f97316",
  medium: "#eab308",
  low: "#6b7280",
} as const;

// Issue type colors
export const issueTypeColors = {
  story: "#10b981",
  bug: "#e11d48",
  task: "#6366f1",
  subtask: "#a855f7",
} as const;
