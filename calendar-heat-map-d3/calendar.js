const position = { x: 100, y: 100 }
const square_side_length = 20
const square_spacing = 2
const days_in_week = 7
const date = new Date();
date.setDate(1);
date.setMonth(0);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = months[date.getMonth()];
const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const interpolate = d3.scaleSequential((t) => { return d3.hsl(100, 1, t) } );

const dataArray = [];

console.log(date);

for (let i = 0; i < 7 * 6; i++)
{
  if (months[date.getMonth()] !== month)
  {
    dataArray.push(1);
    continue;
  }

  if (i % 7 == date.getDay())
  {
    dataArray.push(0);
    date.setDate(date.getDate() + 1);
  }
  else
  {
    dataArray.push(1);
  }
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
    .attr('fill', (d, i) => { return interpolate((d + 0.5) / 2); })
    .attr("x", (d,i) => { return (square_side_length + square_spacing) * Math.floor(i / days_in_week) + position.x; })
    .attr("y", (d,i) => { return (square_side_length + square_spacing) * (i % days_in_week) + position.y });

svg.selectAll('text.month')
   .data([month])
   .enter()
   .append('text')
   .attr('class', 'month')
   .attr('x', position.x)
   .attr('y', position.y - 10)
   .text((d) => {return d;});

svg.selectAll('text.day')
   .data(days_of_week)
   .enter()
   .append('text')
   .attr('class', 'day')
   .attr('font-size', '10px')
   .attr('x', position.x - 30)
   .attr('y', (d, i) => { return position.y + 13 + 22 * i; })
   .text((d) => {return d;});
