class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMonth = () => 
  {
  }

  render() {
    return <div>
      <Month
      height={300}
      width={300}
      offset_x={100}
      offset_y={100}
      >
      </Month>
      <Month
      height={300}
      width={300}
      offset_x={0}
      offset_y={100}
      >
      </Month>
      </div>;
  }
}

