function TransactionList({ transactions, onDelete }) {
  // Il totale lo calcoliamo direttamente sulle spese che arrivano come Prop dal Padre
  const totalAmount = transactions.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div>
      <ul>
        {transactions.map((item) => (
          <li key={item.id}>
            {item.name} - {item.amount} - {item.category}
            
            {/* Quando clicchi, dici semplicemente al Padre di eliminare questo ID */}
            <button onClick={() => onDelete(item.id)}>x</button>
          </li> 
        ))}
      </ul>

      <h2>Total Amount: ${totalAmount}</h2>
    </div>
  );
}

export default TransactionList;