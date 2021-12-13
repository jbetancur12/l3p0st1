export default ({ markup, css }) => {
  return `<!doctype html>
      <html lang="en">
          <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta charset="utf-8">
            <title>MERN Skeleton</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css">
            
            
            <style>
              a{
                text-decoration: none;
                color: #061d95
              }
            </style>
          </head>
          <body>
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style> 
            <script type="text/javascript" src="/dist/bundle.js"></script>
          </body>
      </html>`;
};
