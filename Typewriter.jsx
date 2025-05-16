import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Typed from 'typed.js';

const InputWrapper = styled.div`
  display: block;
  font-family: monospace;
  font-size: 125%;
  width: 50%;
`;

const InputField = styled.input`
  display: block;
  appearance: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;

  &:focus,
  &:active {
    + .placeholder {
      display: none;
    }
  }
`;

const Placeholder = styled.span`
  pointer-events: none;
`;

const Typewriter = () => {
  const inputRef = useRef(null);
  const placeholderRef = useRef(null);
  const [typedInstance, setTypedInstance] = useState(null);

  useEffect(() => {
    const options = {
      strings: [
        "Collaborative Excel-like Editor",
        "Collab Doc Editor"
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      onStart: () => {
        if (inputRef.current) {
          inputRef.current.style.display = 'none';
        }
      },
      onComplete: () => {
        if (inputRef.current) {
          inputRef.current.style.display = 'block';
        }
      }
    };

    const typed = new Typed(placeholderRef.current, options);
    setTypedInstance(typed);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <InputWrapper>
      <InputField
        ref={inputRef}
        aria-label="Ask us anything"
        placeholder=" " // Empty placeholder to avoid default text
      />
      <Placeholder ref={placeholderRef} />
    </InputWrapper>
  );
};

export default Typewriter;
