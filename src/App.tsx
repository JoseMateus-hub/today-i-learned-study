import { useState, useRef, useEffect } from 'react';
import type { Fact } from './types';
import Header from './components/Header';
import FactList from './components/FactList';
import CategoryFilter from './components/CategoryFilter';
import NewFactForm from './components/NewFactForm';
import { SupabaseClient } from '@supabase/supabase-js';

const supabase = new SupabaseClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  function handleToggleForm() {
    setShowForm(show => !show);
  }
  
  function handleSelectCategory(category: string) {
    setCurrentCategory(category);
  }

  const formInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) {
      formInputRef.current?.focus();
    }
  }, [showForm]);

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      
      let query = supabase
      .from('facts')
      .select('*')
      .order('created_at', { ascending: false });

      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory);
      }

      const { data, error } = await query;

      if (error) {
        setError('Houve um erro ao carregar os fatos. Tente novamente mais tarde.');
        setIsLoading(false);
        return;
      } 
        setFacts(data as Fact[]);
        setIsLoading(false);
    }

    getFacts();
  }, [currentCategory]);

  function handleVote(id: number, type: 'votes_interesting' | 'votes_mindblowing' | 'votes_false') {
  setFacts(facts =>
    facts.map(fact =>
      fact.id === id ? { ...fact, [type]: fact[type] + 1 } : fact
    )
  );
}

  return (
    <>
      <Header
        showForm={showForm}
        onToggleForm={handleToggleForm}
      />
      {showForm && <NewFactForm inputRef={formInputRef} />}
     <main className="flex flex-col md:flex-row gap-6 px-6">
     <CategoryFilter
       currentCategory={currentCategory}
       onSelectCategory={handleSelectCategory}
       />
       <FactList 
       facts={facts} 
       isLoading={isLoading}
       error={error}
       onVote={handleVote} />
      </main>
    </>
  );
}