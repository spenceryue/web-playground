const domContainer = document.querySelector('#calendar_container');

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
                   max={max}>
                   </Year>);
  }
  return ret;
}

d3.csv('SPY.csv').get((error, data) => 
    {
      let year_separated = [[]];
      let cur_year_ptr = 0;

      let max_volume = data.reduce((dat1, dat2) => {
        return {Volume: Math.max(dat1.Volume, dat2.Volume)};
      });

      data.forEach((dat) => {
        var date = new Date(dat.Date);
        date.setDate(date.getDate() + 1);

        if (year_separated[cur_year_ptr].length == 0)
        {
          year_separated[cur_year_ptr].push({date: date, Volume: dat.Volume});
        }
        else if (year_separated[cur_year_ptr][0].date.getFullYear() == date.getFullYear())
        {
          year_separated[cur_year_ptr].push({date: date, Volume: dat.Volume});
        }
        else
        {
          cur_year_ptr++;
          year_separated.push([{date: date, Volume: dat.Volume}]);
        }
      });

      console.log(max_volume);
      ReactDOM.render(
          <div>
          {all_years(year_separated, max_volume)}
          {all_litmus()}
          </div>
          , domContainer);
    });

