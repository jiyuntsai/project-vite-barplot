import * as d3 from "d3";

const Barplot = ({ data }) => {
  const width = 500;
  const height = 400;
  const margin = { top: 20, right: 40, bottom: 20, left: 100 };

  // 扣掉邊距後,真正能畫圖的空間
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Y 軸:每個國家分到一格高度
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2);

  // X 軸:學生數 → 長度
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => (
          <g key={d.country}>
            {/* bar */}
            <rect
              x={0}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              fill="steelblue"
            />
            {/* 國家名稱(bar 左邊) */}
            <text
              x={-8}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
            >
              {d.country}
            </text>
            {/* 數值(bar 右邊) */}
            <text
              x={xScale(d.students) + 5}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              dominantBaseline="middle"
              fontSize={12}
            >
              {d.students}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Barplot;
