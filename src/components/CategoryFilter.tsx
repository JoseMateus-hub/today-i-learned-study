import { CATEGORIES } from "../constants";

interface CategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  technology: 'bg-blue-500',
  science: 'bg-green-500',
  finance: 'bg-red-500',
  society: 'bg-yellow-500',
  entertainment: 'bg-pink-500',
  health: 'bg-teal-500',
  history: 'bg-orange-500',
  news: 'bg-purple-500',
};

export default function CategoryFilter({
    currentCategory,
    onSelectCategory,
}: CategoryFilterProps) {
  return (
    <aside className="w-full md:w-56 px-6 py-4">
      <ul className="flex flex-col gap-2">
        <li key="all">
          <button
            className={`btn w-full py-2 text-white ${
              currentCategory === 'all'
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
                : 'bg-neutral-700'
            }`}
            onClick={() => onSelectCategory('all')}
            disabled={currentCategory === 'all'}
          >
            Todos
          </button>
        </li>
        {CATEGORIES.map(category => (
          <li key={category.value}>
            <button
              className={`btn w-full py-2 text-white ${CATEGORY_COLORS[category.value] ?? 'bg-neutral-700'} ${
                currentCategory === category.value ? 'opacity-60' : ''
              }`}
              onClick={() => onSelectCategory(category.value)}
              disabled={currentCategory === category.value}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}