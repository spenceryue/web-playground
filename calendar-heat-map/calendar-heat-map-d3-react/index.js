const domContainer = document.querySelector('#calendar_container');
ReactDOM.render(
    <div>
    <Year year='2000'></Year>
    <Year year='2001'></Year>
    <Litmus></Litmus>
    </div>
    , domContainer);
