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

class Month extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.height = props.height;
    this.state.width  = props.width;

    this.state.offset_x = props.offset_x;
    this.state.offset_y = props.offset_y;

    this.state.month_name = 'Jan';

    this.state.square_side = 20;
    this.state.spacing = 3;

    this.interpolate = d3.scaleSequential((t) => { return d3.hsl(100, 1, t) } );
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
          fill={this.interpolate(dataArray[i] + 0.9)}
          />)

    }
    return month;
  }

  createWeekdays = () =>
  {
    let weekdays = [];

    for (let i = 0; i < 7; i++)
    {
      weekdays.push(<text
          x={this.state.offset_x - 30}
          y={this.state.offset_y + 13 + 23 * i}
          font-size={'10px'} >
          {days_of_week[i]}
          </text>)
    }
    return weekdays;
  }


  render() {
    return <svg
      height={this.state.height}
      width={this.state.width} >
        <text 
          x={this.state.offset_x}
          y={this.state.offset_y - 10}
          >{this.state.month_name}
          </text>
        {this.createWeekdays()}
        {this.createMonth()}
      </svg>;
  }
}

