import React, { useState, useEffect, useRef, useCallback } from 'react';

const SVG = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600 group-hover:text-gray-800"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const ToolbarDivider = () => <div role="separator" aria-orientation="vertical" className="w-[1px] h-4 md:h-5 bg-gray-200 mx-0.5 md:mx-1"></div>;

const Icon = ({ children, onClick, editorRef, ...props }) => {
  const execute = (e) => {
    if (editorRef?.current) {
      editorRef.current.focus();
    }
    onClick?.(e);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    execute(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      execute(e);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 h-7 w-7 md:h-8 md:w-8 rounded flex items-center justify-center transition-colors focus-ring"
      {...props}
    >
      {children}
    </button>
  );
};

const ActionIcon = ({ children, command, arg = null, isActive = false, editorRef, ...props }) => {
  const execute = () => {
    if (editorRef?.current) {
      editorRef.current.focus();
    }
    if (command === 'createLink') {
      const url = prompt('Enter the link URL:', 'https://');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertImage') {
      const url = prompt('Enter the image URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else {
      document.execCommand(command, false, arg);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    execute();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      execute();
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className={`h-7 w-7 md:h-8 md:w-8 rounded flex items-center justify-center transition-colors focus-ring ${isActive
          ? "bg-blue-100 text-blue-700 shadow-sm"
          : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        }`}
      title={command}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownIcon = () => (
  <svg className="w-2.5 h-2.5 md:w-3 md:h-3 ml-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="6 9 12 15 18 9" />
  </svg>
);

// SVG Paths to match the screenshot
const AlignLeft = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>} />;
const AlignCenter = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>} />;
const AlignRight = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>} />;
const AlignJustify = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>} />;
const ListBullet = () => <SVG path={<><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></>} />;
const ListNumber = () => <SVG path={<><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><path d="M4 6h1v4" /><path d="M4 10h2" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></>} />;
const Checklist = () => <SVG path={<><line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" /><rect x="3" y="4" width="4" height="4" rx="1" /><rect x="3" y="10" width="4" height="4" rx="1" /><rect x="3" y="16" width="4" height="4" rx="1" /></>} />;
const IndentDecrease = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="11" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /><polyline points="7 15 3 12 7 9" /></>} />;
const IndentIncrease = () => <SVG path={<><line x1="3" y1="6" x2="21" y2="6" /><line x1="11" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /><polyline points="3 15 7 12 3 9" /></>} />;
const LinkIcon = () => <SVG path={<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>} />;
const ImageIcon = () => <SVG path={<><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>} />;
const VideoIcon = () => <SVG path={<><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></>} />;

const b = [" ", "\u00a0", "\t", "\n", "\r", "\f", "\v"];
const k = [".", ",", "!", "?", ";", ")", "]", "}"];

const getCaretIndex = (element) => {
  let position = 0;
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    position = preCaretRange.toString().length;
  }
  return position;
};

const getCaretRect = () => {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0).cloneRange();
    const rects = range.getClientRects();
    if (rects.length > 0) {
      return rects[0];
    }
    // Fallback
    const span = document.createElement("span");
    span.appendChild(document.createTextNode("\u200b"));
    range.insertNode(span);
    const rect = span.getBoundingClientRect();
    span.remove();
    return rect;
  }
  return null;
};

