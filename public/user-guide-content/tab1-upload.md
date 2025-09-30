# Tab 1: Upload Data

## Overview
The Upload Data tab is your starting point for any market analysis. This is where you import your location data, map the columns to the required fields, and prepare your dataset for analysis.

**Performance Capacity**: The system efficiently handles datasets up to 10,000+ locations with optimized memory management.

![Upload Data tab overview - showing the main upload interface](/user-guide-content/data-upload.png)

## Step 1: Preparing Your Excel File

Before uploading, ensure your Excel file contains the following columns:

- **Location Name**: Unique identifier for each location
- **Address**: Full address for geocoding (street, city, province/state) (Note: address components can be provided in multiple columns, e.g., "Street Address", "City", "Province" and "Postal Code")
- **Competitor/Brand**: The company or brand operating at this location (Note: use one consistent value for each competitor category)
- **Economic Value** (optional): Revenue, sales, or other metric for calculating market shares (e.g., sales, volume, capacity)

**Note**: Download and review the sample dataset for the correct data format

### Excel Format Example

| Location Name | Address | Brand | Revenue |
|------------|---------|-------|---------|
| Main Branch | 123 Main St, Toronto, ON | Competitor A | 500000 |
| Oak Branch | 456 Oak Ave, Toronto, ON | Competitor B | 750000 |
| Pine Branch | 789 Pine St, Mississauga, ON | Target | 900000 |


## Step 2: Uploading Your File

1. Click the **"Upload Excel File"** button
2. Select your prepared Excel file
3. If the Excel file has more than one active sheet, specify the correct sheet
4. Wait for the file to be processed


## Step 3: Column Mapping

After upload, you'll need to map your Excel columns to the required fields:

1. **Existing Coordinates**: If data has existing geocodes for some locations, indicate them here

![Specify if geocodes exist - showing the option to use existing geocodes](/user-guide-content/existing-geocodes.png)

2. **Address Configuration**: Specify if addresses are presented in one or multiple columns
3. **Location Column**: Select which column contains unique location identifiers / location name (Note: if location names are duplicates, app adds suffix to make them unique)
4. **Economic Value Column** (optional): Select if you have revenue/sales data
5. **Competitor Column**: Choose the column identifying the brand/company
6. **Address Column**: Select the column(s) with full addresses (address components)

![COnfigure data columns - showing the column mapping interface](/user-guide-content/column-mapping.png)

Press "Validate Data Structure" to move on to the next step.

## Step 4: Identifying Relevant Parties

This critical step defines which companies are involved in the merger:

- **Purchaser**: Select the acquiring company from the dropdown
- **Target**: Select the company being acquired
- **Independent**: Identify any category that gives common identifier to entities that are not affiliated

The system will automatically identify all unique brands in your data and present them as options.

![Identify Party Identifiers - showing the part ID interface](/user-guide-content/party-ID.png)

## Step 5: Geocoding

The application will automatically geocode your addresses to get latitude/longitude coordinates:

- **Primary Service**: Google Maps
- **Fallback Services**: Mapbox or OpenStreetMap Nominatim
- **Pre-geocoded Data**: If no locations in the data are missing coordinates, you can skip this step

### Geocoding Progress
- Real-time progress indicator shows completion percentage
- Failed addresses are logged and the user can retry geocoding with a different service, or manually correct geocodes
- Duplicate coordinates automatically spread small distance (using a golden-angle spiral algorithm) to eliminate coordinate duplication for perfect visualization

![Geocoding status updates - showing the geocoding service status process](/user-guide-content/geocoding-progress.png)

### Performance Expectations
- **Processing capacity**: Tested up to 10,000+ locations
- **Memory usage**: ~0.065 MB per location
- **Geocoding speed**: ~3-4 ddresses per second (varies by service)

### Partially Pre-geocoded Data
- **Address Configuration**: User specifies columns for addresses for locations still to be geocoded

![Specifying address to complete partially geocoded data - showing the column mapping for single column scenario](/user-guide-content/partial-geocoding-address.png)

- **Completing the Geocodes**: User must select "Try Another Service" to geocode all remaining locations

![Completing the remaining geocodes - showing the process for finishing location geocoding for partially geocoded data](/user-guide-content/partial-geocoding-retry.png)

- User can select any of the services, here using Google Maps:

![Completing the remaining geocodes with Google Maps service - showing the process for finishing location geocoding for partially geocoded data](/user-guide-content/partial-geocoding-retry-google.png)

## Step 6: Map Overview

User can review location summary statistics and locations on a map:

![Viewing overview map - showing the overview map with locations in data](/user-guide-content/map-overview.png)

## Best Practices

- **Data Quality**: Ensure addresses are complete and properly formatted
- **Unique IDs**: Every location should have a unique identifier
- **Brand Names**: Use consistent naming for brands (e.g., always "McDonald's" not "McDonalds" or "McDonald's Restaurant")
- **Save Your Work**: After geocoding, download the geocoded results so geocoding does not need to be repeated for future analysis
- **Batch Process Large Datasets**: For large datasets that can be divided by region (e.g., by province) conduct the analysis in segments

## Troubleshooting

### Common Issues

**File Won't Upload**
- Check file format (must be .xlsx or .xls)
- Ensure file size is under 200MB
- Verify no password protection on the file

**Geocoding Failures**
- Review address format (include city and province/state)
- Check for special characters or typos
- Consider using pre-geocoded data if available

**Missing Brands**
- Ensure the competitor column has values for all rows
- Check for inconsistent brand naming

***

# Next Steps

Once your data is successfully uploaded and geocoded, you're ready to proceed to **Tab 2: Market Overview** for multi-market analysis.

- **Note**: use the uploaded data preview, summary statistics, and map, to confirm that data was uploaded correctly with correct column mapping.