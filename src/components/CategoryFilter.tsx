import { CATEGORIES } from "../constants";

interface CategoryFilterProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
    currentCategory,
    onSelectCategory,
}: CategoryFilterProps) {

  
  return (
    <aside>
      <h2>Filtrar por categoria</h2>
      <ul>
        <li key="all">
          <button
            className={currentCategory === 'all' ? 'active' : ''}
            onClick={() => onSelectCategory('all')}
            disabled={currentCategory === 'all'}
          >
            Todos
          </button>
        </li>
        {CATEGORIES.map(category => (
          <li key={category.value}>
            <button onClick={() => onSelectCategory(category.value)}
              disabled={currentCategory === category.value}
              >{category.label}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}