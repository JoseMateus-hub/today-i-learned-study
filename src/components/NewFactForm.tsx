import type { RefObject } from "react";
import React, { useState } from "react";

interface NewFactFormProps {
  inputRef: RefObject<HTMLInputElement>;
}

export default function NewFactForm({ inputRef }: NewFactFormProps) {
   const [text, setText] = useState<string>("");
   const [source, setSource] = useState<string>("");
   const [category, setCategory] = useState<string>("");

   const charsRemaining = 200 - text.length;

   function handleSbmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({ text, source, category })
   }

  return (
    <>
      <form onSubmit={handleSbmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Compartilhe algo que você aprendeu hoje..."
          value={text}
          onChange={event => setText(event.target.value)}
          maxLength={200}
        />
        <span>{charsRemaining}</span>
        <input 
         type="text"
         placeholder="URL da fonte (https://...)"
         value={source}
         onChange={event => setSource(event.target.value)}
        />
        <select 
         value={category}
         onChange={event => setCategory(event.target.value)}
        >
          <option value="">selecione uma categoria:</option>
        </select>
        <button type="submit">Publicar</button>
      </form>
    </>
  );
}