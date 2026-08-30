import { useEffect, useMemo, useState } from "react";

const splitIntoGraphemes = (value) => {
  const text = String(value ?? "");

  if (typeof Intl !== "undefined" && typeof Intl.Segmenter !== "undefined") {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });

    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
};

export const useTypingRotate = (
  words = [],
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 1800,
  options = {},
) => {
  const { startDelay = 250, betweenWordsDelay = 300 } = options;

  const wordsKey = JSON.stringify(Array.isArray(words) ? words : []);

  const stableWords = useMemo(() => {
    try {
      const parsedWords = JSON.parse(wordsKey);

      return parsedWords
        .map((word) => String(word ?? "").trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [wordsKey]);

  const [wordIndex, setWordIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentWord =
    stableWords.length > 0 ? stableWords[wordIndex % stableWords.length] : "";

  const characters = useMemo(
    () => splitIntoGraphemes(currentWord),
    [currentWord],
  );

  const text = useMemo(
    () => characters.slice(0, characterIndex).join(""),
    [characters, characterIndex],
  );

  useEffect(() => {
    setWordIndex(0);
    setCharacterIndex(0);
    setIsDeleting(false);
    setHasStarted(false);
  }, [wordsKey]);

  useEffect(() => {
    if (stableWords.length === 0) {
      return undefined;
    }

    let delay;

    if (!hasStarted) {
      delay = startDelay;
    } else if (!isDeleting) {
      delay = characterIndex >= characters.length ? pauseDuration : typingSpeed;
    } else {
      delay = characterIndex <= 0 ? betweenWordsDelay : deletingSpeed;
    }

    const timeout = setTimeout(() => {
      if (!hasStarted) {
        setHasStarted(true);
        return;
      }

      if (!isDeleting) {
        if (characterIndex < characters.length) {
          setCharacterIndex((current) =>
            Math.min(current + 1, characters.length),
          );

          return;
        }

        setIsDeleting(true);
        return;
      }

      if (characterIndex > 0) {
        setCharacterIndex((current) => Math.max(current - 1, 0));

        return;
      }

      setIsDeleting(false);
      setWordIndex((current) => (current + 1) % stableWords.length);
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    stableWords,
    characters.length,
    characterIndex,
    isDeleting,
    hasStarted,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    startDelay,
    betweenWordsDelay,
  ]);

  return text;
};
