import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RefreshCw, Download } from 'lucide-react';
import Breadcrumb from '../../common/Breadcrumb';
import { PyodideInstance } from '../../../types';

// Default Python code
const DEFAULT_CODE = `# Welcome to the Python Playground
# Try running some Python code!

def greet(name):
    return f"Hello, {name}! Welcome to Aashish's VS Code-themed profile."

# Call the function
result = greet("Visitor")
print(result)

# Try some more complex code
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squared}")
`;

const CodeContent: React.FC = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Loading Python environment...');
  
  const pyoditeRef = useRef<PyodideInstance | null>(null);

  // Load Pyodide
  useEffect(() => {
    async function loadPyodide() {
      try {
        setLoadingStatus('Loading Python environment...');
        
        // Use a script tag to load pyodide.js from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
          try {
            setLoadingStatus('Initializing Python runtime...');
            // @ts-expect-error - Pyodide will be available on window after script loads
            const pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
            });
            
            // Store pyodide instance in ref
            pyoditeRef.current = pyodide;
            
            // Setup stdout capture
            pyodide.runPython(`
              import sys
              from pyodide.ffi import to_js
              
              class PyodideOutput:
                  def __init__(self):
                      self.output = ""
                  
                  def write(self, text):
                      self.output += text
                  
                  def flush(self):
                      pass
                      
              sys.stdout = PyodideOutput()
              sys.stderr = PyodideOutput()
            `);
            
            setPyodideLoaded(true);
            setLoadingStatus('Python environment ready!');
          } catch (error) {
            console.error('Failed to initialize Pyodide:', error);
            setLoadingStatus('Failed to initialize Python environment. Please refresh the page.');
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load Pyodide script');
          setLoadingStatus('Failed to load Python environment. Please check your internet connection.');
        };
        
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setLoadingStatus('Failed to load Python environment. Please refresh the page.');
      }
    }
    
    loadPyodide();
    
    // Cleanup
    return () => {
      // Any cleanup if needed
    };
  }, []);

  const runCode = async () => {
    if (!pyoditeRef.current) return;
    
    setIsRunning(true);
    setOutput('Running...');
    
    try {
      // Clear previous stdout
      pyoditeRef.current.runPython(`
        sys.stdout.output = ""
        sys.stderr.output = ""
      `);
      
      // Run the code
      pyoditeRef.current.runPython(code);
      
      // Get the output
      const stdout = pyoditeRef.current.runPython("sys.stdout.output") as string;
      const stderr = pyoditeRef.current.runPython("sys.stderr.output") as string;
      
      setOutput(stdout + stderr);
    } catch (error) {
      // Handle the error with proper type checking
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(DEFAULT_CODE);
    setOutput('');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python_code.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 w-full h-full flex flex-col">
      <Breadcrumb currentPageTitle="Python Playground" customSegments={['code']} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 w-full flex-1 flex flex-col"
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Python Playground</h2>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-md flex items-center ${
                pyodideLoaded ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'
              }`}
              onClick={runCode}
              disabled={!pyodideLoaded || isRunning}
            >
              <Play size={16} className="mr-2" />
              Run
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
              onClick={resetCode}
            >
              <RefreshCw size={16} className="mr-2" />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md flex items-center"
              onClick={downloadCode}
            >
              <Download size={16} className="mr-2" />
              Download
            </motion.button>
          </div>
        </div>

        {!pyodideLoaded ? (
          <div className="flex-1 flex items-center justify-center bg-gray-900 rounded-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg">{loadingStatus}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-md overflow-hidden h-[500px]">
              <div className="bg-gray-800 px-4 py-2 text-sm font-medium border-b border-gray-700">
                code.py
              </div>
              <Editor
                height="calc(100% - 36px)"
                defaultLanguage="python"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  tabSize: 4,
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="bg-gray-900 rounded-md overflow-hidden h-[500px] flex flex-col">
              <div className="bg-gray-800 px-4 py-2 text-sm font-medium border-b border-gray-700">
                Output
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                {output || 'Run your code to see output here'}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CodeContent;
