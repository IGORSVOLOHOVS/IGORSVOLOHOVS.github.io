# Software requirements specification: igorsvolohovs-github-io

Reverse-engineered on 2026-11-18 from commit `a8914e7` (branch `release`).
Every requirement describes behaviour present in the files at that commit.
Line numbers refer to that commit.

## 1. Purpose and scope

The system is a static, single-page portfolio site of Igors Volohovs
(`README.md`, `recipe.ps1:12`, `index.html:6`).

In scope:

- `index.html` with its inline CSS and JavaScript, the media it references
  (`image.png`, `vcf.jpg`, `assets/`), and the vCard `contacts.vcf`.
- The local preview configuration `.claude/launch.json`.

Out of scope:

- Hosting and publishing. The README names GitHub Pages; no publishing workflow
  or Pages configuration is in the repository.
- The Web3Forms service and the CDNs the page loads from.
- The lab tooling (hooks, workflows, branch rules), covered by
  repo-quality-template except for FR-17.

## 2. Context

| Actor / system | Role | Source |
|---|---|---|
| Visitor | Reads the page, opens galleries, downloads the vCard, sends the form. | `index.html:1395-1963` |
| Site owner | Edits `index.html` and media; receives form e-mails via Web3Forms. | `README.md`, `index.html:1908` |
| Static host | Serves the files over HTTP. The README names GitHub Pages at `https://igorsvolohovs.github.io/`. | `README.md`, `index.html:13` |
| Web3Forms API | Accepts form submissions at `https://api.web3forms.com/submit`. | `index.html:1905`, `:2024` |
| Google Fonts | Serves Plus Jakarta Sans and JetBrains Mono. | `index.html:19-21` |
| cdnjs | Serves Font Awesome 6.4.0 CSS. | `index.html:24` |
| Telegram, LinkedIn, GitHub | Targets of profile links. | `index.html:1886-1890` |

Runtime environment: a web browser with JavaScript; no server-side code. Local
preview: Python 3 `http.server` on port 8642 (`.claude/launch.json:6-8`).

## 3. Functional requirements

### 3.1 Page and navigation

- **FR-1.** The system shall deliver the whole site as one `index.html` with
  inline CSS and JavaScript and no build step.
  Source: `index.html:26`, `index.html:1966`, `README.md`, `recipe.ps1:69-72`.
  Verification: no test.
- **FR-2.** The system shall declare a page title, description, keywords and
  Open Graph tags whose `og:image` is `image.png` on the site URL.
  Source: `index.html:6-16`. Verification: no test.
- **FR-3.** The system shall show a fixed header with anchor links to
  `#about`, `#expertise`, `#cases`, `#skills`, `#education`, `#interests` and
  a "Contact me" link to `#contact`.
  Source: `index.html:1395-1417`. Verification: no test.
- **FR-4.** The system shall add header padding and a stronger shadow when the
  page is scrolled more than 50 px, and restore them otherwise.
  Source: `index.html:1970-1978`. Verification: no test.
- **FR-5.** The system shall, at viewport widths up to 992 px, move the
  navigation into a side drawer that the hamburger toggle opens and closes,
  that a backdrop click or a link click closes, and that locks page scrolling
  while open.
  Source: `index.html:1221`, `index.html:1986-2003`. Verification: no test.
- **FR-6.** The system shall present, in this order, a hero block with the
  portrait, four service cards, four case cards, four skill cards, two
  interest cards, four education entries and a contact block.
  Source: `index.html:1431-1948`. Verification: no test.

### 3.2 Case galleries and lightbox

- **FR-7.** The system shall play case videos automatically, muted, looped and
  inline.
  Source: `index.html:1515`, `index.html:1519`. Verification: no test.
- **FR-8.** The system shall add previous/next arrows and one dot per slide to
  every `.case__gallery--slider` with more than one image or video; a dot click
  scrolls to that slide, an arrow click scrolls by one gallery width, and
  scrolling updates the active dot.
  Source: `index.html:2054-2120`. Verification: no test.
- **FR-9.** The system shall open a full-screen lightbox when any image or
  video inside a `.case__gallery` is clicked, showing a copy of that item with
  the element's `alt` text as caption (default "Project Showcase" or "Video
  Demonstration"); a video copy has controls, autoplay and loop.
  Source: `index.html:2132-2193`, `index.html:2220-2229`.
  Verification: no test.
- **FR-10.** The system shall move to the next or previous lightbox item with
  wrap-around via the arrow buttons and the ArrowRight/ArrowLeft keys, hide the
  arrows for a single-item gallery, and close the lightbox via the close
  button, a background click or Escape, pausing a playing video.
  Source: `index.html:2195-2249`. Verification: no test.

### 3.3 Contact

- **FR-11.** The system shall show an e-mail link, a phone link, a location
  line, three profile links that open in a new tab, the QR image `vcf.jpg`,
  and a download link for `contacts.vcf`.
  Source: `index.html:1874-1901`. Verification: no test.
