# Chrome Extension Announcements
A Chrome extension that displays announcements from a FreshRSS server with admin management capabilities.

## 🔍 Overview
This extension allows administrators to:
- Fetch and display announcements from a FreshRSS server
- Manage feeds directly from the browser
- Synchronize content without user authentication (admin-only access)

## 🛠️ Technical Stack
| Component | Technology |
|-----------|------------|
| Core | Chrome Extension Manifest V3 |
| Storage | `chrome.storage.local` |
| API Client | FreshRSS Google Reader API |
| Security | Admin API Token Authentication |
| Frontend | HTML5, Vanilla JS |
| Build | No build step required |

## 🚀 Features
### Core Functionality
- 🔒 Admin-only access with embedded API token
- 🔄 Automatic feed synchronization (configurable interval)
- 📝 Announcement display system
- ⚙️ Direct feed management from extension popup

### Admin Controls
- Add/remove RSS feeds
- Create/delete categories
- Mark announcements as read/unread
- Force manual synchronization
