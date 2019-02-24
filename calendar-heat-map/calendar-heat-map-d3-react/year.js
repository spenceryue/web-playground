class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createMonth = () => 
  {
  }

  render() {
    return <svg
        width={700}
        height={300}
      >
        <Month offset_x={100}
          offset_y={100}
          ></Month>

        <Month offset_x={300}
          offset_y={100}
          ></Month>
        <Month offset_x={500}
          offset_y={100}
          ></Month>
      </svg>;
  }
}

