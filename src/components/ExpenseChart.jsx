import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Palette di colori per le fette della torta
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A4DE6C', '#8884d8'];

function ExpenseChart({ transactions }) {
  // 1. Trasformiamo l'array transactions nel formato richiesto da Recharts
  const chartData = transactions.reduce((acc, current) => {
    // Cerchiamo se la categoria della spesa corrente è già nell'accumulatore
    const categoryIndex = acc.findIndex((item) => item.name === current.category);

    if (categoryIndex !== -1) {
      // Se la categoria c'è già, sommiamo l'importo
      acc[categoryIndex].value += current.amount;
    } else {
      // Se non c'è, aggiungiamo la nuova categoria
      acc.push({ name: current.category, value: current.amount });
    }

    return acc;
  }, []);

  // Se non ci sono spese, mostriamo un messaggio anziché un grafico vuoto
  if (transactions.length === 0) {
    return <p>Nessuna spesa da mostrare nel grafico.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
      <h3>📊 Distribuzione Spese per Categoria</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: €${value}`}
          >
            {/* Coloriamo ogni fetta con un colore diverso della palette */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Mostra il fumetto quando passi sopra una fetta con il mouse */}
          <Tooltip formatter={(value) => `€${value}`} />
          {/* Legend mostra la legenda dei colori in basso */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;