import React, { useState }  from 'react';

const Example = () =>
{
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')));

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => { 
          setCount(count + 1);
          localStorage.setItem('count', count + 1);
        } 
      }>
        Click Me
      </button>
    </div>
  );
}

export default Example;
