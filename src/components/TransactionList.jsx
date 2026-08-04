import { useState } from "react";

function TransactionList({ transactions, onDelete }) {

  // 1. Stato del filtro (DENTRO la funzione)
  const [filterCategory, setFilterCategory] = useState('tutte');

  // 2. Array di transazioni visibili (filtrate)
  const visibleTransactions = filterCategory === 'tutte' 
    ? transactions 
    : transactions.filter(item => item.category === filterCategory);

    // 3. Calcoli basati sulle transazioni VISIBILI
  const totalAmount = visibleTransactions.reduce((acc, item) => acc + item.amount, 0);
  const subscriptionTotal = visibleTransactions.filter(item => item.type === 'ricorrente').reduce((acc, item) => acc + item.amount, 0);
  const singleExpenseTotal = visibleTransactions.filter(item => item.type === 'singola').reduce((acc, item) => acc + item.amount, 0);
  
    return (
    <div>
      {/* Menu a tendina per cambiare il filtro */}
      <div>
        <label>Filtra per categoria: </label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="tutte">Tutte le categorie</option>
          <option value="Cibo">Cibo</option>
          <option value="Casa">Casa</option>
          <option value="Intrattenimento">Intrattenimento</option>
        </select>
      </div>

      <ul className="transaction-list">
        {/* Usiamo visibleTransactions per stampare la lista */}
        {visibleTransactions.map((item) => (
          <li className="transaction-item" key={item.id}>
            {item.name} - €{item.amount} - <strong>{item.category}</strong> - {item.type === 'ricorrente' ? '🔄 Abbonamento' : '💳 Spesa'}
            <button onClick={() => onDelete(item.id)}>x</button>
          </li> 
        ))}
      </ul>
      
      <div className="summary">
        <p>🔄 Totale Abbonamenti: €{subscriptionTotal}</p>
        <p>💳 Totale Spese Singole: €{singleExpenseTotal}</p>
        <h2>💰 Totale Complessivo: €{totalAmount}</h2>
      </div>
    </div>
  );
}

export default TransactionList;