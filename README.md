# UK-Emissions-Tracker

A small React app that loads UK greenhouse gas emissions data from an Excel file and visualises it as an interactive chart.

### Features

- Line chart of UK emissions (1990–2023)
- Hover over points to see exact values
- Axis labels and units (MtCO2e)

## Data Source

### External

The data used in this project was taken from a [UK Government source](https://www.ons.gov.uk/economy/environmentalaccounts/methodologies/measuringukgreenhousegasemissions).

### Data

The app reads data from:

`public/uk-emissions.xlsx`

If you replace this file, ensure:
- Sheet name is "1.1"
- Structure matches the existing format

## How to use

### Requirements:
* Node.js (v18 or later recommended)
* npm

### Setup:
* Clone the repository: `git clone https://github.com/kyle-lindsay/UK-Emissions-Tracker`
 
* Navigate to the project folder: `cd uk-co2-app`

* Install dependancies: `npm install`

* Run the app: `npm run dev`

* Open `http://localhost:5173` in your browser
