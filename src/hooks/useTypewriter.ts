import { useState, useEffect } from 'react';

interface TypewriterResult {
  displayText: string;
  isDone: boolean;
}

export function useTypewriter(
  text: string,
  wordsPerSecond = 10,
  enabled = true
): TypewriterResult {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setWordIndex(text.split(' ').length);
      return;
    }
    setWordIndex(0);

    const words = text.split(' ');
    if (words.length === 0) return;

    const delay = Math.floor(1000 / wordsPerSecond);
    let current = 0;

    const id = setInterval(() => {
      current += 1;
      setWordIndex(current);
      if (current >= words.length) clearInterval(id);
    }, delay);

    return () => clearInterval(id);
  }, [text, wordsPerSecond, enabled]);

  const words = text.split(' ');
  return {
    displayText: words.slice(0, wordIndex).join(' '),
    isDone: wordIndex >= words.length,
  };
}