- **FR-12.** The system shall require a name, a syntactically valid e-mail
  address and a message before submitting the form.
  Source: `index.html:1932`, `:1936`, `:1940`. Verification: no test.
- **FR-13.** The system shall, on submit, disable the button, label it
  "Sending...", and POST all form fields as JSON to
  `https://api.web3forms.com/submit` instead of a page navigation.
  Source: `index.html:2012-2031`. Verification: no test.
- **FR-14.** The system shall, on HTTP 200, show the success box and hide the
  fields; on any other status show the error box with the API `message` (or
  "Could not send request.") and re-enable the button; on a network or parse
  error show the error box and re-enable the button.
  Source: `index.html:2032-2051`. Verification: no test.

### 3.4 Print and vCard

- **FR-15.** The system shall, when printed, hide the header, buttons, QR,
  form and portrait and lay out cases in one column.
  Source: `index.html:1333-1386`. Verification: no test.
- **FR-16.** The system shall provide `contacts.vcf` as a vCard 3.0 with the
  properties N, FN, TITLE, TEL, EMAIL, URL and PHOTO.
  Source: `contacts.vcf:1-9`, `contacts.vcf:244`. Verification: no test.

### 3.5 Repository standard

- **FR-17.** The repository shall expose `recipe.ps1` per repo-quality-template
  (lab revision 4.0.0), where `info` prints name, code, version and summary,
  `test` runs pytest and ruff over `.claude/`, `clean` removes tool caches, and
  the other verbs print `nothing to <verb>`.
  Source: `recipe.ps1:41-74`, `README.md`. Verification: `.\recipe.ps1 info`
  (manual, run 2026-11-18, exit 0).

### 3.6 Declared but not implemented, or present but unused

- Hero background video: the file is named `assets/video/hero-bg.mp4` and the
  hero block uses class `hero__video-block`, but the hero has no `<video>`; the
  file is the first slide of the WaamMonitoring case (`index.html:1436`,
  `:1516`). Commit `0e575d6` mentions a "full-bleed hero video".
- `.mindset__*` styles (`index.html:867-912`, `:1295`, `:1380`) and
  `.case__gallery--triple` (`index.html:539`, `:813`) style markup that the page
  does not contain.
- `assets/cases/edge-ai-laser-scan.jpg`, `assets/cases/waam-robot-welding.jpg`
  and `assets/video/edge-ai-rv1106.mp4` are tracked but not referenced.
- `.claude/pytest.ini` declares a place for tests of repository scripts:
  "None yet".

## 4. Interfaces

### 4.1 HTTP requests made by the page

| Request | Target | Payload / result | Source |
|---|---|---|---|
| GET | same origin: `index.html`, `image.png`, `vcf.jpg`, `contacts.vcf`, `assets/cases/*.jpg`, `assets/video/*.mp4` | static files | `index.html:1448-1900` |
| GET CSS | `fonts.googleapis.com` (+ `fonts.gstatic.com`) | Plus Jakarta Sans 300-800, JetBrains Mono 400-600 | `index.html:19-21` |
| GET CSS | `cdnjs.cloudflare.com` | Font Awesome 6.4.0 `all.min.css` | `index.html:24` |
| POST | `https://api.web3forms.com/submit` | JSON body: `access_key`, `subject`, `name`, `email`, `message`, and `botcheck` only if checked; headers `Content-Type` and `Accept: application/json` | `index.html:1907-1940`, `:2020-2031` |
| POST response | Web3Forms | success = HTTP 200; on failure the JSON `message` is shown | `index.html:2033-2040` |

### 4.2 User interface entry points

| Element | Input | Effect | Source |
|---|---|---|---|
| Header anchors | click | scroll to section (CSS `scroll-behavior: smooth`) | `index.html:42`, `:1400-1417` |
| `#headerToggle`, `#menuBackdrop` | click | open/close drawer | `index.html:1993-1994` |
| Slider arrows, dots | click | scroll gallery | `index.html:2086-2119` |
| Gallery image/video | click | open lightbox | `index.html:2221-2229` |
| Lightbox | Escape, ArrowLeft, ArrowRight | close, previous, next | `index.html:2244-2249` |
| "Save Contact (.vcf)" | click | download `contacts.vcf` | `index.html:1900` |
| Contact form | submit | FR-13, FR-14 | `index.html:1905-1944` |

### 4.3 Local preview

| Name | Command | Port | Source |
|---|---|---|---|
| `static-site` | `python3 -m http.server 8642` | 8642 | `.claude/launch.json:5-8` |

## 5. Data

