# Part 11: Attachments & Files

## Features

### 11.1 Upload Files
- Multi-file upload on issue detail (attachments section)
- Upload button + drag-drop zone
- File picker dialog (multi-select)
- Upload progress indicator per file
- Success/error toast per file

### 11.2 Drag-and-Drop
- Drop files anywhere on issue detail → upload to attachments
- Visual drop zone indicator when dragging over
- Drop into comment editor → inline image (if image type)
- Drop into description editor → inline image (if image type)

### 11.3 Paste from Clipboard
- `Ctrl+V` / `Cmd+V` in description or comment editor
- If clipboard has image: upload and insert inline
- Auto-named: "screenshot-2026-04-16-143022.png"
- Works with: screenshots, copied images

### 11.4 File Display
| File Type | Display |
|-----------|---------|
| Images (png, jpg, gif, webp, svg) | Thumbnail preview (120x120), click for lightbox |
| PDF | PDF icon + filename, click to open in new tab |
| Documents (doc, docx, xls, xlsx, ppt) | File type icon + filename |
| Code files (ts, js, py, etc.) | Code icon + filename |
| Archives (zip, tar, gz) | Archive icon + filename |
| Other | Generic file icon + filename |

### 11.5 Attachment List
- Grid view (thumbnails for images, icons for others)
- Or list view (filename, size, uploader, date)
- Sort by: date (newest first), name, size
- File count indicator in section header: "Attachments (3)"

### 11.6 Attachment Actions
| Action | Details |
|--------|---------|
| Download | Click download icon, or click filename |
| Delete | Click delete icon, confirmation dialog. Only uploader or admin. |
| Preview | Click thumbnail for lightbox (images). Click PDF to open. |
| Copy link | Right-click → copy direct URL to file |

### 11.7 Image Lightbox
- Click image thumbnail → full-screen overlay
- Navigation: previous/next arrows (if multiple images)
- Zoom: scroll to zoom, drag to pan
- Download button
- Close: click backdrop, Esc key, or X button

### 11.8 File Size Limits
- Per file: 25 MB (configurable per workspace plan)
- Total per workspace: based on plan (Free: 1GB, Pro: 50GB, Enterprise: unlimited)
- Error message when limit exceeded
- Storage usage indicator in workspace settings

### 11.9 Inline Images in Rich Text
- Images uploaded in description/comments are stored as attachments
- Displayed inline in rendered content
- Resizable in editor (small/medium/large)
- Alt text support for accessibility

### 11.10 Attachment Metadata
- Original filename
- File size (human-readable: "2.3 MB")
- MIME type
- Uploaded by (user)
- Upload date (relative: "3 days ago")
- Dimensions (for images: "1920x1080")

## Data Model

```
Attachment {
  id: UUID
  issue_id: FK → Issue
  comment_id: FK → Comment? (if attached via comment, nullable)
  uploaded_by: FK → User
  filename: string (original filename)
  storage_key: string (cloud storage path/key)
  content_type: string (MIME type)
  size_bytes: number
  width: number? (images only)
  height: number? (images only)
  thumbnail_url: string? (generated for images)
  deleted_at: timestamp?
  created_at: timestamp
}

-- Storage: files stored in cloud storage (S3, Azure Blob, etc.)
-- Thumbnails: generated on upload for images (120x120, 300x300)
-- Direct URLs: time-limited signed URLs for downloads
```
