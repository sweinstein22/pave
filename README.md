# Employee Compensation Data Visualization

A graphical representation of employee compensation (salary + bonus), filterable
by department, city, and employment type.

## Adding Data Sources

Currently, this application only takes in CSV files from the `./public/data`
directory that match the hardcoded names listed in `./src/DataActions.js`. To
add files to this list:
- Add the CSV file to the `./public/data` directory
- Amend the list of file names returned from `csvFileNames()` in
  `DataActions.js`

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app and the express server in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser,\
and [http://localhost:8080](http://localhost:8080) to view responses from the\
server in the browser.

Both the app and the server will reload if you make edits.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Credits

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app), and leverages packages
including:
- [React Redux](https://react-redux.js.org/)
- [React Chart.js](https://github.com/reactchartjs/react-chartjs-2)
- [PapaParse](https://www.papaparse.com/)
- [Material UI](https://v4.mui.com/)
