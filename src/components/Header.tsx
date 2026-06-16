interface HeaderProps {
    showForm: boolean;
    onToggleForm: () => void;
};

export default function Header({ showForm, onToggleForm }: HeaderProps) {
    return (
        <header className="flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-3">
                <span className="text-3xl">🧠</span>
                <h1 className="text-2xl text-white tracking-wide">
                    Hoje Eu Aprendi
                </h1>
            </div>

            <button
                onClick={onToggleForm}
                className="btn bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-3 text-white font-bold"
        >
                {showForm ? "Fechar" : "Novo Fato"}
            </button>
        </header>
    );
}