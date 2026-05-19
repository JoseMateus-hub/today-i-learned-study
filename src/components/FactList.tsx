import type { Fact } from '../types';
import FactItem from './FactItem';  

interface FactListProps {
  facts: Fact[];
};

export default function FactList({ facts }: FactListProps) {
  if (facts.length === 0) {
    return <p>Nenhum fato encontrado para esta categoria.</p>;
  }

  return (
    <ul>
      {facts.map(fact => (
        <FactItem key={fact.id} fact={fact} />
      ))}
    </ul>
  );
}