import { useState, useEffect } from 'react';

export const useTypingRotate = (words, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 1800) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);

    useEffect(() => {
        const currentWordIndex = loopNum % words.length;
        const fullWord = words[currentWordIndex];

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        // إذا اكتملت الكلمة، ننتظر قليلاً قبل بدء الحذف
        if (!isDeleting && text === fullWord) {
            speed = pauseDuration;
        }

        const timeout = setTimeout(() => {
            if (isDeleting) {
                // عملية الحذف
                setText(fullWord.substring(0, text.length - 1));
            } else {
                // عملية الكتابة
                setText(fullWord.substring(0, text.length + 1));
            }

            // تبديل الحالة بين الكتابة والحذف
            if (!isDeleting && text === fullWord) {
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDuration]);

    return text;
};