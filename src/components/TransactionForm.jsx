import { useState } from 'react';

// Riceve la funzione "onAddTransaction" come Prop dal padre
function TransactionForm({ onAddTransaction }) {
  const [nameInput, setNameInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [typeInput, setTypeInput] = useState('singola');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Crea l'oggetto della nuova spesa
    const newTransaction = {
      id: Date.now(),
      name: nameInput,
      amount: Number(amountInput),
      category: 'Generale',
      type: typeInput
    };

    // 2. Chiama la funzione ricevuta dal Padre passando la nuova spesa!
    onAddTransaction(newTransaction);

    // 3. Reset dei campi
    setNameInput('');
    setAmountInput('');
  };

  return (

    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome Spesa (es. Spotify)" 
        value={nameInput} 
        onChange={(e) => setNameInput(e.target.value)} 
      />

      <input 
        type="number" 
        placeholder="Importo (es. 9.99)" 
        value={amountInput} 
        onChange={(e) => setAmountInput(e.target.value)} 
      />

      <select value={typeInput} onChange={(e) => setTypeInput(e.target.value)}>
        <option value="singola"> Spesa Singola </option>
        <option value="ricorrente"> Abbonamento </option>
      </select>

      <button type="submit">Aggiungi</button>
    </form>
  );
}

export default TransactionForm;