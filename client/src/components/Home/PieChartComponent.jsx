import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const PieChartComponent = () => {
	return (
		<div style={{ width: "100%", height: 180 }}>
			<ResponsiveContainer>
				<PieChart >
					<Pie
						data={data}
						innerRadius={60}
						outerRadius={80}
						fill="#8884d8"
						paddingAngle={2}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>

					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PieChartComponent;
