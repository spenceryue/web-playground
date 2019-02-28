const domContainer = document.querySelector('#calendar_container');

d3.csv('SPY.csv').get((error, data) => 
    {
      let year1993 = [];
      let year2003 = [];
      data.forEach((dat) => {
        var date = new Date(dat.Date);
        date.setDate(date.getDate() + 1);
        if (date.getFullYear() == 1993)
        {
          year1993.push(date);
        }

        if (date.getFullYear() == 2003)
        {
          year2003.push(date);
        }
      });
      //console.log(year1993);

      ReactDOM.render(
          <div>
          <Year year='1993' data={year1993}></Year>
          <Year year='2003' data={year2003}></Year>
          <Litmus></Litmus>
          </div>
          , domContainer);
    });

