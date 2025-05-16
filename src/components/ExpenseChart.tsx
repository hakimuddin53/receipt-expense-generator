
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Jan',
    Groceries: 400,
    Dining: 240,
    Transportation: 180,
    Entertainment: 90,
  },
  {
    name: 'Feb',
    Groceries: 380,
    Dining: 218,
    Transportation: 150,
    Entertainment: 120,
  },
  {
    name: 'Mar',
    Groceries: 410,
    Dining: 280,
    Transportation: 200,
    Entertainment: 140,
  },
  {
    name: 'Apr',
    Groceries: 390,
    Dining: 310,
    Transportation: 190,
    Entertainment: 110,
  },
  {
    name: 'May',
    Groceries: 430,
    Dining: 290,
    Transportation: 220,
    Entertainment: 180,
  },
  {
    name: 'Jun',
    Groceries: 420,
    Dining: 340,
    Transportation: 200,
    Entertainment: 160,
  },
];

const ExpenseChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value) => [`RM${value}`, undefined]}
          />
          <Legend />
          <Bar dataKey="Groceries" fill="#9b87f5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Dining" fill="#6E59A5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Transportation" fill="#33C3F0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Entertainment" fill="#D946EF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
