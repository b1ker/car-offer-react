## Hello
Hi, this is Pawel. If i could spend more on the exercise i would focus on improving the code especially adding more tests. I am more than happy to discuss further !

Please note the react app needs to run on http://localhost:3000 due to CORS setup in API.

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Runs a set of basic tests for the app.

## Tasks

- [x] Move `honda_wmi.json` file's content to a backend API written in C# & ASP.NET Core 3.1
  - Data must be retrieved from the API and rendered instead of from the local browser
  - A spinner or a `Loading...` text must appear while the request is in flight
- [x] Style `table` element that displays WMI table
- [x] Render data sorted by `CreatedOn` and then by `WMI`
- [x] Introduce a search box to accept user input, filter and render data
- [x] Introduce a `Select` control to group by country
  - By default `View All` option must be selected, rendering all records
  - Distinct countries must be available for user selection
  - On selecting a country, data must be filtered down to just the country
  - Search and Country selection must work together
