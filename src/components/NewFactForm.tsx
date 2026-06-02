import type { RefObject } from "react";
import React, { useState } from "react";
import { CATEGORIES } from "../constants";
import { factSchema } from "../schemas";
import { flattenError } from "zod/v4/core";


interface NewFactFormProps {
  inputRef: RefObject<HTMLInputElement>;
}

export default function NewFactForm({ inputRef }: NewFactFormProps) {
   const [text, setText] = useState<string>("");
   const [source, setSource] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [error, setError] = useState<Record<string, string[]>>({});

   const charsRemaining = 200 - text.length;

   function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const result = factSchema.safeParse({text, source, category});
        if (!result.success) {
           setError(flattenError(result.error).fieldErrors);
          return;
        };

        setError({});
   }

   const categoryOptions = CATEGORIES.map((category) => (
     <option
       key={category.value}
       value={category.value}
     >{category.label}</option>
   ))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Compartilhe algo que você aprendeu hoje..."
          value={text}
          onChange={event => setText(event.target.value)}
          maxLength={200}
        />
        <span>{charsRemaining}</span>
        {error.text?.[0] && <span>{error.text[0]}</span>}
        <input
          type="text"
          placeholder="fonte confi"
          value={source}
          onChange={event => setSource(event.target.value)}
        />
        {error.source?.[0] && <span>{error.source[0]}</span>}
        <select
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option value="">selecione uma categoria:</option>
          {categoryOptions}
        </select>
        {error.category?.[0] && <span>{error.category[0]}</span>}
        <button type="submit">Publicar</button>
      </form>
    </>
  );
}