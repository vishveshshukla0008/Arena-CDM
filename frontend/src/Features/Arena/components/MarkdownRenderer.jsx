import React, { useState } from "react";

/**
 * Renders standard text and intercepts triple-backtick code blocks to render them with
 * a dark background and a copy button.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split content by markdown code blocks (```language ... ```)
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="font-['Manrope'] text-[13px] text-[#aba9bf] leading-relaxed break-words flex flex-col gap-2">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // Extract language and code body
          const lines = part.slice(3, -3).split("\n");
          const language = lines[0].trim() || "text";
          const code = lines.slice(1).join("\n").trim();

          return <CodeBlock key={index} language={language} code={code} />;
        }

        // Render normal text with basic markdown parsing for headers, bold, and lists
        if (!part.trim()) return null;
        
        return <MarkdownText key={index} text={part} />;
      })}
    </div>
  );
}

function MarkdownText({ text }) {
  const lines = text.split('\n');
  const elements = [];

  let i = 0;
  while (i < lines.length) {
    let line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    // Reusable parse bold function
    const parseBold = (str) => {
       const chunks = str.split(/(\*\*.*?\*\*)/g);
       return chunks.map((chunk, j) => {
         if (chunk.startsWith('**') && chunk.endsWith('**')) {
           return <strong key={j} className="text-[#e6e3fb] font-bold">{chunk.slice(2, -2)}</strong>;
         }
         return chunk;
       });
    };

    // Detect Markdown Tables (Lines bounded by pipes)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').slice(1, -1).map(s => s.trim());
        // skip tableLines[1] because it is just the separator row `|---|---|`
        const rows = tableLines.slice(2).map(r => r.split('|').slice(1, -1).map(s => s.trim()));

        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-4 rounded-xl border border-[#474659]/30 bg-[#111124] shadow-md">
            <table className="w-full text-left border-collapse text-sm min-w-[400px]">
              <thead>
                <tr className="bg-[#18182b] border-b border-[#cf96ff]/30">
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 font-bold text-[#00e3fd] whitespace-nowrap tracking-wider uppercase text-xs">
                      {parseBold(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#474659]/20">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#1d1d33] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-[#e6e3fb] leading-relaxed">
                        {parseBold(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Process other single-line elements
    let element = null;
    if (line.startsWith('### ')) {
      element = <h3 key={i} className="text-lg font-bold text-[#e6e3fb] mt-2 mb-1">{parseBold(line.slice(4))}</h3>;
    } else if (line.startsWith('## ')) {
      element = <h2 key={i} className="text-xl font-black text-[#cf96ff] mt-3 mb-1">{parseBold(line.slice(3))}</h2>;
    } else if (line.startsWith('# ')) {
      element = <h1 key={i} className="text-2xl font-black text-white mt-4 mb-2">{parseBold(line.slice(2))}</h1>;
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      element = (
        <div key={i} className="flex pl-2 items-start gap-2">
          <span className="text-[#00e3fd] mt-0.5">•</span>
          <span>{parseBold(line.trim().replace(/^[-*]\s/, ''))}</span>
        </div>
      );
    } else {
      element = <div key={i} className="whitespace-pre-wrap">{parseBold(line)}</div>;
    }

    elements.push(element);
    i++;
  }

  return <div className="flex flex-col gap-3">{elements}</div>;
}

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSyntaxHighlightedNode = (rawContent) => {
    // Escape HTML first
    let escaped = rawContent
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Unified Tokenizer Regex (guarantees safe non-overlapping HTML replacement)
    const syntaxRegex = /(\/\/.*|\/\*[\s\S]*?\*\/|#\s.*)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|\b(const|let|var|function|return|if|else|import|export|from|default|class|extends|new|this|await|async|try|catch|def|for|while|switch|case|break|continue|True|False|None)\b|([a-zA-Z_$][0-9a-zA-Z_$]*)(?=\s*\()|\b([A-Z][a-zA-Z0-9_]*)\b|\b(\d+)\b/g;

    const highlighted = escaped.replace(syntaxRegex, (match, comment, string, keyword, func, cls, number) => {
      if (comment) return `<span style="color: #6a9955;">${comment}</span>`;
      if (string) return `<span style="color: #ce9178;">${string}</span>`;
      if (keyword) return `<span style="color: #569cd6;">${keyword}</span>`;
      if (func) return `<span style="color: #dcdcaa;">${func}</span>`;
      if (cls) return `<span style="color: #4ec9b0;">${cls}</span>`;
      if (number) return `<span style="color: #b5cea8;">${number}</span>`;
      return match;
    });

    return { __html: highlighted };
  };

  return (
    <div className="my-4 rounded-md overflow-hidden bg-black border border-[#474659]/30 font-mono text-[13px] shadow-sm">
      {/* ChatGPT-style Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2f2f2f] text-[#b4b4b4]">
        <span className="text-xs font-semibold">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
             <span className="flex items-center gap-1.5">
               <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                 <polyline points="20 6 9 17 4 12"></polyline>
               </svg>
               Copied!
             </span>
          ) : (
             <>
               <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                 <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                 <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
               </svg>
               Copy code
             </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto bg-[#0d0d0d] text-[#d4d4d4]">
        <pre className="m-0 leading-relaxed font-mono">
          <code dangerouslySetInnerHTML={getSyntaxHighlightedNode(code)} />
        </pre>
      </div>
    </div>
  );
}
