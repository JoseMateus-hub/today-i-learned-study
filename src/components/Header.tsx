interface HeaderProps {
    showForm: boolean;
    onToggleForm: () => void;
};

export default function Header({ showForm, onToggleForm }: HeaderProps) {
    return (
        <>
        <span>🧠</span>
          <h1>hoje eu aprendi</h1>
          <button onClick={onToggleForm}>{showForm ? "Fechar" : "Novo Fato"}</button>
        </>
    );
}