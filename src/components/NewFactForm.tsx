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
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-start gap-4 bg-neutral-800 px-6 py-5 mx-6 rounded-2xl mb-6"
    >
      <div className="flex flex-col flex-1 min-w-[240px]">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Compartilhe algo que você aprendeu hoje..."
            value={text}
            onChange={event => setText(event.target.value)}
            maxLength={200}
            className="flex-1 bg-neutral-700 text-white placeholder-neutral-400 rounded-lg px-3 py-2 outline-none"
          />
          <span className="text-neutral-400 text-sm whitespace-nowrap">{charsRemaining}</span>
        </div>
        {error.text?.[0] && <span className="text-red-400 text-sm mt-1">{error.text[0]}</span>}
      </div>

      <div className="flex flex-col min-w-[200px]">
        <input
          type="text"
          placeholder="Fonte confiável"
          value={source}
          onChange={event => setSource(event.target.value)}
          className="bg-neutral-700 text-white placeholder-neutral-400 rounded-lg px-3 py-2 outline-none"
        />
        {error.source?.[0] && <span className="text-red-400 text-sm mt-1">{error.source[0]}</span>}
      </div>

      <div className="flex flex-col min-w-[180px]">
        <select
          value={category}
          onChange={event => setCategory(event.target.value)}
          className="bg-neutral-700 text-white rounded-lg px-3 py-2 outline-none"
        >
          <option value="">Selecione uma categoria</option>
          {categoryOptions}
        </select>
        {error.category?.[0] && <span className="text-red-400 text-sm mt-1">{error.category[0]}</span>}
      </div>

      <button
        type="submit"
        className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-2 text-white font-bold"
      >
        Publicar
      </button>
    </form>
  );
}