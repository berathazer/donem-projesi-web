import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{
		name: "May",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "June",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "July",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "August",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "September",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "October",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "November",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const AreaChartComponent = () => {
	return (
		<div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#C7E8CA" fill="#C7E8CA" />
			
          </AreaChart>
        </ResponsiveContainer>
      </div>
		
			

	);
};

export default AreaChartComponent;

