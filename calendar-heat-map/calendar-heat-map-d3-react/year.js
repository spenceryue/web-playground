class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMonth = () => 
  {
    let months = [];

    for (let i = 0; i < 12; i++)
    {
      months.push(<Month
          offset_x={100 + i * 139}
          offset_y={100}
          month={i}>
          </Month>)
    }

    return months;
  }

  render() {
    return <svg
        width={2400}
        height={300}
      >
      {this.createMonth()}
      </svg>;
  }
}

