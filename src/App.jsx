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
    <div>

      <TransactionForm onAddTransaction={handleAddTransaction} />

      {/* La Lista riceve i dati da App e dice ad App: "Elimina questa spesa!" */}
      <TransactionList 
        transactions={transactions} 
        onDelete={handleDeleteTransaction} 
      />

      <ExpenseChart
        transactions={transactions}
      />

    </div>
  )
}

export default App
