# Part 6: Comments & Collaboration

## Features

### 6.1 Add Comment
- Rich text editor at bottom of issue detail activity section
- Markdown + WYSIWYG toolbar: bold, italic, strikethrough, code (inline + block), headings, bullet/numbered lists, links, images, tables, checklists, blockquotes, horizontal rule
- `Cmd+Enter` to submit
- Cancel button (clears editor, confirmation if content exists)
- Placeholder: "Add a comment... Use @ to mention someone"

### 6.2 @Mentions
- Type `@` to trigger user autocomplete
- Shows: avatar, name, email
- Filters as you type
- Inserting @mention creates styled chip in editor
- Mentioned user receives notification
- Rendered as linked name in comment

### 6.3 Issue References
- Type `PMS-` to trigger issue autocomplete
- Shows: issue type icon, key, title, status
- Rendered as clickable link in comment
- Hover preview: tooltip with issue title, status, assignee

### 6.4 Edit Comment
- Only author can edit (or admin)
- "Edit" option in comment menu (⋯)
- Re-opens rich text editor with content
- Save/Cancel buttons
- "Edited" indicator with timestamp: "Edited 2h ago"
- Edit history not shown (just "edited" flag)

### 6.5 Delete Comment
- Only author can delete (or admin)
- "Delete" option in comment menu
- Confirmation dialog: "Delete this comment? This cannot be undone."
- Soft delete: shows "[Comment deleted]" placeholder in timeline
- Hard purge after 30 days

### 6.6 Reactions
- Hover comment → reaction picker button appears
- Emoji picker: common reactions (👍 👎 😄 🎉 😕 ❤️ 🚀 👀)
- Click existing reaction to toggle (add/remove your reaction)
- Reaction count shown under comment
- Tooltip: "Sukhdev Z., Anil K. reacted with 👍"

### 6.7 Threaded Replies
- "Reply" button on each comment
- Reply is indented under parent comment
- Reply editor: same rich text features
- Thread is collapsible: "Show N replies" toggle
- Max nesting: 1 level (replies don't have replies — prevents deep nesting)

### 6.8 Pin Comment
- Project admin / issue creator can pin
- Pinned comment shows at top of comments section with "Pinned" badge
- Only 1 pinned comment per issue
- Useful for: decisions, important context, meeting notes

### 6.9 Inline Images
- Paste image from clipboard directly into editor
- Drag-drop image file into editor
- Upload button in toolbar
- Images stored as attachments, displayed inline
- Click to expand (lightbox)

### 6.10 Code Blocks
- Inline code: backtick syntax or toolbar button
- Code block: triple backtick or toolbar button
- Language selector for syntax highlighting
- Common languages: JavaScript, TypeScript, Python, SQL, JSON, bash, etc.
- Copy code button on code blocks

### 6.11 Activity vs Comments Toggle
- Tab bar above activity section: "All" | "Comments" | "History"
- **All**: comments + field change events interleaved chronologically
- **Comments**: only user comments
- **History**: only system events (status changed, assignee changed, etc.)
- Default: "All"
- Persists user's preference

### 6.12 Comment Sorting
- Toggle: "Newest first" / "Oldest first"
- Default: Oldest first (conversation order)
- Persists per user

### 6.13 Real-time Comments
- New comments from other users appear without refresh
- Typing indicator: "AK is typing..." shown above editor
- Smooth insertion animation

## Data Model

```
Comment {
  id: UUID
  issue_id: FK → Issue
  author_id: FK → User
  parent_comment_id: FK → Comment? (for replies)
  body_markdown: text
  body_html: text (rendered, cached)
  is_pinned: boolean (default: false)
  edited_at: timestamp?
  deleted_at: timestamp?
  created_at: timestamp
  updated_at: timestamp
}

CommentReaction {
  id: UUID
  comment_id: FK → Comment
  user_id: FK → User
  emoji: string (e.g., "👍", "🎉")
  created_at: timestamp
  UNIQUE (comment_id, user_id, emoji)
}

CommentMention {
  comment_id: FK → Comment
  mentioned_user_id: FK → User
  PRIMARY KEY (comment_id, mentioned_user_id)
}
```
