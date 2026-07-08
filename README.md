# Typemate

Typemate is a lightweight, responsive rich text editor built with React, Vite, and Tailwind CSS. It features a custom client-side autocomplete engine ("Smart Compose") inspired by Gmail, offering real-time suggestions as you type.

Instead of bundling heavy editor frameworks like Draft.js or Slate, Typemate is built directly on top of the browser's native `contentEditable` and Selection APIs. This keeps the bundle size small and ensures fast, native rendering.

## Core Features

- **Smart Compose (Autocomplete):** Real-time inline predictions based on a client-side dictionary of ~200,000 sentences.
- **Two Suggestion Modes:** Toggle between word-based predictions and sentence-based completions.
- **Rich Text Formatting:** Built-in options for typography (bold, italic, underline, strikethrough), heading hierarchy, custom colors, links, alignments, blockquotes, and lists.
- **Google Fonts Integration:** Curated Google fonts (Quicksand, Roboto, Montserrat, etc.) to change editor styles on the fly.
- **WAI-ARIA Accessibility:** Accessible formatting toolbar implemented using a roving tabindex keyboard navigation pattern (using left/right arrows, Home, and End).
- **Keystroke Metrics:** Tracks the number of characters typed manually versus the characters saved via autocomplete.

## How it Works Under the Hood

### 1. Caret Coordinates & Position Detection
Suggestions are positioned dynamically right below the user's cursor.
- **Caret Index**: We calculate the exact character index of the caret by cloning the active range, setting the start boundary to the editor container's beginning, and parsing the string length.
- **Visual Coordinates**: We grab the caret's client rect using `range.getBoundingClientRect()`. If the caret is collapsed (e.g., at the start of a blank line), we fall back to the bounding rect of the parent block element to avoid layout computation errors.

### 2. Spacing and Unicode Normalization
Browsers frequently replace trailing spaces in a `contentEditable` div with non-breaking spaces (`\u00a0` / `&nbsp;`) to prevent rendering bugs.
- Because `\u00a0` is a distinct Unicode character (char code 160) from standard spaces (char code 32), regular space matching fails.
- Typemate normalizes the editor text using a regex replacement (`.replace(/\u00a0/g, " ")`) before extracting prefixes, and includes both space characters in its whitespace trigger definitions.

### 3. Autocomplete Injection
- When a user types and the cursor is adjacent to a space, the engine scans backward to find the preceding word or punctuation.
- It queries the loaded dictionary of sentences. If a match is found, it renders a list of suggestions.
- Accepting a suggestion (via `Tab` or `Enter`) inserts the suggestion's suffix exactly at the caret using `document.execCommand('insertText')`, preserving the browser's native undo/redo stack.

## Getting Started

### Prerequisites
- Node.js (v18+)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Shresth-11/topmate.git
   cd topmate
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## File Structure

- `src/components/Textbox.jsx`: The core editor component containing formatting controls, caret coordinate tracking, and the suggestion overlay.
- `src/App.jsx`: Main application frame and loading/splash screen logic.
- `public/sentences.json`: Local dictionary database used for generating client-side completions.
