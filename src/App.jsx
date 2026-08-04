import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Netflix', amount: 12.99, category: 'Intrattenimento', type: 'singola'},
  // ...
];


function App() {

  const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem('transactions');
  if (saved) {
    return JSON.parse(saved); // Se esistono spese salvate, usa quelle!
  }
  return MOCK_TRANSACTIONS; // Altrimenti usa i dati di prova
});

// 💾 SALVATAGGIO AUTOMATICO: Ogni volta che "transactions" cambia, salviamo su localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 1. Funzione per aggiungere
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // 2. Funzione per eliminare
  const handleDeleteTransaction = (idToDelete) => {
    setTransactions(transactions.filter((item) => item.id !== idToDelete));
  };

return ( 
  <div className="app-container">
    <h1>💼 Finance Dashboard</h1>

    {/* Card 1: Form per inserire nuova spesa */}
    <section className="card">
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </section>

    {/* Card 2: Grafico a torta delle spese */}
    <section className="card">
      <ExpenseChart transactions={transactions} />
    </section>

    {/* Card 3: Lista, Filtri e Totali */}
    <section className="card">
      <TransactionList 
        transactions={transactions} 
        onDelete={handleDeleteTransaction} 
      />
    </section>
  </div>
);
}

export default App
