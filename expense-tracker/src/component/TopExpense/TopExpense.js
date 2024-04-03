import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function TopExpense({ data }) {
  const copyData = [...data];

  return (
    <div className="bar-chart-container">
      <ResponsiveContainer
        width="100%"
        height={100}
        margin={{ top: 50, right: 10, left: 20, bottom: 0 }}
        className="recharts-responsive-container"
      >
        <BarChart data={copyData} layout="vertical">
          <XAxis type="number" hide className="recharts-cartesian-axis-line" />
          <YAxis
            type="category"
            dataKey="name"
            width={105}
            className="recharts-yAxis"
          />
          <Bar dataKey="value" fill="#8884d8" className="recharts-bar" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
