import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useWeeklyProgress } from "./WeeklyProgressContext";

const WeeklyProgress: React.FC = () => {
  const { problemsByDay } = useWeeklyProgress();

  console.log(problemsByDay)

  // Transform data into recharts format
  const chartData = Object.entries(problemsByDay).map(([day, count]) => ({
    day: day.slice(0, 3),
    count,
    displayCount: count === 0 ? 0.2 : count
  }));

  return (
    <div className="bg-[rgba(255,255,255,0.1)] p-4 w-full rounded h-full">
      <h2 className="text-lg font-bold text-center">Week Progress</h2>
      <ResponsiveContainer className="p-0" width="100%" height="80%">
        <BarChart data={chartData}>
          <XAxis dataKey="day" tick={{ fill: "white" }} axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, (dataMax: number) => Math.max(dataMax, 5)]}
            allowDecimals={false}
            hide={true}  
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black text-white px-3 py-2 rounded-lg shadow-md">
                    <p className="text-sm">Problems Solved: {payload[0].payload.count}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="displayCount"
            fill="white"
            radius={[6, 6, 0, 0]}
            barSize={40}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
};

export default WeeklyProgress;
