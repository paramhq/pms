import type { SxProps, Theme } from "@mui/material/styles";
import type { SvgIconComponent } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { palette } from "@/theme";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined" | "text";
}

interface EmptyStateProps {
  icon: SvgIconComponent;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  compact?: boolean;
  sx?: SxProps<Theme>;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact,
  sx,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: compact ? 4 : 8,
        px: 3,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: compact ? 56 : 80,
          height: compact ? 56 : 80,
          borderRadius: "50%",
          bgcolor: palette.purple[50],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ fontSize: compact ? 28 : 40, color: palette.purple[300] }} />
      </Box>
      <Typography
        sx={{
          fontSize: compact ? 14 : 16,
          fontWeight: 600,
          color: "text.primary",
          mt: 2.5,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            fontSize: 13,
            color: "text.secondary",
            mt: 0.75,
            textAlign: "center",
            maxWidth: 320,
          }}
        >
          {description}
        </Typography>
      )}
      {action && (
        <Button
          variant={action.variant ?? "contained"}
          size="small"
          onClick={action.onClick}
          sx={{ mt: 2.5 }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}
