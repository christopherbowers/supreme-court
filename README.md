# The Supreme Court
## By Christopher Bowers


## How to run:

- Clone the repository
- install dependencies: `npm install`
- Run the project: `npm start`

## How to Navigate this Project

- I used a custom hook to fetch justice and case data. Cases were then filtered by justice start and finish date, counted, then merged into an new array with tallied votes.
<https://github.com/christopherbowers/supreme-court/blob/579d056d88d3c55babb80e134ddd83db12038188/src/hooks/useData.js#L36>
- Justice start date and vote count is charted with the [D3.js](https://d3js.org/) in a [Chart.js](https://github.com/christopherbowers/supreme-court/blob/main/src/components/Chart.js) component with a loading state until date is complete.
- A `useEffect` hook is used to check for window resizing to create correctly size scatter plot.
<https://github.com/christopherbowers/supreme-court/blob/579d056d88d3c55babb80e134ddd83db12038188/src/components/Chart.js#L13>
- I created [responsive styles](https://github.com/christopherbowers/supreme-court/blob/main/src/index.css) with multiple breakpoints.
- DM Sans font files are stored in a [fonts directory](https://github.com/christopherbowers/supreme-court/tree/main/src/fonts) to reduce DNS requests.

## 🚀 Deployed Site
🔗 <https://supreme-court.vercel.app>
