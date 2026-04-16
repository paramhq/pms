import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import type { AlertColor } from "@mui/material/Alert";

interface ToastMessage {
  id: string;
  severity: AlertColor;
  message: string;
  duration: number;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((severity: AlertColor, message: string, duration = 4000) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => {
      const next = [...prev, { id, severity, message, duration }];
      return next.length > 3 ? next.slice(-3) : next;
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      success: (msg: string) => addToast("success", msg),
      error: (msg: string) => addToast("error", msg),
      info: (msg: string) => addToast("info", msg),
      warning: (msg: string) => addToast("warning", msg),
    }),
    [addToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1400,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </Box>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Alert
        severity={toast.severity}
        variant="filled"
        onClose={() => onRemove(toast.id)}
        sx={{
          pointerEvents: "auto",
          borderRadius: 3,
          minWidth: 320,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {toast.message}
      </Alert>
    </Slide>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
