# freemocks.in — Full Technology & Architecture Reference

## 🧱 Frontend (What the user sees)

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15.1 | React framework — App Router, SSR, routing |
| **React** | 19.0 | UI rendering |
| **TypeScript** | 5.7 | Type-safe code across the entire codebase |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Radix UI** | Various | Accessible UI primitives (Dialog, Tabs, Dropdown, Popover, Progress) |
| **Lucide React** | 0.475 | Icon library |
| **KaTeX** | 0.16 | Math equation rendering for bilingual questions (e.g. `$x^2 + 1/x^2$`) |
| **Zustand** | 5.0 | Client-side global state management for live exam session |
| **idb** | 8.0 | IndexedDB wrapper for offline exam state persistence |

---

## 🗄️ Database — Supabase (PostgreSQL)

**Platform:** [Supabase](https://supabase.com) — hosted PostgreSQL with Row Level Security (RLS)

### Tables & Schema

```
categories         → Exam categories (SSC, Railways, Banking, Teaching)
    └── exams      → Individual exams under each category (SSC CGL, CHSL, etc.)
         └── tests → A specific mock test paper (title, duration, marks, questions count)
              └── questions → Bilingual question bank (JSONB content with en + hi)

user_test_attempts → Per-user scores, accuracy, percentile, responses (JSONB), timestamps
```

### How questions are stored
Each question is a single JSONB row with **both languages in one record**:
```json
{
  "en": { "question": "If $x+1/x=4$...", "options": [...] },
  "hi": { "question": "यदि $x+1/x=4$...", "options": [...] }
}
```
- `correct_option_id` is stored **separately** and is **never sent to the browser** (RLS blocks direct reads)
- `scoring` JSONB: `{ "positive": 2.0, "negative": -0.50 }`
- `metadata` JSONB: `{ "subject": "...", "topic": "...", "difficulty": "Easy|Medium|Hard" }`

### Security (RLS Policies)
| Rule | Effect |
|---|---|
| `Public read categories/exams` | Anyone can browse exam list |
| `Public read published tests` | Only `is_published = true` tests are visible |
| `Deny direct read of questions` | Raw questions table blocked — only `service_role` key can access |
| `Users access own attempts` | A user can only read/write their own test attempt |

---

## ☁️ Backend Workers — Cloudflare Workers

Two serverless Workers deployed on **Cloudflare's edge network (globally distributed)**:

### 1. `compile-manifest` Worker
**File:** [`workers/compile-manifest.ts`](file:///c:/Users/pkm96/Downloads/freemocks.in/workers/compile-manifest.ts)

**Purpose:** Converts a raw test from Supabase into a **sanitized, cacheable JSON manifest** and saves it to R2.

**Flow:**
```
Admin triggers compile
  → Worker fetches test + questions from Supabase (using service_role key)
  → Strips correct_option_id (anti-cheat)
  → Saves sanitized manifest as manifests/{testId}.json to Cloudflare R2
  → Sets Cache-Control: public, max-age=86400 (24h CDN cache)
```

### 2. `exam-sync` Worker
**File:** [`workers/exam-sync.ts`](file:///c:/Users/pkm96/Downloads/freemocks.in/workers/exam-sync.ts)

**Purpose:** KV-backed live exam **timer + answer heartbeat sync**. Runs at Cloudflare edge.

**Actions:**
| Action | What it does |
|---|---|
| `START` | Creates a session in KV with `endTime`, stores answers `{}`, sets TTL |
| `HEARTBEAT` | Reads KV session, returns `remainingSeconds`, checks if time is up |
| `SYNC` | Same as HEARTBEAT + merges latest answer responses into KV |

**Anti-tamper:** The server holds the authoritative timer — no client-side countdown can cheat.

---

## 📦 Storage — Cloudflare R2

**Bucket name:** `freemocks-manifests`

**What's stored:** Sanitized test manifest JSON files, one per test:
```
manifests/
  └── {testId}.json   ← Questions (no correct answers), metadata, sections
```

**Why R2 instead of serving from Supabase directly:**
- Zero latency delivery via Cloudflare CDN
- Questions are pre-sanitized (correct answers stripped) before storage
- 24-hour CDN cache means thousands of users load the same file instantly

---

## 🧠 Client-Side Exam State

### Zustand Store [`lib/store/useExamStore.ts`](file:///c:/Users/pkm96/Downloads/freemocks.in/lib/store/useExamStore.ts)
Manages the **in-memory live exam state** during a test:
- Current question index, section, language (en/hi)
- Per-question response status: `not_visited | not_answered | answered | marked | answered_marked`
- Timer countdown (`remainingSeconds`)
- Submit/reset lifecycle

### IndexedDB Cache [`lib/utils/idb-cache.ts`](file:///c:/Users/pkm96/Downloads/freemocks.in/lib/utils/idb-cache.ts)
**Database name:** `FREEMOCKS_CBT_DB` — stores `exam_responses` object store in the browser.

**Purpose:** Every answer and navigation action is **auto-saved to the browser's IndexedDB** so the exam can be resumed if the page is refreshed or the tab crashes.

---

## ✍️ How a Test is Created (Admin Flow)

```
1. Admin opens /admin/questions/create
   → Bilingual Question Creator CMS (built-in)
   → Writes question in English + Hindi with KaTeX math preview
   → Sets section, correct option, +/- marks

2. Question saved to Supabase `questions` table
   → Stored as JSONB with both languages + correct answer (server-only)

3. Admin triggers compile-manifest Worker for that test
   → Worker fetches all questions, strips answers, generates manifest JSON
   → Saves to Cloudflare R2 (CDN-cached)
   → Updates `manifest_r2_url` column in the `tests` table

4. Admin sets is_published = true on the test
   → Test becomes publicly visible (RLS policy)
```

---

## 🚀 Deployment Platform

| Layer | Platform |
|---|---|
| **Frontend / SSR** | Vercel (Next.js) |
| **Database** | Supabase (PostgreSQL, hosted) |
| **Edge Workers** | Cloudflare Workers |
| **File Storage** | Cloudflare R2 |
| **KV (Session Cache)** | Cloudflare KV |
| **CDN** | Cloudflare (global edge, 300+ PoPs) |

---

## 🔗 Full Architecture Diagram

```
User Browser
    │
    ├─── Next.js (Vercel) ──── Static UI, SSR pages
    │        │
    │        └─── Supabase ──── categories, exams, tests (public RLS)
    │                           user_test_attempts (auth RLS)
    │
    ├─── Cloudflare R2 ──── manifests/{testId}.json (CDN cached, no correct answers)
    │
    └─── Cloudflare Worker (exam-sync) ──── KV session timer + heartbeat
              │
              └─── Cloudflare KV ──── cbt_session:{testId}:{userId}

Admin Panel (/admin/questions/create)
    │
    └─── Supabase ──── INSERT into questions
              │
              └─── compile-manifest Worker ──── reads questions (service_role)
                        │                        strips correct answers
                        └─── R2 Bucket ──── saves manifests/{testId}.json
```

---

## 📦 Key Dependencies Summary

```json
"next": "^15.1.0"           // Framework
"react": "^19.0.0"          // UI
"typescript": "^5.7.3"      // Type safety
"tailwindcss": "^3.4.17"    // Styling
"zustand": "^5.0.3"         // Exam state management
"idb": "^8.0.2"             // IndexedDB (offline exam save)
"katex": "^0.16.21"         // Math rendering
"@radix-ui/*"               // Accessible UI components
"lucide-react": "^0.475.0"  // Icons
```
