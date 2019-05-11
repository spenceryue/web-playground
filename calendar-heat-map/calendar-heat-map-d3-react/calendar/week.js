const position = { x: 100, y: 100 }
const square_side_length = 20
const days_in_week = 7
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const days_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class Week extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state.offset_x = props.offset_x;
    this.state.offset_y = props.offset_y;

    this.state.month_name = months[props.month];
    this.state.month = props.month;
    this.state.year = props.year;
    this.state.data = props.data;
    this.state.max = props.max;

    this.state.square_length = props.square_length;
    this.state.square_padding = props.square_padding;
    this.state.metric = props.metric;
    this.state.dataArray = this.getDataArray(this.state.metric);
    this.state.createWeekdays = props.createWeekdays;
  }

  getDataArray = (metric) => {
    let date = new Date();
    date.setDate(1);
    date.setYear(this.state.year);
    date.setMonth(this.state.month);

    let data_array = [];
    let ptr = 0;
    for (let i = 0; i < 7 * 6; i++)
    {
      if (date.getMonth() !== this.props.month)
      {
        data_array.push({number: -1, title: ''});
        continue;
      }

      if (i % 7 == date.getDay())
      {
        if (typeof(this.state.data[ptr]) !== 'undefined' &&
            this.state.data[ptr].date &&
            date.getDate() == this.state.data[ptr].date.getDate())
        {
          data_array.push({number: this.state.data[ptr][metric] / this.state.max[metric], title: date.toDateString() + '\n' + this.state.data[ptr][metric]});
          ptr++;
        }
        else
        {
          data_array.push({number: 0, title: date.toDateString()});
        }

        date.setDate(date.getDate() + 1);
      }
      else
      {
        data_array.push({number: -1, title: ''});
      }
    }

    return data_array;
  }


  createMonth = () => 
  {
    let month = [];

    for (let i = 0; i < 7 * 6; i++)
    {
      month.push(<rect
          x={this.state.offset_x + (this.state.square_padding + this.state.square_length) * Math.floor(i / days_in_week)}
          y={this.state.offset_y + (this.state.square_padding + this.state.square_length) * (i % days_in_week)}
          width={this.state.square_length}
          height={this.state.square_length}
          fill={green(this.state.dataArray[i].number)}
          >
            <title>{this.state.dataArray[i].title}</title>
          </rect>)

    }
    return month;
  }

  createWeekdays = () =>
  {
    if (this.state.createWeekdays)
    {
      let weekdays = [];

      for (let i = 0; i < 7; i++)
      {
        weekdays.push(<text
            x={this.state.offset_x - 30}
            y={this.state.offset_y + 13 + (this.state.square_length + this.state.square_padding) * i}
            font-size={'10px'} >
            {days_of_week[i]}
            </text>)
      }
      return weekdays;
    }
  }

  componentDidUpdate(prevProps)
  {
    if (prevProps.metric !== this.props.metric)
    {
      this.setState({
        metric: this.props.metric
      });

      this.setState({
        dataArray: this.getDataArray(this.props.metric)
      });
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

