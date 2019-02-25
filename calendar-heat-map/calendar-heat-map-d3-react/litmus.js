class Litmus extends React.Component {
  constructor(props) {
    super(props);
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

    this.spacing = 3; 
    this.square_side = 20; 
    this.offset_x = 20; 
    this.offset_y = 20; 
  }

  createSquares = () => 
  {
    let squares = [];

    squares.push(<rect
        x={this.offset_x + 0}
        y={this.offset_y + 46}
        width={this.square_side}
        height={this.square_side}
        fill={this.interpolate(-1)} />);

    for (let i = 0; i < 50; i++)
    {
      squares.push(<rect
          x={this.offset_x + (this.spacing + this.square_side) * i}
          y={this.offset_y + (this.spacing + this.square_side)} 
          width={this.square_side}
          height={this.square_side}
          fill={this.interpolate(i / 50)}
          />);
    }

    return squares;
  }

  render() {
    return <svg
          height={200}
          width={2000}
        >
          <g>
             {this.createSquares()}
          </g>
        </svg>
  }
}