const getSuggestions = (sentences, text, caretIdx, mode) => {
  const normalizedText = text.replace(/\u00a0/g, " ");
  if (!normalizedText || caretIdx === 0) return [];
  
  // Check if the current caret position is adjacent to a whitespace
  const charBefore = normalizedText.charAt(caretIdx - 1);
  const charAt = normalizedText.charAt(caretIdx);
  if (!b.includes(charBefore) && !b.includes(charAt)) {
    return [];
  }

  let startIdx = 0;
  let prefix = "";

  if (mode === 'sentence') {
    // Find the last sentence separator before caret
    for (let i = caretIdx - 1; i >= 0; i--) {
      if (k.includes(normalizedText.charAt(i))) {
        startIdx = i + 1;
        break;
      }
    }
    prefix = normalizedText.substring(startIdx, caretIdx).toLowerCase().trimStart();
  } else {
    // Word mode
    if (b.includes(charBefore)) {
      return [];
    }
    for (let i = caretIdx - 1; i >= 0; i--) {
      if (normalizedText.charAt(i) === ' ' || b.includes(normalizedText.charAt(i))) {
        startIdx = i + 1;
        break;
      }
    }
    prefix = normalizedText.substring(startIdx, caretIdx).toLowerCase().trim();
  }

  if (!prefix) return [];

  const matches = new Set();
  // 1. Matches starting with prefix
  for (const item of sentences) {
    if (item.toLowerCase().startsWith(prefix) && item.substring(prefix.length).length >= 10) {
      matches.add(item);
    }
  }
  // 2. Fallback: contains prefix
  if (matches.size < 5) {
    for (const item of sentences) {
      const idx = item.toLowerCase().indexOf(prefix);
      if (idx !== -1) {
        const sub = item.substring(idx);
        if (sub.substring(prefix.length).length >= 10) {
          matches.add(sub);
        }
      }
    }
  }

  let results = Array.from(matches);
  results.sort((e, t) => e.length - t.length);
  return results.slice(0, 5).map(e => ({
    display: e,
    value: e.substring(prefix.length)
  }));
};

