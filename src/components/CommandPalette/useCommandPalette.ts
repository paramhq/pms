import { createContext, useContext } from "react";

export interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const CommandPaletteContext =
  createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx)
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider",
    );
  return ctx;
}
