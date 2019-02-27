const position = { x: 100, y: 100 }
const square_side_length = 20
const square_spacing = 2
const days_in_week = 7
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class Month extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state.offset_x = props.offset_x;
    this.state.offset_y = props.offset_y;

    this.state.month_name = months[props.month];
    this.state.month = props.month;

    this.state.square_side = 20;
    this.state.spacing = 3;

    this.interpolate = d3.scaleSequential((t) => { 
      if (t == -1)
      {
        return d3.hsl(0, 0, 1) 
      }
      else if (t == 0)
      {
        return d3.hsl(0, 0, 0.9) 
      }
      else
      {
        return d3.hsl(82, 1, .75 - t / 2) 
      }
    } );

    this.date = new Date();

    this.date.setDate(1);
    this.date.setYear(props.year);
    this.date.setMonth(props.month);
    this.dataArray = [];

    for (let i = 0; i < 7 * 6; i++)
    {
      if (this.date.getMonth() !== props.month)
      {
        this.dataArray.push(-1);
        continue;
      }

      if (i % 7 == this.date.getDay())
      {
        this.dataArray.push(0);
        this.date.setDate(this.date.getDate() + 1);
      }
      else
      {
        this.dataArray.push(-1);
      }
    }

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
          fill={this.interpolate(this.dataArray[i])}
          />)

    }
    return month;
  }

  createWeekdays = () =>
  {
    if (this.state.month === 0)
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
  }


  render() {
    return <g>
      <text
        x={this.state.offset_x}
        y={this.state.offset_y - 10}
      >{this.state.month_name}
      </text>
       {this.createWeekdays()}
       {this.createMonth()}
      </g>
  }
}