| Entity | Storage | Format | Source |
|---|---|---|---|
| Page text (services, cases, skills, interests, education, contacts) | inline in `index.html` | HTML | `index.html:1431-1955` |
| Portrait / preview image | `image.png` | PNG 640x640, Git LFS | `file`, `.gitattributes:9` |
| Case photos (10) | `assets/cases/` | JPEG, Git LFS | `.gitattributes:10`, `git lfs ls-files` |
| Case videos (3) | `assets/video/` | MP4, plain Git blobs (no LFS rule) | `.gitattributes` |
| QR image | `vcf.jpg` | JPEG 1148x1148, Git LFS | `file` |
| Contact card | `contacts.vcf` | vCard 3.0, LF line endings, embedded PHOTO | `contacts.vcf:1-9`, `.gitattributes:1` |
| Form submission | not stored by the site; sent to Web3Forms | JSON | `index.html:2020-2031` |

## 6. Non-functional requirements

- **NFR-1.** The layout shall adapt at the 992 px, 768 px and 600 px
  breakpoints. Source: `index.html:791`, `:808`, `:1221`, `:1306`, `:1322`.
- **NFR-2.** Case images shall load lazily
  (`loading="lazy"`). Source: `index.html:1518`, `:1522`, `:1571`, `:1620-1621`,
  `:1669-1671`.
- **NFR-3.** The site shall need no server-side code and no build step.
  Source: `README.md`, `recipe.ps1:69-72`.
- **NFR-4.** Fonts shall fall back to generic `sans-serif` and `monospace` when
  the CDN fonts are unavailable. Source: `index.html:39-40`.
- **NFR-5.** Images shall carry `alt` text, and lightbox buttons shall carry
  `aria-label`. Source: `index.html:1448`, `:1518-1671`, `:1959-1962`.
- **NFR-6.** Text files shall be stored with LF line endings (CRLF for
  `*.ps1`, `*.bat`, `*.cmd`), and PNG/JPG/PDF/ZIP/7z files through Git LFS.
  Source: `.gitattributes:1-12`.
- **NFR-7.** The content shall be licensed under MIT. Source: `LICENSE`.

## 7. Constraints and dependencies

There is no package manifest or lock file. Dependencies are named in files:

| Dependency | Version | Use | Source |
|---|---|---|---|
| Font Awesome | 6.4.0 (cdnjs) | icons | `index.html:24` |
| Google Fonts: Plus Jakarta Sans, JetBrains Mono | not versioned | typography | `index.html:21` |
| Web3Forms API | not versioned | contact form | `index.html:1905`, `:2024` |
| Python 3 | not pinned | local preview | `.claude/launch.json:6` |
| Git LFS | not pinned | images on checkout | `.gitattributes:8-12` |
| ruff | `==0.16.1` | `recipe.ps1 test` | `.claude/ruff.toml:2` |
| pytest | not pinned (`.claude/pytest.ini` has no version) | `recipe.ps1 test` | `.claude/pytest.ini` |

## 8. Acceptance

1. `git lfs ls-files` lists `image.png`, `vcf.jpg` and the ten
   `assets/cases/*.jpg`, and `file` reports real PNG/JPEG data for them.
2. Every local file named in `index.html` exists (grep each `src`/`href`).
3. Start `python3 -m http.server 8642` (`.claude/launch.json`), open the page,
   and check FR-3 to FR-11 and FR-15 by hand at widths above 992 px, at 768 px
   and at 600 px, and in print preview.
4. Check FR-12 by submitting an empty form. Check FR-13/FR-14 only with the
   owner's consent: a valid submission sends a real e-mail.
5. Import `contacts.vcf` on a phone and confirm the properties of FR-16.
6. `.\recipe.ps1 info` exits 0 and prints the four metadata lines (FR-17).

## 9. Open questions

1. Which branch GitHub Pages publishes from. `origin/HEAD` points to `release`,
   where images are LFS pointers; `origin/main` holds them as plain blobs. If
   Pages publishes `release` from the branch, whether the images are served as
   images was not checked (unverified inference).
2. `README.md` says nothing pushes from the Gitea copy to GitHub, yet the
   GitHub remote carries the lab commits on `release` (at `a8914e7`) and
   `test` (at `b267d31`). How they are kept in sync is not stated.
3. Whether the Web3Forms `access_key` committed at `index.html:1907` counts as
   a key under `CLAUDE.md` rule 4.
4. What `vcf.jpg` encodes. Commit `ddb23d7` states that it encodes the URL
   `https://igorsvolohovs.github.io/contacts.vcf` (checked then with OpenCV);
   the file is unchanged since (`3d23b72` only moved it to LFS, same SHA-256).
   The QR was not decoded for this document.
5. Who the target readers are; "Services" and "Leave a Request" suggest
   clients or employers (inference).
6. Whether the unused media and CSS (section 3.6) are to be used or removed.
7. Whether a Gitea runner (`runs-on: windows`) serves this repository.
8. Performance or size targets: none in the files; the two referenced videos
   are about 8.7 MB together and autoplay.
