const green = d3.scaleSequential((t) => { 
      if (t == -1)
      {
        return d3.hsl(0, 0, 1) 
      }
      else if (t == 0)
      {
        return d3.hsl(0, 0, 0.9) 
      }
      else if (t > 0)
      {
        //green
        return d3.hsl(82, 1, .75 - t / 2) 
      }
      else if (t < 0)
      {
        //red
        return d3.hsl(0, 1, .75 + t / 2) 
      }
    });
