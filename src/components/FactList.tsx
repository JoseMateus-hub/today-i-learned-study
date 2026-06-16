import type { Fact } from '../types';
import FactItem from './FactItem';

interface FactListProps {
  facts: Fact[];
  isLoading?: boolean;
  error?: string | null;
  onVote: (id: number, type: 'votes_interesting' | 'votes_mindblowing' | 'votes_false') => void;
}

export default function FactList({ facts, isLoading, error, onVote }: FactListProps) {
  if (isLoading) {
    return <p className='text-[32px] font-semibold flex-1'>Carregando...</p>;
  }

  if (error) {
    return <p className='text-[32px] font-semibold flex-1'>{error}</p>;
  }

  if (facts.length === 0) {
    return <p className='text-[32px] font-semibold flex-1'>Nenhum fato encontrado para esta categoria.</p>;
  }

  return (
    <ul className="flex flex-col gap-3 py-4 max-w-3xl">
      {facts.map(fact => (
        <FactItem key={fact.id} fact={fact} onVote={onVote} />
      ))}
    </ul>
  );
}