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

let all_years = (years) =>
{
  let ret = [];
  for (let i = 0; i < years.length; i++)
  {
    ret.push(<Year year={years[i][0].getFullYear()}
                   data={years[i]}>
                   </Year>);
  }
  return ret;
}

d3.csv('SPY.csv').get((error, data) => 
    {
      let year_separated = [[]];
      let cur_year_ptr = 0;
      data.forEach((dat) => {
        var date = new Date(dat.Date);
        date.setDate(date.getDate() + 1);

        if (year_separated[cur_year_ptr].length == 0)
        {
          year_separated[cur_year_ptr].push(date);
        }
        else if (year_separated[cur_year_ptr][0].getFullYear() == date.getFullYear())
        {
          year_separated[cur_year_ptr].push(date);
        }
        else
        {
          cur_year_ptr++;
          year_separated.push([date]);
        }
      });

      ReactDOM.render(
          <div>
          {all_years(year_separated)}
          {all_litmus()}
          </div>
          , domContainer);
    });

