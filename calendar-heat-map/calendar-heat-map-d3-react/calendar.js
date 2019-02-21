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

/*
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
  .attr('fill', (d, i) => { return interpolate(d + 0.9); })
  .attr("x", (d,i) => { return (square_side_length + square_spacing) * Math.floor(i / days_in_week) + position.x; })
  .attr("y", (d,i) => { return (square_side_length + square_spacing) * (i % days_in_week) + position.y });

svg.selectAll('text.month')
  .data([month])
  .enter()
  .append('text')
  .attr('class', 'month')
  .attr('x', position.x)
  .attr('y', position.y - 10)
  .text((d) => { return d; });

svg.selectAll('text.day')
  .data(days_of_week)
  .enter()
  .append('text')
  .attr('class', 'day')
  .attr('font-size', '10px')
  .attr('x', position.x - 30)
  .attr('y', (d, i) => { return position.y + 13 + 22 * i; })
  .text((d) => { return d; });

console.log(svg);
*/

var data =
[
  { "day": "2017-04-18", "productPerceivedQuality": "2.8" },
  { "day": "2017-04-19", "productPerceivedQuality": "2.9" },
  { "day": "2017-04-20", "productPerceivedQuality": "2.7" },
  { "day": "2017-04-21", "productPerceivedQuality": "4.3" },
  { "day": "2017-04-22", "productPerceivedQuality": "4.6" },
  { "day": "2017-04-23", "productPerceivedQuality": "5" },
  { "day": "2017-04-24", "productPerceivedQuality": "5.2" },
  { "day": "2017-04-25", "productPerceivedQuality": "5.1" },
  { "day": "2017-04-26", "productPerceivedQuality": "4.8" },
  { "day": "2017-04-27", "productPerceivedQuality": "4.9" },
  { "day": "2017-04-28", "productPerceivedQuality": "5.1" },
  { "day": "2017-04-29", "productPerceivedQuality": "5.3" },
  { "day": "2017-04-30", "productPerceivedQuality": "5.6" },
  { "day": "2017-05-01", "productPerceivedQuality": "6.2" }
];

var data_x_y =
[
  { "x": "1", "y": "2.8" },
  { "x": "2", "y": "2.9" },
  { "x": "3", "y": "2.7" },
  { "x": "4", "y": "4.3" },
  { "x": "5", "y": "4.6" },
  { "x": "6", "y": "5" },
  { "x": "7", "y": "5.2" },
];

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.height = 300;
    this.state.width  = 300;

    this.state.offset_x = 100;
    this.state.offset_y = 100;

    this.state.square_side = 20;
    this.state.spacing = 3;

		//this.linePath = this.line(data_x_y);
  }

  createMonth = () => 
  {
    let month = [];

    for (let i = 0; i < 7 * 6; i++)
    {
      month.push(<rect
          x={this.state.offset_x + (this.state.spacing + this.state.square_side) * Math.floor(i / days_in_week)}
          y={this.state.offset_y + (this.state.spacing + this.state.square_side) * (i % days_in_week)}
          width={this.state.square_side}
          height={this.state.square_side}
          />)

    }
    return month;
  }


  render() {
    return <svg
      height={this.state.height}
      width={this.state.width} >
        {this.createMonth()}
      </svg>;
  }
}

const domContainer = document.querySelector('#calendar_container');
ReactDOM.render(<Month></Month>, domContainer);