function Textbox({ loading }) {
  const [activeFormats, setActiveFormats] = useState({});
  const savedSelection = useRef(null);
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Suggestions state
  const [sentences, setSentences] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionMode, setSuggestionMode] = useState("sentence");
  const [suggestionRect, setSuggestionRect] = useState({ top: "0px", left: "0px" });
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  // Keystroke savings tracking
  const [charsSaved, setCharsSaved] = useState(0);
  const [charsTyped, setCharsTyped] = useState(0);

  // Load sentences dictionary
  useEffect(() => {
    fetch('/sentences.json')
      .then(res => res.json())
      .then(data => {
        setSentences(data);
        setSuggestionLoading(false);
      })
      .catch(err => {
        console.error("Failed to load sentences.json", err);
        setSuggestionLoading(false);
      });
  }, []);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const handleColorChange = (e) => {
    if (savedSelection.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
    document.execCommand('foreColor', false, e.target.value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const updateSuggestions = useCallback(() => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText || editorRef.current.textContent || "";
    const caretIdx = getCaretIndex(editorRef.current);
    
    // Position the overlay near caret
    const rect = getCaretRect();
    if (rect) {
      let left = rect.left;
      if (left + 250 > window.innerWidth) {
        left = window.innerWidth - 270;
      }
      left = Math.max(10, left);

      setSuggestionRect({
        top: `${rect.bottom + window.scrollY + 4}px`,
        left: `${left + window.scrollX}px`
      });
    }

    const matched = getSuggestions(sentences, text, caretIdx, suggestionMode);
    setSuggestions(matched);
    setActiveSuggestionIndex(0);
  }, [sentences, suggestionMode]);

  const acceptSuggestion = (suggestionValue) => {
    if (!suggestionValue) return;

    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand('insertText', false, suggestionValue);
    setCharsSaved(prev => prev + suggestionValue.length);
    setSuggestions([]);
    setActiveSuggestionIndex(0);
  };

  // Keyboard autocomplete controls in contentEditable
  const handleEditorKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        const activeSug = suggestions[activeSuggestionIndex];
        if (activeSug) {
          acceptSuggestion(activeSug.value);
        }
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setSuggestions([]);
        return;
      }
    }

    const isCharacterKey = e.key.length === 1 || e.key === 'Enter';
    const isModifier = e.ctrlKey || e.metaKey || e.altKey;
    if (isCharacterKey && !isModifier) {
      setCharsTyped(prev => prev + 1);
    }
  };

  // Trigger suggestions dynamically on selection change
  useEffect(() => {
    let timer;
    const handleSelectionChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateSuggestions();
      }, 100);
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      clearTimeout(timer);
    };
  }, [updateSuggestions]);

  useEffect(() => {
    const updateFormatting = () => {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        justifyFull: document.queryCommandState('justifyFull'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        foreColor: document.queryCommandValue('foreColor'),
        blockquote: document.queryCommandValue('formatBlock') === 'blockquote',
        pre: document.queryCommandValue('formatBlock') === 'pre',
      });
    };

    document.addEventListener('selectionchange', updateFormatting);
    document.addEventListener('keyup', updateFormatting);
    document.addEventListener('mouseup', updateFormatting);

    return () => {
      document.removeEventListener('selectionchange', updateFormatting);
      document.removeEventListener('keyup', updateFormatting);
      document.removeEventListener('mouseup', updateFormatting);
    };
  }, []);

  const handleChecklist = () => {
    document.execCommand('insertHTML', false, `<div><input type="checkbox"/>&nbsp;List item</div>`);
  };

  const handleVideo = () => {
    const url = prompt('Enter the video URL (e.g. YouTube):');
    if (url) {
      document.execCommand('insertHTML', false, `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>`);
    }
  };

  const getToolbarElements = () => {
    if (!toolbarRef.current) return [];
    return Array.from(
      toolbarRef.current.querySelectorAll(
        'select, button, input[type="color"]'
      )
    );
  };

  const handleToolbarKeyDown = (e) => {
    const elements = getToolbarElements();
    if (elements.length === 0) return;

    let newIndex = focusedIndex;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newIndex = (focusedIndex + 1) % elements.length;
      setFocusedIndex(newIndex);
      elements[newIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newIndex = (focusedIndex - 1 + elements.length) % elements.length;
      setFocusedIndex(newIndex);
      elements[newIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
      setFocusedIndex(newIndex);
      elements[newIndex]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = elements.length - 1;
      setFocusedIndex(newIndex);
      elements[newIndex]?.focus();
    }
  };

  const handleToolbarFocus = (e) => {
    const elements = getToolbarElements();
    const index = elements.indexOf(e.target);
    if (index !== -1 && index !== focusedIndex) {
      setFocusedIndex(index);
    }
  };

  const totalKeystrokes = charsTyped + charsSaved;
  const savingsPercentage = totalKeystrokes > 0 ? Math.round((charsSaved / totalKeystrokes) * 100) : 0;

  const containerStyle = {
    width: '96%',
    height: '94%',
    transform: loading ? 'scale(0)' : 'scale(1)',
    borderRadius: loading ? '999px' : '20px',
    opacity: loading ? 0 : 1,
    boxShadow: loading ? 'none' : '0 0 30px 2px rgba(0,0,0,0.4)',
    backgroundColor: loading ? 'transparent' : '#fff',
    transition: 'all 0.28s ease-out, border-radius 0.05s ease-out',
  };

  return (
    <>
      <style>
        {`
          .editor-content h1 { font-size: 2.25em; font-weight: bold; margin-bottom: 0.15em; margin-top: 0.15em; line-height: 1.1; }
          .editor-content h2 { font-size: 1.75em; font-weight: bold; margin-bottom: 0.15em; margin-top: 0.15em; line-height: 1.1; }
          .editor-content h3 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.15em; margin-top: 0.15em; line-height: 1.2; }
          .editor-content h5 { font-size: 0.875em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; line-height: 1.5; color: #6b7280; text-transform: uppercase; }
          .editor-content p { margin-bottom: 0.75em; }
          .editor-content ul { list-style-type: disc; padding-left: 1.75em; margin-bottom: 1em; }
          .editor-content ol { list-style-type: decimal; padding-left: 1.75em; margin-bottom: 1em; }
          .editor-content li { margin-bottom: 0.25em; }
          .editor-content blockquote { border-left: 4px solid #cbd5e1; padding-left: 1em; font-style: italic; color: #64748b; margin-bottom: 1em; background: #f8fafc; padding: 0.5em 1em; border-radius: 0 0.5rem 0.5rem 0; }
          .editor-content pre { background: #f1f5f9; padding: 1em; border-radius: 0.5rem; font-family: monospace; font-size: 0.875em; overflow-x: auto; margin-bottom: 1em; color: #334155; }
          .editor-content a { color: #3b82f6; text-decoration: underline; cursor: pointer; text-underline-offset: 2px; }
          .editor-content font[face="Quicksand"], .editor-content [style*="font-family: Quicksand"], .editor-content [style*="font-family: 'Quicksand'"], .editor-content [style*='font-family: "Quicksand"'] { font-family: 'Quicksand', sans-serif !important; }
          .editor-content font[face="Roboto"], .editor-content [style*="font-family: Roboto"], .editor-content [style*="font-family: 'Roboto'"], .editor-content [style*='font-family: "Roboto"'] { font-family: 'Roboto', sans-serif !important; }
          .editor-content font[face="Open Sans"], .editor-content [style*="font-family: Open Sans"], .editor-content [style*="font-family: 'Open Sans'"], .editor-content [style*='font-family: "Open Sans"'] { font-family: 'Open Sans', sans-serif !important; }
          .editor-content font[face="Lato"], .editor-content [style*="font-family: Lato"], .editor-content [style*="font-family: 'Lato'"], .editor-content [style*='font-family: "Lato"'] { font-family: 'Lato', sans-serif !important; }
          .editor-content font[face="Montserrat"], .editor-content [style*="font-family: Montserrat"], .editor-content [style*="font-family: 'Montserrat'"], .editor-content [style*='font-family: "Montserrat"'] { font-family: 'Montserrat', sans-serif !important; }
          .editor-content font[face="Playfair Display"], .editor-content [style*="font-family: Playfair Display"], .editor-content [style*="font-family: 'Playfair Display'"], .editor-content [style*='font-family: "Playfair Display"'] { font-family: 'Playfair Display', serif !important; }
          
          .focus-ring:focus-visible {
            outline: 2px solid #8b3eff !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 2px rgba(139, 62, 255, 0.2) !important;
            border-radius: 4px;
          }
          .color-picker-container:has(input:focus-visible) {
            outline: 2px solid #8b3eff !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 2px rgba(139, 62, 255, 0.2) !important;
            border-radius: 4px;
          }

          /* Suggestion toggle animations */
          .suggestionToggle {
            position: absolute;
            bottom: -18px;
            left: 50%;
            width: 260px;
            height: 36px;
            user-select: none;
            cursor: pointer;
            transform: translateX(-50%) rotateY(0deg);
            transform-style: preserve-3d;
            transition: all .3s ease-out;
            z-index: 30;
          }
          .suggestionToggle.flip {
            transform: translateX(-50%) rotateY(180deg);
          }
          .suggestionToggle .label {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: capitalize;
            color: #fff;
            background: #8b3eff;
            box-shadow: 0 0 5px 2px rgba(139, 62, 255, 0.4);
            border-radius: 999px;
            padding: 0 15px;
            font-size: 14px;
            transition: all .1s ease-out;
            backface-visibility: hidden;
            overflow: hidden;
          }
          .suggestionToggle .label:after {
            position: absolute;
            width: 80px;
            height: 100%;
            left: -80px;
            content: "";
            background: #fff;
            opacity: .4;
            clip-path: polygon(15% 0, 0 100%, 25% 100%, 40% 0, 75% 0, 60% 100%, 85% 100%, 100% 0);
            transition: transform .3s ease-out;
          }
          .suggestionToggle .label:hover:after {
            transform: translateX(340px);
          }
          .suggestionToggle .label:last-of-type {
            transform: rotateY(180deg);
          }
          .suggestionToggle.loading {
            pointer-events: none;
            transform: rotateY(1turn);
          }
          .suggestionToggle.loading .label:first-of-type {
            background: #fff;
            color: #000;
            box-shadow: 0 0 0 2px #8b3eff;
          }
          .suggestionToggle.loading .label:first-of-type:after {
            background: #8b3eff;
            animation: glazeLoading .5s ease-in-out infinite;
          }
          @keyframes glazeLoading {
            0% { transform: translateX(0); }
            100% { transform: translateX(340px); }
          }

          /* Caret-based Suggestion Overlay Styling */
          .suggestion {
            position: absolute;
            background: #8b3eff;
            border-radius: 10px;
            display: flex;
            box-shadow: 0 10px 30px 2px rgba(139, 62, 255, 0.4);
            flex-direction: column;
            transform-origin: 50% 0;
            user-select: none;
            transition: all .1s ease-out;
            border: 1px solid #8b3eff;
            z-index: 50;
          }
          .suggestion > span {
            min-width: 180px;
            padding: 8px 20px;
            background: #fff;
            border: 1px solid #8b3eff;
            border-top-width: 0;
            color: #000;
            font-size: 14px;
            cursor: pointer;
            text-align: left;
            transition: background-color 0.15s, color 0.15s;
          }
          .suggestion > span:hover {
            background: rgba(139, 62, 255, 0.1);
          }
          .suggestion > span.active, .suggestion > span:active {
            background: #8b3eff;
            color: #fff;
          }
          .suggestion > span:first-of-type {
            border-top-width: 1px;
            border-top-left-radius: 9px;
            border-top-right-radius: 9px;
          }
          .suggestion > span:last-of-type {
            border-bottom-left-radius: 9px;
            border-bottom-right-radius: 9px;
          }
        `}
      </style>
      <div className="w-full h-full flex flex-col items-center justify-center relative flex-1 min-h-0">
        <div 
          className="flex flex-col relative px-3 md:px-5 pb-3 md:pb-5 pt-2 md:pt-3 w-full max-w-[1500px] select-none"
          style={containerStyle}
        >
 
          {/* Toolbar Top Bar */}
          <div
            ref={toolbarRef}
            role="toolbar"
            aria-label="Text formatting toolbar"
            onKeyDown={handleToolbarKeyDown}
            onFocus={handleToolbarFocus}
            className="flex flex-wrap items-center justify-center gap-y-1 md:gap-y-1.5 gap-x-0.5 md:gap-x-1 text-gray-600 text-xs md:text-[13px] border-b border-transparent"
            style={{ padding: '25px 10px 15px 10px' }}
          >
            {/* Font Selectors */}
            <div className="relative flex items-center hover:bg-gray-100 rounded transition border border-transparent focus-within:border-gray-200 h-7 md:h-8">
              <select
                tabIndex={focusedIndex === 0 ? 0 : -1}
                aria-label="Font family"
                className="bg-transparent text-gray-700 font-medium cursor-pointer outline-none pl-1.5 md:pl-2 pr-5 md:pr-6 py-1 md:py-1.5 appearance-none w-full h-full z-10 focus-ring text-xs md:text-[13px]"
                style={{ fontFamily: 'inherit' }}
                onChange={(e) => {
                  const val = e.target.value;
                  e.target.blur();
                  if (editorRef.current) {
                    editorRef.current.focus();
                  }
                  document.execCommand('fontName', false, val);
                }}
                defaultValue="Quicksand"
              >
                <option value="Quicksand" style={{ fontFamily: 'Quicksand' }}>Quicksand</option>
                <option value="Roboto" style={{ fontFamily: 'Roboto' }}>Roboto</option>
                <option value="Open Sans" style={{ fontFamily: 'Open Sans' }}>Open Sans</option>
                <option value="Lato" style={{ fontFamily: 'Lato' }}>Lato</option>
                <option value="Montserrat" style={{ fontFamily: 'Montserrat' }}>Montserrat</option>
                <option value="Playfair Display" style={{ fontFamily: 'Playfair Display' }}>Playfair Display</option>
              </select>
              <div className="absolute right-2 z-0 pointer-events-none">
                <DropdownIcon />
              </div>
            </div>

            <div className="relative flex items-center hover:bg-gray-100 rounded transition border border-transparent focus-within:border-gray-200 h-7 md:h-8">
              <select
                tabIndex={focusedIndex === 1 ? 0 : -1}
                aria-label="Text style"
                className="bg-transparent text-gray-700 font-medium cursor-pointer outline-none pl-1.5 md:pl-2 pr-5 md:pr-6 py-1 md:py-1.5 appearance-none w-full h-full z-10 focus-ring text-xs md:text-[13px]"
                onChange={(e) => {
                  const val = e.target.value;
                  e.target.blur();
                  if (editorRef.current) {
                    editorRef.current.focus();
                  }
                  document.execCommand('formatBlock', false, val);
                }}
                defaultValue="P"
              >
                <option value="P">Normal</option>
                <option value="H1">Extra Big</option>
                <option value="H2">Big</option>
                <option value="H3">Medium</option>
                <option value="H5">Small</option>
              </select>
              <div className="absolute right-2 z-0 pointer-events-none">
                <DropdownIcon />
              </div>
            </div>

            <ToolbarDivider />

            {/* Formatting */}
            <ActionIcon command="bold" isActive={activeFormats.bold} editorRef={editorRef} tabIndex={focusedIndex === 2 ? 0 : -1} aria-label="Bold" aria-pressed={!!activeFormats.bold}><span className="font-sans font-bold text-[13px] md:text-[15px]">B</span></ActionIcon>
            <ActionIcon command="italic" isActive={activeFormats.italic} editorRef={editorRef} tabIndex={focusedIndex === 3 ? 0 : -1} aria-label="Italic" aria-pressed={!!activeFormats.italic}><span className="font-serif italic text-[13px] md:text-[15px]">I</span></ActionIcon>
            <ActionIcon command="underline" isActive={activeFormats.underline} editorRef={editorRef} tabIndex={focusedIndex === 4 ? 0 : -1} aria-label="Underline" aria-pressed={!!activeFormats.underline}><span className="font-serif underline text-[13px] md:text-[15px]">U</span></ActionIcon>
            <ActionIcon command="strikeThrough" isActive={activeFormats.strikeThrough} editorRef={editorRef} tabIndex={focusedIndex === 5 ? 0 : -1} aria-label="Strikethrough" aria-pressed={!!activeFormats.strikeThrough}><span className="font-serif line-through text-[13px] md:text-[15px]">S</span></ActionIcon>

            <ToolbarDivider />

            {/* Alignment */}
            <ActionIcon command="justifyLeft" isActive={activeFormats.justifyLeft} editorRef={editorRef} tabIndex={focusedIndex === 6 ? 0 : -1} aria-label="Align left" aria-pressed={!!activeFormats.justifyLeft}><AlignLeft /></ActionIcon>
            <ActionIcon command="justifyCenter" isActive={activeFormats.justifyCenter} editorRef={editorRef} tabIndex={focusedIndex === 7 ? 0 : -1} aria-label="Align center" aria-pressed={!!activeFormats.justifyCenter}><AlignCenter /></ActionIcon>
            <ActionIcon command="justifyRight" isActive={activeFormats.justifyRight} editorRef={editorRef} tabIndex={focusedIndex === 8 ? 0 : -1} aria-label="Align right" aria-pressed={!!activeFormats.justifyRight}><AlignRight /></ActionIcon>
            <ActionIcon command="justifyFull" isActive={activeFormats.justifyFull} editorRef={editorRef} tabIndex={focusedIndex === 9 ? 0 : -1} aria-label="Align justify" aria-pressed={!!activeFormats.justifyFull}><AlignJustify /></ActionIcon>

            <ToolbarDivider />

            {/* Special */}
            <ActionIcon command="formatBlock" arg="blockquote" isActive={activeFormats.blockquote} editorRef={editorRef} tabIndex={focusedIndex === 10 ? 0 : -1} aria-label="Quote" aria-pressed={!!activeFormats.blockquote}><span className="font-serif font-bold text-[16px] md:text-[20px] leading-none mb-1">"</span></ActionIcon>
            <ActionIcon command="formatBlock" arg="pre" isActive={activeFormats.pre} editorRef={editorRef} tabIndex={focusedIndex === 11 ? 0 : -1} aria-label="Code block" aria-pressed={!!activeFormats.pre}><span className="font-mono text-[10px] md:text-[12px] font-bold">{"</>"}</span></ActionIcon>

            <ToolbarDivider />

            {/* Lists */}
            <ActionIcon command="insertUnorderedList" isActive={activeFormats.insertUnorderedList} editorRef={editorRef} tabIndex={focusedIndex === 12 ? 0 : -1} aria-label="Bullet list" aria-pressed={!!activeFormats.insertUnorderedList}><ListBullet /></ActionIcon>
            <ActionIcon command="insertOrderedList" isActive={activeFormats.insertOrderedList} editorRef={editorRef} tabIndex={focusedIndex === 13 ? 0 : -1} aria-label="Numbered list" aria-pressed={!!activeFormats.insertOrderedList}><ListNumber /></ActionIcon>
            <Icon onClick={handleChecklist} editorRef={editorRef} tabIndex={focusedIndex === 14 ? 0 : -1} aria-label="Checklist"><Checklist /></Icon>

            <ToolbarDivider />

            {/* Indentation */}
            <ActionIcon command="outdent" editorRef={editorRef} tabIndex={focusedIndex === 15 ? 0 : -1} aria-label="Decrease indent"><IndentDecrease /></ActionIcon>
            <ActionIcon command="indent" editorRef={editorRef} tabIndex={focusedIndex === 16 ? 0 : -1} aria-label="Increase indent"><IndentIncrease /></ActionIcon>

            <ToolbarDivider />

            {/* Colors and Media */}
            <div
              className="flex flex-col items-center justify-center h-7 w-7 md:h-8 md:w-8 hover:bg-gray-100 rounded transition-colors relative overflow-hidden group color-picker-container"
              onMouseDown={saveSelection}
            >
              <span className="font-serif font-bold text-[13px] md:text-[15px] leading-none relative z-10 pointer-events-none opacity-70 group-hover:opacity-100">A</span>
              <div
                className="w-[10px] md:w-[12px] h-[2.5px] md:h-[3px] mt-[1.5px] md:mt-[2px] rounded-full relative z-10 pointer-events-none"
                style={{ backgroundColor: activeFormats.foreColor && activeFormats.foreColor !== 'false' && activeFormats.foreColor !== 'rgba(0, 0, 0, 0)' ? activeFormats.foreColor : '#1f2937' }}
              ></div>
              <input
                type="color"
                title="Text color"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                tabIndex={focusedIndex === 17 ? 0 : -1}
                aria-label="Text color"
                onInput={handleColorChange}
                onChange={handleColorChange}
              />
            </div>
            <ActionIcon command="createLink" editorRef={editorRef} tabIndex={focusedIndex === 18 ? 0 : -1} aria-label="Insert link"><LinkIcon /></ActionIcon>
            <ActionIcon command="insertImage" editorRef={editorRef} tabIndex={focusedIndex === 19 ? 0 : -1} aria-label="Insert image"><ImageIcon /></ActionIcon>
            <Icon onClick={handleVideo} editorRef={editorRef} tabIndex={focusedIndex === 20 ? 0 : -1} aria-label="Insert video"><VideoIcon /></Icon>
            <ActionIcon command="removeFormat" editorRef={editorRef} tabIndex={focusedIndex === 21 ? 0 : -1} aria-label="Clear formatting">
              <div className="flex items-start font-serif font-bold text-[12px] md:text-[14px]">
                T<span className="text-[9px] md:text-[10px] mt-1 ml-[1px]">x</span>
              </div>
            </ActionIcon>
          </div>

          {/* Editor Boundary Area */}
          <div 
            className="flex-1 min-h-0 w-full rounded-2xl p-4 md:p-6 outline-none overflow-y-auto mb-16 md:mb-6 bg-white transition-shadow"
            style={{ boxShadow: 'inset 0 0 10px 0 rgba(0,0,0,0.4)', border: 'none' }}
          >
            <div
              ref={editorRef}
              className="editor-content w-full h-full outline-none font-[Quicksand] text-black text-[18px] font-[500] leading-relaxed relative z-0 select-text"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleEditorKeyDown}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            >
              Hello There, Welcome to Smart Compose Demo!
            </div>
          </div>

          {/* Caret-based Suggestion Overlay */}
          {suggestions.length > 0 && (
            <div
              className="suggestion"
              style={{
                position: 'absolute',
                top: suggestionRect.top,
                left: suggestionRect.left,
              }}
            >
              {suggestions.map((s, idx) => (
                <span
                  key={idx}
                  className={idx === activeSuggestionIndex ? 'active' : ''}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    acceptSuggestion(s.value);
                  }}
                >
                  {s.display}
                </span>
              ))}
            </div>
          )}

          {/* Centered Suggestion Mode Card Toggle */}
          <div
            onClick={() => {
              if (!suggestionLoading) {
                setSuggestionMode(prev => prev === 'sentence' ? 'word' : 'sentence');
              }
            }}
            className={`suggestionToggle ${suggestionMode === 'word' ? 'flip' : ''} ${suggestionLoading ? 'loading' : ''}`}
          >
            <div className="label">
              {suggestionLoading ? 'loading suggestions...' : 'sentence based suggestion'}
            </div>
            <div className="label">
              word based suggestion
            </div>
          </div>

          {/* Keystroke savings stats badge in the bottom-right */}
          <div className="absolute bottom-5 right-5 z-30 hidden md:flex items-center gap-1.5 bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-600 select-none">
            <span className={`w-1.5 h-1.5 rounded-full ${savingsPercentage > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
            <span>⚡ {savingsPercentage}% fewer keystrokes this session</span>
            <span className="text-[10px] text-gray-400">({charsSaved} saved / {charsTyped} typed)</span>
          </div>

        </div>
      </div>
    </>
  );
}

export default Textbox;
