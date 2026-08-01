import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Netflix', amount: 12.99, category: 'Intrattenimento' },
  // ...
];


function App() {

  // L'UNICA fonte di verità delle spese vive qui nel Padre!
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

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

    </div>
  )
}

export default App
