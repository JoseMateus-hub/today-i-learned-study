import type { Fact } from '../types';
import { CATEGORIES } from '../constants';

interface FactItemProps {
  fact: Fact;
  onVote: (id: number, type: 'votes_interesting' | 'votes_mindblowing' | 'votes_false') => void;
}

export default function FactItem({ fact, onVote }: FactItemProps) {
  const categoryInfo = CATEGORIES.find(c => c.value === fact.category);

  return (
    <li className="bg-neutral-800 rounded-2xl p-5 flex items-center justify-between gap-4">
      <p className="text-white flex-1">
        {fact.text}{' '}
        <a
          href={fact.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 text-sm underline ml-1"
        >
          (Fonte)
        </a>
      </p>

      <span
        className={`${categoryInfo?.color ?? 'bg-neutral-600'} text-white text-xs font-bold uppercase px-3 py-1 rounded-full whitespace-nowrap`}
      >
        {categoryInfo?.label ?? fact.category}
      </span>

      <div className="flex items-center gap-2 text-white text-sm">
        <button
          onClick={() => onVote(fact.id, 'votes_interesting')}
          className="bg-neutral-700 px-2 py-1 rounded-full hover:bg-neutral-600 cursor-pointer transition-colors"
        >
          👍 {fact.votes_interesting}
        </button>
        <button
          onClick={() => onVote(fact.id, 'votes_mindblowing')}
          className="bg-neutral-700 px-2 py-1 rounded-full hover:bg-neutral-600 cursor-pointer transition-colors"
        >
          🤯 {fact.votes_mindblowing}
        </button>
        <button
          onClick={() => onVote(fact.id, 'votes_false')}
          className="bg-neutral-700 px-2 py-1 rounded-full hover:bg-neutral-600 cursor-pointer transition-colors"
        >
          ⛔ {fact.votes_false}
        </button>
      </div>
    </li>
  );
}