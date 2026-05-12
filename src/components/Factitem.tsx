import type { Fact } from '../types';

interface FactItemProps {
    fact: Fact;
}

export default function Factitem({ fact }: FactItemProps) {
    return (
        <li className="fact">