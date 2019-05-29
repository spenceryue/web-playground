import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const NotFound = () => (
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Page Not Found</title>

  </head>
  <body>
    <div id="message">
      <h2>404</h2>
      <h1>Page Not Found</h1>
      <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
    </div>
  </body>
</html>
);

export default NotFound;
