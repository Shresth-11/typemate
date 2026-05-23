# ✍️ Smart Compose (AI-Powered Rich Text Editor)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

**Smart Compose** is a premium, highly interactive, and beautiful Web Rich Text Editor built with **React 19**, **Vite 8**, and the cutting-edge **Tailwind CSS v4**. It features an elegant inline **Gmail-style autocompletion engine** ("Smart Compose") that suggests contextual words in real time as you type, alongside a robust formatting toolbar for customizing typography, structures, alignments, and custom Google Fonts.

---

## ✨ Key Features

- 🧠 **Gmail-Style Smart Compose:** 
  - Real-time inline autocomplete ghost suggestions as you type (e.g., typing `Thank you` dynamically inserts a faded gray ` for your time!`).
  - Press **`Tab`** or **`ArrowRight`** to instantly accept and autocomplete the suggestion.
- 📝 **Premium Rich Text Formatting:**
  - Standard text style toggles: Bold, Italic, Underline, and Strike-through.
  - Multi-level document structure: Normal paragraph and Headings (H1, H2, H3, H5).
  - Rich document assets: Inline hyperlink creator, Cloud image insertion, Quote blocks, and Code blocks (`</>`).
  - Alignments: Left, Center, Right, and Justified.
- 🎨 **Elegant Font & Palette Selector:**
  - Instantly swap standard fonts for premium, curated Google Fonts: *Quicksand*, *Roboto*, *Open Sans*, *Lato*, *Montserrat*, and *Playfair Display*.
  - Inline custom palette color-wheel to style text colors dynamically.
- 🚀 **Floating Suggestion Drawer:** A beautiful floating button drawer triggering sentence-based quick templates to speed up correspondence.
- ⚡ **Fluid Micro-Animations & Custom Splash:** Responsive loading screen with glowing ping rings and modern, premium glassmorphism layouts.

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core Library:** [React 19](https://react.dev/) (Hooks: `useState`, `useEffect`, `useRef`)
- **Build Tooling Engine:** [Vite 8](https://vite.dev/) (lightning-fast HMR and bundle compilation)
- **Styling Architecture:** [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS compilation and utility framework)
- **Code Linter:** [ESLint v9](https://eslint.org/)

---

## 📂 Project Architecture

A clean representation of the repository's layout:

```bash
topmate/
├── public/                 # Static public assets (Vite logo, brand assets)
├── src/
│   ├── assets/             # Branding icons and local asset files
│   ├── components/
│   │   └── Textbox.jsx     # Core Rich Text Editor component, custom commands, & composition logic
│   ├── App.css             # Component-level styling and dark/light animations
│   ├── App.jsx             # Root layout controller with custom splash loading screens
│   ├── index.css           # Global custom Tailwind base utility imports
│   └── main.jsx            # React entry point mounting the app
├── .gitignore              # Files/folders to exclude from git control
├── eslint.config.js        # Linter rules and code quality parameters
├── index.html              # Base entry HTML shell
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Compiler configurations and Tailwind plugins
```

---

## ⚙️ How Smart Compose Works (Under the Hood)

The editor listens to real-time keystroke input inside a standard `contentEditable` div. It monitors text offsets relative to the selection cursor:

1. **Keystroke Listener:** As you type, the cursor offset is parsed to extract the trailing string segment.
2. **Dictionary Check:** If a segment matches a prefix in the custom dictionary (e.g. `Please let me know if`), the engine inserts a faded gray, non-selectable HTML `span` element dynamically representing the matching autocomplete text.
3. **Key Capture:**
   - **`Tab` or `ArrowRight`:** Capitalizes on the ghost text, removes the span, and replaces it with actual editable text using `document.execCommand('insertText')`.
   - **Any other key:** Automatically cleanses the document of the ghost span, maintaining an organic writing flow.

---

## 🚀 Getting Started

Launch the Smart Compose editor locally in just a few steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Shresth-11/topmate.git
cd topmate
```

### 2. Install Project Dependencies
Ensure Node.js (v18+) is installed.
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to the address listed in your terminal (usually `http://localhost:5173`) to experience the editor!

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

*Crafted with 🩵 and precision by [Shresth-11](https://github.com/Shresth-11)* 🚀
