const position = { x: 100, y: 100 }
const square_side_length = 20;
const square_spacing = 2;
const days_in_week = 7

const dataArray = [];

for (let i = 0; i < 7 * 6; i++)
{
	dataArray.push(i);
}

var svg = d3.select("body")
            .append("svg")
            .attr("height","100%")
            .attr("width","100%");

svg.selectAll("rect")
      .data(dataArray)
      .enter()
                .append("rect")
                .attr("height", square_side_length) 
                .attr("width", square_side_length)
                .attr("x", (d,i) => { return (square_side_length + square_spacing) * Math.floor(i / days_in_week) + position.x; })
                .attr("y", (d,i) => { return (square_side_length + square_spacing) * (i % days_in_week) + position.y });
