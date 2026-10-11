# Air Quality Health Checker

A public-facing web tool that checks live air-quality conditions and provides simple, accessible health guidance.

## What it does

The application retrieves live air-quality data from the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) and shows:

- European Air Quality Index (AQI)
- PM2.5
- PM10
- Nitrogen dioxide
- Ozone
- A 24-hour PM2.5 forecast chart
- Plain-language health guidance

## Locations included

The current version includes quick selections for:

- London
- Manchester
- Birmingham
- Edinburgh
- Leeds
- Bristol
- Liverpool
- Belfast
- Cardiff
- Aberdeen

## Health guidance thresholds

| European AQI | Guidance |
|---|---|
| 20 or below | Good: suitable for outdoor activities for most people |
| 21–40 | Fair: most people can continue normal outdoor activities |
| 41–60 | Moderate: sensitive groups may reduce long or intense outdoor activity |
| 61–80 | Poor: consider reducing prolonged or strenuous outdoor activity |
| 81–100 | Very poor: reduce outdoor activity where possible |
| Above 100 | Extremely poor: avoid prolonged outdoor activity |

## Data and limitations

Live data are retrieved directly from the Open-Meteo Air Quality API in the visitor’s browser. No user data, search history or location data is stored by this project.

This tool provides general environmental information only. It is not medical advice, a diagnostic tool, or a substitute for guidance from a healthcare professional or local public-health authority.

## Methods

1. The user selects a location.
2. The site requests current air-quality measurements and an hourly PM2.5 forecast from Open-Meteo.
3. The application displays the European AQI, pollutant concentrations and a forecast chart.
4. The AQI is mapped to plain-language health guidance.

## How to run locally

```bash
git clone https://github.com/Swastika0710/air-quality-health-checker.git
cd air-quality-health-checker
```

Then open `index.html` in a web browser.

## Live version

Once GitHub Pages is enabled, the project will be available at:

```text
https://swastika0710.github.io/air-quality-health-checker/
```

## Licence

This project is released under the [MIT Licence](LICENSE).