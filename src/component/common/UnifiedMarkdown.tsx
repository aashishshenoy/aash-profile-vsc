import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import go from 'highlight.js/lib/languages/go';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import rust from 'highlight.js/lib/languages/rust';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';
import markdownLang from 'highlight.js/lib/languages/markdown';
import 'highlight.js/styles/vs2015.css';
import mermaid from 'mermaid';
import Breadcrumb from './Breadcrumb';
import { UnifiedMarkdownProps } from '../../types';
import UnderConstructionContent from './UnderConstructionContent';

const UnifiedMarkdown: React.FC<UnifiedMarkdownProps> = (props) => {
  // Extract props with defaults
  const sourceType = props.sourceType || 'general';
  const category = props.category || props.params?.category || '';
  const fileName = props.fileName || props.params?.fileName || '';
  const content = props.content || '';
  const showBreadcrumbs = props.showBreadcrumbs !== false; // Default to true
  
  // State
  const [markdown, setMarkdown] = useState<string>(content);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mermaidDiagrams, setMermaidDiagrams] = useState<Map<string, string>>(new Map());
  
  // Register highlight.js languages
  useEffect(() => {
    // Register commonly used languages
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('cpp', cpp);
    hljs.registerLanguage('csharp', csharp);
    hljs.registerLanguage('go', go);
    hljs.registerLanguage('ruby', ruby);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('rust', rust);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('markdown', markdownLang);
  }, []);
  
  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      darkMode: true,
      securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#3B82F6',
        primaryTextColor: '#E5E7EB',
        primaryBorderColor: '#4B5563',
        lineColor: '#6B7280',
        secondaryColor: '#60A5FA',
        tertiaryColor: '#1F2937'
      }
    });
  }, []);
  
  // Function to process mermaid diagrams
  const processMermaidDiagrams = useCallback(async () => {
    try {
      // Find all mermaid code blocks in the markdown content
      const mermaidRegex = /```mermaid([\s\S]*?)```/g;
      const diagrams = new Map<string, string>();
      let match;
      let index = 0;
      
      while ((match = mermaidRegex.exec(markdown)) !== null) {
        const diagramCode = match[1].trim();
        const id = `mermaid-diagram-${index}`;
        
        try {
          // Generate SVG for the diagram
          const { svg } = await mermaid.render(id, diagramCode);
          diagrams.set(id, svg);
        } catch (err) {
          console.error('Error rendering diagram:', err);
          diagrams.set(id, `<div class="text-red-500">Error rendering diagram</div>`);
        }
        
        index++;
      }
      
      setMermaidDiagrams(diagrams);
    } catch (err) {
      console.error('Error processing mermaid diagrams:', err);
    }
  }, [markdown]);

  // Load markdown content based on source type
  const loadMarkdownContent = useCallback(async () => {
    if (content) {
      setMarkdown(content);
      setLoading(false);
      return;
    }
    
    if (!category || !fileName) {
      setError("Missing category or fileName");
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      let filePath = '';
      
      // Determine file path based on source type
      switch (sourceType) {
        case 'blog':
          filePath = `/src/data/markdown/blogs/${category}/${fileName}`;
          break;
        case 'dsa':
          filePath = `/src/data/markdown/dsa/${category}/${fileName}`;
          break;
        case 'project':
          filePath = `/src/data/markdown/projects/${category}/${fileName}`;
          break;
        case 'gallery':
          filePath = `/src/data/markdown/gallery/${category}/${fileName}`;
          break;
        case 'general':
        default:
          filePath = `/src/data/markdown/${fileName}`;
          break;
      }
      
      // Fetch the markdown file
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown file: ${response.status}`);
      }
      if (response.headers.get('Content-Type') !== 'text/markdown') {
        setLoading(false);
        setMarkdown('');
        return;
      }
      const content = await response.text();
      setMarkdown(content);
      setLoading(false);
    } catch (err) {
      console.error(`Error loading ${sourceType} markdown content:`, err);
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }, [category, fileName, content, sourceType]);
  
  // Load markdown content on component mount
  useEffect(() => {
    loadMarkdownContent();
  }, [loadMarkdownContent]);
  
  // Process mermaid diagrams after markdown content is loaded
  useEffect(() => {
    if (!loading && !error && markdown) {
      processMermaidDiagrams();
    }
  }, [loading, error, markdown, processMermaidDiagrams]);
  
  // Determine breadcrumb segments based on source type
  const getBreadcrumbSegments = (): string[] => {
    if (props.customBreadcrumbSegments) {
      return props.customBreadcrumbSegments;
    }
    
    switch (sourceType) {
      case 'blog':
        return ['blogs', category];
      case 'dsa':
        return ['code', category];
      default:
        return [];
    }
  };
  
  return (
    <div className="p-6 w-full">
      {showBreadcrumbs && (
        <Breadcrumb 
          currentPageTitle={props.customBreadcrumbTitle || fileName.replace('.md', '')}
          customSegments={getBreadcrumbSegments()}
          fileName={fileName}
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 w-full"
      >
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 border border-red-500 rounded mb-4">
            {error}
          </div>
        ) : markdown === '' ?(
          <UnderConstructionContent currentPageTitle={fileName.replace('.md', '')} />
        ) :(
          <div className="markdown-body bg-gray-800 text-gray-300">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize, rehypeRaw]}
              components={{
                h1: (props) => <h1 className="text-2xl font-bold mb-4 text-blue-400" {...props} />,
                h2: (props) => <h2 className="text-xl font-bold mb-3 text-blue-300" {...props} />,
                h3: (props) => <h3 className="text-lg font-bold mb-2 text-blue-200" {...props} />,
                p: (props) => <p className="mb-4" {...props} />,
                a: (props) => <a className="text-blue-400 hover:underline" {...props} />,
                ul: (props) => <ul className="list-disc pl-5 mb-4" {...props} />,
                ol: (props) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                li: (props) => <li className="mb-1" {...props} />,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: ({ className, children, ...props }: any) => {
                  const isInline = props.inline === true;
                  const match = /language-(.+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  // Handle mermaid diagrams
                  if (language === 'mermaid') {
                    // Find the diagram ID based on index
                    let diagramId = '';
                    let index = 0;
                    
                    for (const [id] of mermaidDiagrams.entries()) {
                      if (id === `mermaid-diagram-${index}`) {
                        diagramId = id;
                        break;
                      }
                      index++;
                    }
                    
                    if (diagramId && mermaidDiagrams.has(diagramId)) {
                      // Return the rendered SVG
                      return (
                        <div 
                          className="my-4" 
                          dangerouslySetInnerHTML={{ __html: mermaidDiagrams.get(diagramId) || '' }} 
                        />
                      );
                    }
                    
                    // Fallback if diagram not found
                    return (
                      <div className="bg-gray-900 p-4 rounded mb-4 text-gray-400">
                        <p className="italic">Loading diagram...</p>
                      </div>
                    );
                  }
                  
                  // Handle regular code blocks with syntax highlighting
                  return !isInline ? (
                    <div className="relative">
                      <pre className="bg-[#1E1E1E] rounded-md mb-4 p-4 overflow-x-auto">
                        <code
                          className={language ? `language-${language}` : ''}
                          dangerouslySetInnerHTML={{
                            __html: language
                              ? hljs.highlight(String(children).replace(/\n$/, ''), {
                                  language: language || 'plaintext',
                                  ignoreIllegals: true
                                }).value
                              : hljs.highlightAuto(String(children)).value
                          }}
                        />
                      </pre>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(String(children));
                        }}
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded"
                        title="Copy to clipboard"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <code className="bg-gray-900 px-1 py-0.5 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
                table: (props) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border-collapse border border-gray-700" {...props} />
                  </div>
                ),
                thead: (props) => <thead className="bg-gray-900" {...props} />,
                tbody: (props) => <tbody className="divide-y divide-gray-700" {...props} />,
                tr: (props) => <tr className="hover:bg-gray-700" {...props} />,
                th: (props) => (
                  <th className="px-4 py-2 border border-gray-700 text-left" {...props} />
                ),
                td: (props) => (
                  <td className="px-4 py-2 border border-gray-700" {...props} />
                ),
                blockquote: (props) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic mb-4" {...props} />
                ),
                hr: (props) => <hr className="border-gray-700 my-4" {...props} />,
                img: (props) => (
                  <img className="max-w-full h-auto rounded my-4" {...props} alt={props.alt || ''} />
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UnifiedMarkdown;
