import { hsl, scaleSequential } from 'd3';

const colorFunction = (hue, negHue) => {
  return scaleSequential((t) => {
      if (t === -1)
      {
        return hsl(0, 0, 1) 
      }
      else if (t === 0)
      {
        return hsl(0, 0, 0.9) 
      }
      else if (t > 0)
      {
        //green
        return hsl(hue, 1, .75 - t / 2)
      }
      else if (t < 0)
      {
        return hsl(negHue, 1, .75 + t / 2)
      }
    }
  );
};

const color = 
{
  green: colorFunction(82, 0),
  red: colorFunction(0, 82),
  blue: colorFunction(203, 0),
  orange: colorFunction(33, 0),
};

export default color;
