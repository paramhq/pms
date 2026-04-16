import { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { EmptyState } from "@/components/EmptyState";
import { AssigneeAvatar } from "@/components/issues";
import { useNotificationState } from "@/hooks/useNotificationState";
import { MOCK_NOTIFICATIONS } from "@/data/mockNotifications";
import { MOCK_ASSIGNEES } from "@/data/mockIssues";
import { formatRelativeTime } from "@/lib/utils/relativeTime";
import { contentCardTokens, palette } from "@/theme";

export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, markAllAsRead, unreadCount } = useNotificationState(MOCK_NOTIFICATIONS);
  const assigneeMap = useMemo(() => new Map(MOCK_ASSIGNEES.map((a) => [a.id, a])), []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="h1">Notifications</Typography>
          {unreadCount > 0 && (
            <Box sx={{ bgcolor: palette.purple[600], color: "#fff", fontSize: 11, fontWeight: 700, px: 1, py: 0.25, borderRadius: 5, minWidth: 20, textAlign: "center" }}>
              {unreadCount}
            </Box>
          )}
        </Box>
        {unreadCount > 0 && (
          <Button size="small" startIcon={<DoneAllRoundedIcon />} onClick={markAllAsRead} sx={{ color: "text.secondary" }}>
            Mark all as read
          </Button>
        )}
      </Box>

      <Paper sx={{ borderRadius: `${contentCardTokens.borderRadius}px`, boxShadow: contentCardTokens.shadow, border: `1px solid ${contentCardTokens.border}`, overflow: "hidden" }}>
        {isLoading ? (
          <Box sx={{ p: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, py: 1.5, px: 1 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" sx={{ fontSize: 14 }} />
                  <Skeleton variant="text" width="30%" sx={{ fontSize: 12 }} />
                </Box>
              </Box>
            ))}
          </Box>
        ) : notifications.length === 0 ? (
          <EmptyState icon={NotificationsNoneRoundedIcon} title="No notifications" description="You're all caught up!" />
        ) : (
          <List disablePadding>
            {notifications.map((notif) => {
              const actor = assigneeMap.get(notif.actorId) ?? null;
              return (
                <ListItemButton
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    gap: 2,
                    borderBottom: `1px solid ${contentCardTokens.border}`,
                    bgcolor: notif.read ? "transparent" : palette.purple[50],
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  {/* Unread dot */}
                  <Box sx={{ width: 8, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                    {!notif.read && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: palette.purple[500] }} />}
                  </Box>

                  <AssigneeAvatar assignee={actor} size={32} />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 13, color: "text.primary" }}>
                      {notif.message}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "text.disabled", mt: 0.25 }}>
                      {notif.issueTitle}
                    </Typography>
                  </Box>

                  <Typography sx={{ fontSize: 12, color: "text.disabled", flexShrink: 0 }}>
                    {formatRelativeTime(notif.createdAt)}
                  </Typography>
                </ListItemButton>
              );
            })}
          </List>
        )}
      </Paper>
    </>
  );
}
