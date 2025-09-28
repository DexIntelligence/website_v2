# Tab 1: Upload Data

## Overview
The Upload Data tab is your starting point for any market analysis. This is where you import your location data, map the columns to the required fields, and prepare your dataset for analysis.

**Performance Capacity**: The system efficiently handles datasets up to 5,000+ locations with optimized memory management.

![Upload Data tab overview - showing the main upload interface](/user-guide-content/data-upload.png)

## Step 1: Preparing Your Excel File

Before uploading, ensure your Excel file contains the following columns:

- **Location ID**: Unique identifier for each location
- **Address**: Full address for geocoding (street, city, province/state)
- **Competitor/Brand**: The company or brand operating at this location
- **Economic Value** (optional): Revenue, sales, or other metric for weighting

### Excel Format Example

| Location ID | Address | Brand | Revenue |
|------------|---------|-------|---------|
| 001 | 123 Main St, Toronto, ON | Brand A | 500000 |
| 002 | 456 Oak Ave, Toronto, ON | Brand B | 750000 |
| 003 | 789 Pine St, Mississauga, ON | Target Co | 900000 |

<div class="screenshot-placeholder">
[Screenshot: Example Excel file showing proper data format]
</div>

## Step 2: Uploading Your File

1. Click the **"Upload Excel File"** button
2. Select your prepared Excel file
3. Wait for the file to be processed

<div class="screenshot-placeholder">
[Screenshot: File upload dialog and processing indicator]
</div>

## Step 3: Column Mapping

After upload, you'll need to map your Excel columns to the required fields:

1. **Location Column**: Select which column contains unique location identifiers
2. **Address Column**: Select the column with full addresses
3. **Competitor Column**: Choose the column identifying the brand/company
4. **Economic Value Column** (optional): Select if you have revenue/sales data

<div class="screenshot-placeholder">
[Screenshot: Column mapping interface with dropdown selections]
</div>

## Step 4: Identifying Merger Parties

This critical step defines which companies are involved in the merger:

- **Purchaser**: Select the acquiring company from the dropdown
- **Target**: Select the company being acquired

The system will automatically identify all unique brands in your data and present them as options.

<div class="screenshot-placeholder">
[Screenshot: Purchaser and Target selection dropdowns]
</div>

## Step 5: Geocoding

The application will automatically geocode your addresses to get latitude/longitude coordinates:

- **Primary Service**: OpenStreetMap Nominatim (free)
- **Fallback Services**: Google Maps or Mapbox (if configured)
- **Pre-geocoded Data**: If your data already has coordinates, you can skip this step

### Geocoding Progress
- Real-time progress indicator shows completion percentage
- Failed addresses are logged and can be manually corrected
- **Coordinate Spreading**: Duplicate coordinates automatically spread using golden-angle spiral algorithm for perfect visualization

### Performance Expectations
- **Processing capacity**: Up to 5,000+ locations
- **Memory usage**: ~0.065 MB per location
- **Geocoding speed**: ~1-2 seconds per address (varies by service)
- **Batch processing**: Handles large datasets efficiently

<div class="screenshot-placeholder">
[Screenshot: Geocoding progress bar and results summary]
</div>

## Best Practices

- **Data Quality**: Ensure addresses are complete and properly formatted
- **Unique IDs**: Every location must have a unique identifier
- **Brand Names**: Use consistent naming for brands (e.g., always "McDonald's" not "McDonalds" or "McDonald's Restaurant")
- **Save Your Work**: Download the geocoded results for future use

## Troubleshooting

### Common Issues

**File Won't Upload**
- Check file format (must be .xlsx or .xls)
- Ensure file size is under 10MB
- Verify no password protection on the file

**Geocoding Failures**
- Review address format (include city and province/state)
- Check for special characters or typos
- Consider using pre-geocoded data if available

**Missing Brands**
- Ensure the competitor column has values for all rows
- Check for inconsistent brand naming
- Remove any blank rows from your Excel file

## Next Steps

Once your data is successfully uploaded and geocoded, you're ready to proceed to **Tab 2: Market Overview** for multi-market analysis.

<div class="screenshot-placeholder">
[Screenshot: Success message and "Proceed to Analysis" button]
</div>