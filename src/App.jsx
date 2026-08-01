import { useState } from 'react';
import TransactionForm from './components/TransactionForm';

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Netflix', amount: 12.99, category: 'Intrattenimento' },
  // ...
];

function App() {

  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  }; 

  const totalAmount = transactions.reduce((acc, item) => acc + item.amount, 0);

  const handleDelete = (idToDelete) => {
  // Usa .filter() per tenere solo gli elementi con id DIVERSO da idToDelete!
  const updatedTransactions = transactions.filter(item => item.id !== idToDelete);
  setTransactions(updatedTransactions);
  };

  return ( 
    <div>

      <TransactionForm onAddTransaction={handleAddTransaction} />
      
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
