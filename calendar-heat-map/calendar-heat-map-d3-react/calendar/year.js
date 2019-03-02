class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.year = props.year;
    this.state.offset_x = 100;
    this.state.offset_y = 100;

    this.state.data = props.data;
    this.state.metric = props.metric;
    this.state.max = props.max;
    this.data = props.data;
  }

  createMonth = () => 
  {
    let months = [];

    for (let i = 0; i < 12; i++)
    {
      let curr_month = [];
      
      if (typeof(this.data) !== 'undefined')
      {
        if (i < 11)
        {
          let ptr = -1;
          while (this.data[++ptr].date.getMonth() == i);
          curr_month = this.data.splice(0, ptr);
        }
        else
        {
          curr_month = this.data;
        }
      }

      months.push(<Month
          offset_x={this.state.offset_x + i * 139}
          offset_y={this.state.offset_y}
          month={i}
          data={curr_month}
          max={this.state.max}
          year={this.state.year}
          metric={this.state.metric} >
          </Month>)
    }

    return months;
  }

  componentDidUpdate(prevProps)
  {
    if (prevProps.metric !== this.props.metric)
    {
      this.setState((prevState) => ({
        metric: this.props.metric
      }));
    }
  }

  render() {
    return <svg
        width={2400}
        height={300}
      >
        <text
          x={this.state.offset_x}
          y={this.state.offset_y - 35}
          >{this.state.year}
        </text>
      {this.createMonth()}
      </svg>;
  }
}

