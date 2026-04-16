import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { palette } from "@/theme";
import { buildCommands, type Command } from "./commands";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function matchesQuery(command: Command, query: string): boolean {
  if (!query) return true;
  const haystack = [command.label, ...(command.keywords ?? [])].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((term) => haystack.includes(term));
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(() => buildCommands(navigate), [navigate]);

  const filtered = useMemo(
    () => commands.filter((cmd) => matchesQuery(cmd, query)),
    [commands, query],
  );

  // Group by section
  const sections = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const cmd of filtered) {
      const list = map.get(cmd.section) ?? [];
      list.push(cmd);
      map.set(cmd.section, list);
    }
    return map;
  }, [filtered]);

  // Flat list for keyboard navigation
  const flatList = useMemo(() => filtered, [filtered]);

  // Reset on open/query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const executeCommand = useCallback(
    (cmd: Command) => {
      cmd.execute();
      onClose();
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(flatList.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatList.length) % Math.max(flatList.length, 1));
      } else if (e.key === "Enter" && flatList[activeIndex]) {
        e.preventDefault();
        executeCommand(flatList[activeIndex]);
      }
    },
    [flatList, activeIndex, executeCommand],
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let flatIndex = 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        transition: { timeout: 150 },
        backdrop: { sx: { bgcolor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" } },
        paper: {
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            mt: "15vh",
            alignSelf: "flex-start",
          },
        },
      }}
    >
      {/* Search input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          py: 1.75,
          borderBottom: `1px solid ${palette.page.cardBorder}`,
        }}
      >
        <SearchRoundedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
        <InputBase
          autoFocus
          fullWidth
          placeholder="Type a command or search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{ fontSize: 15 }}
        />
        <Box
          sx={{
            px: 1,
            py: 0.25,
            borderRadius: 1,
            border: `1px solid ${palette.page.cardBorder}`,
            fontSize: 11,
            fontWeight: 600,
            color: "text.disabled",
            whiteSpace: "nowrap",
          }}
        >
          ESC
        </Box>
      </Box>

      {/* Results */}
      <Box ref={listRef} sx={{ maxHeight: 360, overflow: "auto", py: 1 }}>
        {flatList.length === 0 ? (
          <Typography sx={{ px: 2.5, py: 3, textAlign: "center", fontSize: 13, color: "text.disabled" }}>
            No results for "{query}"
          </Typography>
        ) : (
          Array.from(sections.entries()).map(([section, cmds]) => (
            <Box key={section}>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "text.disabled",
                  px: 2.5,
                  pt: 1.5,
                  pb: 0.5,
                }}
              >
                {section}
              </Typography>
              {cmds.map((cmd) => {
                const idx = flatIndex++;
                const isActive = idx === activeIndex;
                const Icon = cmd.icon;
                return (
                  <Box
                    key={cmd.id}
                    data-index={idx}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 2.5,
                      py: 1,
                      mx: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "all 0.1s",
                      bgcolor: isActive ? palette.purple[50] : "transparent",
                      color: isActive ? palette.purple[700] : "text.primary",
                      "&:hover": { bgcolor: palette.purple[50] },
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 18,
                        color: isActive ? palette.purple[500] : "text.secondary",
                      }}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 500, flex: 1 }}>
                      {cmd.label}
                    </Typography>
                    {cmd.shortcut && (
                      <Box
                        sx={{
                          px: 0.75,
                          py: 0.125,
                          borderRadius: 1,
                          border: `1px solid ${palette.page.cardBorder}`,
                          fontSize: 10,
                          fontWeight: 600,
                          color: "text.disabled",
                          fontFamily: "monospace",
                        }}
                      >
                        {cmd.shortcut}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))
        )}
      </Box>

      {/* Footer hint */}
      <Box
        sx={{
          px: 2.5,
          py: 1.25,
          borderTop: `1px solid ${palette.page.cardBorder}`,
          display: "flex",
          gap: 2,
          fontSize: 11,
          color: "text.disabled",
        }}
      >
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>Esc Close</span>
      </Box>
    </Dialog>
  );
}
