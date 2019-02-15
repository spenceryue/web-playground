const position = { x: 100, y: 100 }
const square_side_length = 20;
const square_spacing = 2;
const days_in_week = 7
const month = 'Feb';
const interpolate = d3.scaleSequential((t) => { return d3.hsl(100, 1, t) } );

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
                .attr('fill', (d, i) => { return interpolate(i / 42 + 0.01); })
                .attr("x", (d,i) => { return (square_side_length + square_spacing) * Math.floor(i / days_in_week) + position.x; })
                .attr("y", (d,i) => { return (square_side_length + square_spacing) * (i % days_in_week) + position.y });

svg.selectAll('text')
   .data([month])
   .enter()
   .append('text')
   .attr('x', position.x)
   .attr('y', position.y - 10)
   .text((d) => {return d;});
