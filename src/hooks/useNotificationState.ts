import { useState, useCallback, useMemo, useEffect } from "react";
import type { Notification } from "@/types/notification";

export function useNotificationState(initial: Notification[]) {
  const [notifications, setNotifications] = useState<Notification[]>(initial);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  return { notifications, isLoading, markAsRead, markAllAsRead, unreadCount };
}
