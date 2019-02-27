class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.year = props.year;
    this.state.offset_x = 100;
    this.state.offset_y = 100;
  }

  createMonth = () => 
  {
    let months = [];

    for (let i = 0; i < 12; i++)
    {
      months.push(<Month
          offset_x={this.state.offset_x + i * 139}
          offset_y={this.state.offset_y}
          month={i}
          year={this.state.year} >
          </Month>)
    }

    return months;
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

