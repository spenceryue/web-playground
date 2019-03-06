const domContainer = document.querySelector('#calendar_container');
const selectMetric = document.querySelector('#select_metric');

let metric = 'Volume';
let year_separated =[[]];
let max = {};
let react_comp;

selectMetric.addEventListener('change',() => {
  metric = selectMetric.value;
  react_comp.setState({
        metric: metric
      });
});

let all_litmus = () =>
{
  let ret = [];

  for (let i = 0; i < 255; i+=30)
  {
    ret.push(<Litmus color={i}></Litmus>)
  }
  return ret;
}

let all_years = (years, max) =>
{
  let ret = [];
  for (let i = 0; i < years.length; i++)
  {
    ret.push(<Year year={years[i][0].date.getFullYear()}
                   data={years[i]}
                   max={max}
                   metric={metric} >
                   </Year>);
  }
  return ret;
}

d3.csv('SPY.csv').get((error, data) => 
    {
      let cur_year_ptr = 0;

      max = data.reduce((dat1, dat2) => {
        return { Volume: Math.max(dat1.Volume, dat2.Volume),
                 Close: Math.max(dat1.Close, dat2.Close),
                 PercentChange: Math.max(dat1.PercentChange, dat2.PercentChange) };
      });

      data.forEach((dat) => {
        var date = new Date(dat.Date);
        date.setDate(date.getDate());

        if (year_separated[cur_year_ptr].length == 0)
        {
          year_separated[cur_year_ptr].push({date: date,
                                             Volume: dat.Volume,
                                             Close: dat.Close,
                                             PercentChanged: dat.PercentChange });
        }
        else if (year_separated[cur_year_ptr][0].date.getFullYear() == date.getFullYear())
        {
          year_separated[cur_year_ptr].push({date: date,
                                             Volume: dat.Volume,
                                             Close: dat.Close,
                                             PercentChange: dat.PercentChange });
        }
        else
        {
          cur_year_ptr++;
          year_separated.push([{date: date,
                                Volume: dat.Volume,
                                Close: dat.Close,
                                PercentChange: dat.PercentChange }]);
        }
      });

      console.log(max);
      /*react_comp = ReactDOM.render(
          <div>
          {all_years(year_separated, max)}
          {all_litmus()}
          </div>
          , domContainer);*/

      react_comp = ReactDOM.render(<Year year={year_separated[0][0].date.getFullYear()}
                   data={year_separated[0]}
                   max={max}
                   metric={metric} >
                   </Year>, domContainer);
    });

