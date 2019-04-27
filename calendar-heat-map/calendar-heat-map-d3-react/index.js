const domContainer = document.querySelector('#calendar_container');

const date = new Date();
console.log(date)
date.setDate(1);

ReactDOM.render(
    <div>
    <Year offset_x={55} offset_y={135} year='2000'></Year>
    <Year offset_x={55} offset_y={105} year='2001'></Year>
    <Last3Months offset_x={55} offset_y={0} date={date} ></Last3Months>
    <Litmus color={10} ></Litmus>
    </div>
    , domContainer);
