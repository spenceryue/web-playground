class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.year = 2000;
  }

  createMonth = () => 
  {
    let months = [];

    for (let i = 0; i < 12; i++)
    {
      months.push(<Month
          offset_x={100 + i * 139}
          offset_y={100}
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
          x={100}
          y={65}
          >{this.state.year}
        </text>
      {this.createMonth()}
      </svg>;
  }
}

