import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { palette } from "@/theme";

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: string | number;
  children: ReactNode;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
}

export function DetailPanel({
  open,
  onClose,
  title,
  width = "55%",
  children,
  actions,
  sx,
}: DetailPanelProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={200}
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(0,0,0,0.3)" } },
        paper: {
          sx: {
            width,
            maxWidth: 900,
            borderRadius: "14px 0 0 14px",
            display: "flex",
            flexDirection: "column",
            ...sx,
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderBottom: `1px solid ${palette.page.cardBorder}`,
          flexShrink: 0,
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: "text.secondary" }}>
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: "auto", px: 3, py: 2.5 }}>
        {children}
      </Box>

      {/* Actions (optional) */}
      {actions && (
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: `1px solid ${palette.page.cardBorder}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          {actions}
        </Box>
      )}
    </Drawer>
  );
}
