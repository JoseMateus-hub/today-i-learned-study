import React, { useState, useRef, useEffect } from 'react';
import type { Fact } from './types';
import Header from './components/Header';
import FactList from './components/FactList';
import CategoryFilter from './components/CategoryFilter';
import NewFactForm from './components/NewFactForm';

const INITIAL_FACTS: Fact[] = [{
  id: 1,
  text: 'React foi criado pelo Facebook em 2013 e liberado como open source.',
  source: 'https://reactjs.org',
  category: 'technology',
  votes_interesting: 24,
  votes_mindblowing: 9,
  votes_false: 1,
  created_at: '2024-01-01T00:00:00Z',
}, {
  id: 2,
  text: 'O cérebro humano tem aproximadamente 86 bilhões de neurônios.',
  source: 'https://www.ncbi.nlm.nih.gov',
  category: 'science',
  votes_interesting: 41,
  votes_mindblowing: 22,
  votes_false: 0,
  created_at: '2024-01-02T00:00:00Z',
}, {
  id: 3,
  text: 'O Brasil é o maior produtor de café do mundo há mais de 150 anos.',
  source: 'https://www.embrapa.br',
  category: 'history',
  votes_interesting: 18,
  votes_mindblowing: 5,
  votes_false: 2,
  created_at: '2024-01-03T00:00:00Z',
}];

export default function App() {
  const [facts, setFacts] = useState<Fact[]>(INITIAL_FACTS);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState<boolean>(false);

  const displayedFacts = currentCategory === 'all'
    ? facts
    : facts.filter(fact => fact.category === currentCategory);

  function handleToggleForm() {
    setShowForm(show => !show);
  }
  
  function handleSelectCategory(category: string) {
    setCurrentCategory(category);
  }

  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const formInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) {
      formInputRef.current?.focus();
    }
  }, [showForm]);

  return (
    <>
      {time}
      <Header
        showForm={showForm}
        onToggleForm={handleToggleForm}
      />
      {showForm && <NewFactForm inputRef={formInputRef} />}
      <main>
        <CategoryFilter
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
        />
        <FactList facts={displayedFacts} />
      </main>
    </>
  );
}