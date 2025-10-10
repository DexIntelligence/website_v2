# Tab 6: Settings & Export

## Overview
The Settings & Export tab is your control center for configuring analysis parameters and generating professional reports. This tab allows you to customize country settings, adjust regulatory thresholds, review analysis status, and export comprehensive reports for regulatory submissions or internal review.

![Tab 6: analysis configuration and report generation](/user-guide-content/tab6.png)

## On This Page

- Country configuration
- Threshold configuration
- Analysis data status
- Report generation
- Memory management

## Country Configuration

### Analysis Country/Region

Select the country or region for your analysis to configure appropriate settings:

![Country configuration settings](/user-guide-content/tab6-country.png)

The following are currently available:
- Canada
- US
- UK
- EU
- Australia

The country selection automatically configures:

**Address Fields:** Province/Postal Code (Canada) or State/ZIP Code (US)

**Distance Units:** Kilometers (Canada) or Miles (US)

**Geographic Boundaries:**
- Canada: Statistics Canada 2021 Census Boundaries (CMA, CA, CSD)
- United States: Commuter Zones (US Census Bureau census boundaries to be incorporated in future releases)
- (UK, EU and Australia coming soon)

### Active Configuration Display

After selecting your country, the system displays the active configuration showing:
- Address field requirements for geocoding
- Distance units for market definitions
- Available census boundary datasets

## Regulatory Threshold Configuration

These thresholds apply to all market analyses across all tabs (Tabs 2, 3, and 4).

![Regulatory threshold configuration](/user-guide-content/tab6-thresholds.png)

### Combined Share Threshold

Set the minimum combined market share that triggers regulatory concern:
- **Default**: 30% combined share
- **Range**: Adjustable based on jurisdiction
- **Application**: Markets where merging parties exceed this threshold are flagged

### Post-Merger HHI Threshold

Set the Herfindahl-Hirschman Index level that indicates market concentration concern:
- **Default**: 1,800
- **Application**: Markets with post-merger HHI above this level are flagged

### Delta HHI Threshold

Set the minimum HHI increase that triggers concern:
- **Default**: 100 points
- **Application**: Markets where the merger increases HHI by more than this amount are flagged

**Important Note:** Changing thresholds applies to all new analyses but will not retroactively impact analyses already saved.

## Analysis Data Status

Review the status of data and analyses across all tabs:

![Analysis data status display](/user-guide-content/tab6-datastatus.png)

### Data Loaded
- Shows whether location data has been successfully uploaded
- Status: Ready / Not Ready

### Market Overview (Tab 2)
- Shows number of multi-market analyses completed
- Example: "1 analyses" or "Ready"

### Market X-Ray (Tab 3)
- Shows number of screening definitions completed
- Example: "9 definitions" or "Ready"

### Individual Analysis (Tab 4)
- Shows number of individual market analyses completed
- Example: "3 analysis(es)" or "Ready"

### Divestiture Analysis (Tab 5)
- Shows whether remedy analyses are available
- Status: "Ready" or "Missing - No analysis"

## Select Analyses for Report

Choose which analyses to include in your Excel report:

![Select analyses for report](/user-guide-content/tab6-select.png)

### Multi-Market Analyses (Tab 2)
- Select from available Market Overview analyses
- Includes distance-based, drive-time, or census boundary screenings

### Individual Market Analysis (Tab 4)
- Select from saved individual market analyses
- Each analysis includes market definition, metrics, and competitor breakdown

### Remedy Analyses (Tab 5)
- Select from available divestiture solutions
- Note: If no remedy analyses exist, visit Tab 5 to generate solutions first

## Report Configuration

### Additional Report Options

Configure optional content to include in your report:

**Include Methodological Appendix**
- Detailed explanation of analytical methods
- Formulas and calculations
- Academic references
- Note: Demo version excludes the methodological appendix. Contact Dex for full access.

**Include Data Appendix**
- Complete location dataset
- All coordinates and attributes
- Useful for backup and sharing with colleagues

### Report Title

Customize your report name:
- Default: "Market Analysis Report"
- Edit to include transaction name or date
- Example: "ABC Corp Merger - Geographic Analysis"

## Report Generation

### Generate Excel Report

After selecting analyses and configuring options:

1. Review selected analyses (displayed count)
2. Click "Generate Excel Report"
3. Wait for report compilation
4. Click "Download Excel Report" when ready

**Note:** If no analyses are selected, the report will contain only the data appendix (if enabled).

![Name, generate and download excel report](/user-guide-content/tab6-download.png)

### Excel Report Structure

The generated Excel workbook includes multiple sheets:

**Sheet 1: Executive Summary**
- Transaction overview
- Key findings and problematic market count
- Recommended remedies summary

**Sheet 2: Market Analysis**
- All analyzed markets with pre/post merger metrics
- Threshold breach indicators
- Market maps (as embedded images)

**Sheet 3: Competitor Details**
- Complete competitor inventory
- Market-by-market breakdown
- Share calculations and location details

**Sheet 4: Divestiture Plan (if applicable)**
- Recommended divestitures
- Market impact analysis
- Post-remedy market structures

**Sheet 5: Data Appendix (if enabled)**
- Complete raw data export
- All locations with coordinates
- Party identifications and economic values

![Example of Excel report content](/user-guide-content/tab6-report-cover.png)

## System Management

### Memory Management

Use the System Management section to clear existing analyses and reset the application:

**Clear All Analysis:**
- Removes all saved analyses from Tabs 2-5
- Does not delete uploaded data
- Use when starting a new scenario or sensitivity test

**Reset Application:**
- Clears all data and analyses
- Returns to initial upload state
- Use when switching to a different transaction

![Manage system memory and saved analysis](/user-guide-content/tab6-system.png)

## Best Practices

### Before Exporting

1. **Review Country Configuration:** Ensure correct region and units are selected
2. **Verify Threshold Settings:** Confirm thresholds match regulatory standards
3. **Check Analysis Status:** Ensure all required analyses are completed
4. **Select Appropriate Analyses:** Include only relevant analyses in report

### Report Quality

1. **Descriptive Titles:** Use clear report names for future reference
2. **Include Context:** Add methodological appendix for regulatory submissions
3. **Backup Data:** Enable data appendix for archival purposes
4. **Review Before Sharing:** Open and verify Excel report before distribution

## Common Questions

**Q: Can I change thresholds after running analyses?**
A: Yes, but threshold changes only apply to new analyses. Existing saved analyses retain their original threshold settings.

**Q: What happens if I change the country configuration?**
A: Changing country settings affects address field requirements, distance units, and available census boundaries. Existing analyses remain valid but may need to be regenerated for consistency.

**Q: How do I share reports with colleagues?**
A: Export the Excel report and share the file. Recipients do not need access to the application to view the report.

**Q: What's included in the methodological appendix?**
A: Detailed explanations of market definition approaches, HHI calculations, remedy optimization algorithms, and academic references supporting the methodology.

**Q: Can I export analyses without generating a full report?**
A: The data appendix option allows you to export the raw location data. For analysis results, the Excel report is the primary export format.

## Final Steps

After configuring and exporting:

1. **Review Reports:** Open the Excel file and verify all analyses are correctly included
2. **Archive Analysis State:** Save a copy of the Excel report for future reference
3. **Document Assumptions:** Note country settings, thresholds, and market definitions used
4. **Share with Stakeholders:** Distribute reports to legal counsel, economic consultants, or business teams as needed
