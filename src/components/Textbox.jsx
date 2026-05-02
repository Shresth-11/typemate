import React, { useState, useEffect, useRef } from 'react';

const SVG = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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

const ToolbarDivider = () => <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>;

const Icon = ({ children, onClick }) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick?.(e); }}
    className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 h-8 w-8 rounded flex items-center justify-center transition-colors"
  >
    {children}
  </button>
);

const ActionIcon = ({ children, command, arg = null, isActive = false }) => {
  const handleAction = (e) => {
    e.preventDefault(); // Prevent losing focus from the editor
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

  return (
    <button
      onMouseDown={handleAction}
      className={`h-8 w-8 rounded flex items-center justify-center transition-colors ${isActive
          ? "bg-blue-100 text-blue-700 shadow-sm"
          : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
        }`}
      title={command}
    >
      {children}
    </button>
  );
};

const DropdownIcon = () => (
  <svg className="w-3 h-3 ml-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const SMART_COMPOSE_DICT = {
  "Thank you ": "for your time!",
  "Thank you": " for your time!",
  "Thankyou ": "for your time!",
  "Thankyou": " for your time!",
  "Looking ": "forward to hearing from you.",
  "Looking": " forward to hearing from you.",
  "Please let me know if ": "you have any questions.",
  "Please let me know if": " you have any questions."
};

function Textbox() {
  const [activeFormats, setActiveFormats] = useState({});
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const savedSelection = useRef(null);

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
  };

  const removeGhost = () => {
    const ghost = document.getElementById('smart-compose-ghost');
    if (ghost) {
      ghost.remove();
    }
  };

  const handleEditorInput = () => {
    removeGhost();
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || !selection.isCollapsed || !selection.focusNode) return;

      const textNode = selection.focusNode;
      if (textNode.nodeType !== Node.TEXT_NODE) return;

      const textBeforeCaret = textNode.textContent.slice(0, selection.focusOffset).replace(/\u00A0/g, ' ');

      for (const [prefix, suffix] of Object.entries(SMART_COMPOSE_DICT)) {
        if (textBeforeCaret.toLowerCase().endsWith(prefix.toLowerCase())) {
          const ghostSpan = document.createElement("span");
          ghostSpan.id = "smart-compose-ghost";
          ghostSpan.contentEditable = "false";
          ghostSpan.className = "text-[#9ca3af] select-none pointer-events-none";
          ghostSpan.textContent = suffix;
          
          const range = selection.getRangeAt(0);
          range.insertNode(ghostSpan);
          range.setStartBefore(ghostSpan);
          range.collapse(true);
          
          selection.removeAllRanges();
          selection.addRange(range);
          break;
        }
      }
    }, 0);
  };

  const handleEditorKeyDown = (e) => {
    const ghost = document.getElementById('smart-compose-ghost');
    if (ghost && (e.key === 'Tab' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const textToInsert = ghost.textContent;
      removeGhost();
      document.execCommand('insertText', false, textToInsert);
    } else if (ghost && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
      removeGhost();
    }
  };

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
    // Basic mock implementation for checklist inserting
    document.execCommand('insertHTML', false, `<div><input type="checkbox"/>&nbsp;List item</div>`);
  };

  const handleVideo = () => {
    const url = prompt('Enter the video URL (e.g. YouTube):');
    if (url) {
      document.execCommand('insertHTML', false, `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>`);
    }
  };

  return (
    <>
      <style>
        {`
          .editor-content h1 { font-size: 2.25em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; line-height: 1.2; }
          .editor-content h2 { font-size: 1.75em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; line-height: 1.3; }
          .editor-content h3 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; margin-top: 0.5em; line-height: 1.4; }
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
        `}
      </style>
      <div className="w-full h-full flex flex-col items-ceq nter justify-center relative flex-1 min-h-0">
        <div className="w-full max-w-[1500px] flex-1 min-h-0 flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative px-5 pb-5 pt-3">

          {/* Toolbar Top Bar */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1.5 py-3 text-gray-600 text-[13px] border-b border-transparent">
            {/* Font Selectors */}
            <div className="relative flex items-center hover:bg-gray-100 rounded transition border border-transparent focus-within:border-gray-200">
              <select
                className="bg-transparent text-gray-700 font-medium cursor-pointer outline-none pl-2 pr-6 py-1.5 appearance-none w-full h-full z-10"
                style={{ fontFamily: 'inherit' }}
                onChange={(e) => {
                  e.target.blur();
                  document.execCommand('fontName', false, e.target.value);
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

            <div className="relative flex items-center hover:bg-gray-100 rounded transition border border-transparent focus-within:border-gray-200">
              <select
                className="bg-transparent text-gray-700 font-medium cursor-pointer outline-none pl-2 pr-6 py-1.5 appearance-none w-full h-full z-10"
                onChange={(e) => {
                  e.target.blur();
                  document.execCommand('formatBlock', false, e.target.value);
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
            <ActionIcon command="bold" isActive={activeFormats.bold}><span className="font-sans font-bold text-[15px]">B</span></ActionIcon>
            <ActionIcon command="italic" isActive={activeFormats.italic}><span className="font-serif italic text-[15px]">I</span></ActionIcon>
            <ActionIcon command="underline" isActive={activeFormats.underline}><span className="font-serif underline text-[15px]">U</span></ActionIcon>
            <ActionIcon command="strikeThrough" isActive={activeFormats.strikeThrough}><span className="font-serif line-through text-[15px]">S</span></ActionIcon>

            <ToolbarDivider />

            {/* Alignment */}
            <ActionIcon command="justifyLeft" isActive={activeFormats.justifyLeft}><AlignLeft /></ActionIcon>
            <ActionIcon command="justifyCenter" isActive={activeFormats.justifyCenter}><AlignCenter /></ActionIcon>
            <ActionIcon command="justifyRight" isActive={activeFormats.justifyRight}><AlignRight /></ActionIcon>
            <ActionIcon command="justifyFull" isActive={activeFormats.justifyFull}><AlignJustify /></ActionIcon>

            <ToolbarDivider />

            {/* Special */}
            <ActionIcon command="formatBlock" arg="blockquote"><span className="font-serif font-bold text-[20px] leading-none mb-1">"</span></ActionIcon>
            <ActionIcon command="formatBlock" arg="pre"><span className="font-mono text-[12px] font-bold">{"</>"}</span></ActionIcon>

            <ToolbarDivider />

            {/* Lists */}
            <ActionIcon command="insertUnorderedList" isActive={activeFormats.insertUnorderedList}><ListBullet /></ActionIcon>
            <ActionIcon command="insertOrderedList" isActive={activeFormats.insertOrderedList}><ListNumber /></ActionIcon>
            <Icon onClick={handleChecklist}><Checklist /></Icon>

            <ToolbarDivider />

            {/* Indentation */}
            <ActionIcon command="outdent"><IndentDecrease /></ActionIcon>
            <ActionIcon command="indent"><IndentIncrease /></ActionIcon>

            <ToolbarDivider />

            {/* Colors and Media */}
            <div
              className="flex flex-col items-center justify-center h-8 w-8 hover:bg-gray-100 rounded transition-colors relative overflow-hidden group"
              onMouseDown={saveSelection}
            >
              <span className="font-serif font-bold text-[15px] leading-none relative z-10 pointer-events-none opacity-70 group-hover:opacity-100">A</span>
              <div
                className="w-[12px] h-[3px] mt-[2px] rounded-full relative z-10 pointer-events-none"
                style={{ backgroundColor: activeFormats.foreColor && activeFormats.foreColor !== 'false' && activeFormats.foreColor !== 'rgba(0, 0, 0, 0)' ? activeFormats.foreColor : '#1f2937' }}
              ></div>
              <input
                type="color"
                title="Text color"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                onInput={handleColorChange}
                onChange={handleColorChange}
              />
            </div>
            <ActionIcon command="createLink"><LinkIcon /></ActionIcon>
            <ActionIcon command="insertImage"><ImageIcon /></ActionIcon>
            <Icon onClick={handleVideo}><VideoIcon /></Icon>
            <ActionIcon command="removeFormat">
              <div className="flex items-start font-serif font-bold text-[14px]">
                T<span className="text-[10px] mt-1 ml-[1px]">x</span>
              </div>
            </ActionIcon>
          </div>

          {/* Editor Boundary Area */}
          <div className="flex-1 min-h-0 w-full border-[2px] border-gray-100 rounded-2xl p-6 shadow-[inset_0_2px_12px_rgba(0,0,0,0.03)] outline-none overflow-y-auto mb-4 bg-white focus-within:border-gray-200 transition-colors">
            <div
              className="editor-content w-full h-full outline-none font-[Quicksand] text-gray-800 text-[15px] leading-relaxed relative z-0"
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              onKeyDown={handleEditorKeyDown}
              onBlur={removeGhost}
              onClick={removeGhost}
            >
              Hello There, Welcome to Smart Compose Demo!
            </div>
          </div>

          {/* Floating Action Button overlapping bottom container line */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            {isSuggestionOpen && (
              <div className="absolute bottom-full mb-3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-2 w-[280px] flex flex-col gap-1 z-20">
                {["Thank you for your time!", "Looking forward to hearing from you.", "Please let me know if you have any questions."].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      document.execCommand('insertText', false, suggestion + " ");
                      setIsSuggestionOpen(false);
                    }}
                    className="text-left text-[14px] text-gray-700 hover:bg-[#f6f0ff] hover:text-[#8b3eff] font-medium px-3 py-2 rounded-lg transition-colors border border-transparent"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => setIsSuggestionOpen(!isSuggestionOpen)}
              className="bg-[#8b3eff] hover:bg-[#7b2ef1] text-white px-7 py-2.5 rounded-full shadow-[0_4px_16px_rgba(139,62,255,0.4)] text-[14px] font-medium transition-transform hover:scale-105 active:scale-95 whitespace-nowrap outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b3eff]"
            >
              Sentence Based Suggestion
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Textbox;
