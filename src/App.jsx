import { useState } from 'react';

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Netflix', amount: 12.99, category: 'Intrattenimento' },
  // ...
];

function App() {
  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const handleSubmit = (e) => {
  e.preventDefault(); // 1. Evita il ricaricamento della pagina

  // 2. Crea l'oggetto della nuova spesa
  const newTransaction = {
    id: Date.now(),
    name: nameInput,
    amount: Number(amountInput),
    category: 'Generale'
  };

  // 3. Aggiorna la lista aggiungendo la nuova spesa a quelle esistenti
  setTransactions([...transactions, newTransaction]);

  // 4. Reset dei campi
  setNameInput('');
  setAmountInput('');
  };

  const totalAmount = transactions.reduce((acc, item) => acc + item.amount, 0);

  const handleDelete = (idToDelete) => {
  // Usa .filter() per tenere solo gli elementi con id DIVERSO da idToDelete!
  const updatedTransactions = transactions.filter(item => item.id !== idToDelete);
  setTransactions(updatedTransactions);
  };

  return ( 
    <div>

      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='Nome Spesa (es. Spotify)' 
          value={nameInput} 
          onChange={(e) => setNameInput(e.target.value)}
        />

        <input type="number" placeholder='Nome Spesa (es. 9.99)' 
          value={amountInput} 
          onChange={(e) => setAmountInput(e.target.value)}
        />

        <button type='submit'>Aggiungi</button>

      </form>

      <ul>

        {transactions.map((item) => (
          <li key={item.id}>
            {item.name} - {item.amount} - {item.category}
            
            <button onClick={() => handleDelete(item.id)}>x</button>
          </li> 
        ))}
      </ul>

      <h2>
        Total Amount: ${totalAmount}
      </h2>


    </div>
  )
}

export default App
