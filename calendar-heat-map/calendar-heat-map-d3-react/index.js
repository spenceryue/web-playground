const domContainer = document.querySelector('#calendar_container');
ReactDOM.render(
    <div>
    <Year offset_x={55} offset_y={135} year='2000'></Year>
    <Year offset_x={55} offset_y={105} year='2001'></Year>
    <Litmus color={10} ></Litmus>
    </div>
    , domContainer);
