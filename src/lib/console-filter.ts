// Console filter utility to reduce development noise
// Only applies in development mode

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Store original console methods
  const originalWarn = console.warn;
  const originalLog = console.log;
  const originalError = console.error;

  // List of messages to filter out
  const filterPatterns = [
    /Download the React DevTools/,
    /Provider initialised/,
    /TrunkLink initiated/,
    /deprecation warning: tableOnly/,
    /Fast Refresh/,
    /React-server-dom-webpack/,
    /Warning: ReactDOM.render is no longer supported/,
  ];

  // Filter function
  const shouldFilter = (message: string) => {
    return filterPatterns.some(pattern => pattern.test(message));
  };

  // Override console.warn
  console.warn = (...args) => {
    const message = args.join(' ');
    if (!shouldFilter(message)) {
      originalWarn.apply(console, args);
    }
  };

  // Override console.log for specific patterns
  console.log = (...args) => {
    const message = args.join(' ');
    if (!shouldFilter(message)) {
      originalLog.apply(console, args);
    }
  };

  // Keep errors but filter some development noise
  console.error = (...args) => {
    const message = args.join(' ');
    // Only filter very specific development-only errors
    if (!shouldFilter(message)) {
      originalError.apply(console, args);
    }
  };
}

export {}; 