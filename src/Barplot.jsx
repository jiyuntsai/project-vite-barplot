import * as d3 from "d3";

const Barplot = ({ data }) => {
  // create the size of the plot, margin-left helps preserve space for country names
  const width = 600;
  const height = 600;
  const margin = { top: 20, right: 40, bottom: 20, left: 100 };

  // innerWidth and innerHeight will create the actual space to draw the plot
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // each y scale gets the same amount of space (a row of bar)
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2);

  // x scale is the length of the number
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      {/* transform helps move the chart right and bottom */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d) => (
          <g key={d.country}>
            {/* bar */}
            <rect
              x={0}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              fill="pink"
              rx={4}
            />
            {/* country name on the left side */}
            <text
              x={-8}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
            >
              {d.country}
            </text>
            {/* value on the right side */}
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
