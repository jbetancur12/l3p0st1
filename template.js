export default () => {
  return `<!doctype html>
      <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>MERN Skeleton</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <style>
              a{
                text-decoration: none;
                color: #061d95
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/javascript" src="/dist/bundle.js"></script>
          </body>
      </html>`;
};
