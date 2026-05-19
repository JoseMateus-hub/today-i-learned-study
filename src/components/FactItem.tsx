import type { Fact } from '../types';

interface FactItemProps {
    fact: Fact;
}

export default function FactItem({ fact }: FactItemProps) {
    return (
        <li className="fact">
            <p>{fact.text}</p>
            <a href={fact.source} target="_blank" rel="noopener noreferrer">Fonte</a>
        </li>
    );
}