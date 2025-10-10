# Tab 4: Individual Market Analysis

## Overview
The Individual Market Analysis tab allows you to perform detailed analysis of specific locations with full control over market definition methods. This is essential for markets requiring special consideration or different parameters than the broad screening.

![Options for analysis of individual markets](/user-guide-content/tab4.png)

## Options for Analysis

### A. Single Location Analysis
Select one location to analyze its surrounding market in detail. As with Tab 2, users can choose:
 - **Distance**: Boundaries defined by a radius of straight-line distance
 - **Drive Time:** Boundaries defined by the territory that can be reached from the central point within a given time by car (a/k/a "drive-time isochrone")

### B. Multi-Location Analysis
Analyze multiple locations together to understand combined catchment areas:
- **Union**: Combined reach of all selected locations
- **Intersection**: Overlapping area served by all locations

**IMPORTANT LIMITATION**: Multi-location analysis requires contiguous (connected) catchment areas. If locations are too far apart to create overlapping or adjacent markets, the analysis may fail.

### C. Census Boundaries
Analyze competition and party overlap in markets defined by census boundaries, including:
-**Census Metropolitan Area (CMA)**
-**Census Agglomeration (CA)**
-**Census Subdivisions (CSD)**

## Analyzing Individual Markets

Analyze the competing locations around any Purchaser or Target location in the dataset:
 - **Select Market Definition**: Choose either distance- or drive-time-based market definition, and choose market size

![Selecting market definition for individual market analysis](/user-guide-content/tab4-ind-defn.png)

## Analyzing Combined Catchments

Analyze markets that are combinations of individual location catchments by checking the "Multi-location analysis" checkbox:

![Selecting the option to analyze multiple catchments](/user-guide-content/multi-location-checkbox.png)

There are two options for analyzing multiple locations together:

**1. Union Method**: Shows the total area served by any of the selected locations

**2. Intersection Method**: Shows only the area served by all selected locations

## Analyzing Census Boundaries

Analyze competition in any census boundary where the parties have competitive overlap:

![Analyzing competition in census boundaries](/user-guide-content/census-boundaries.png)

There are three options for analyzing multiple locations together:

-**Census Metropolitan Area (CMA)**
-**Census Agglomeration (CA)**
-**Census Subdivisions (CSD)**

All census boundaries are stored as files in a library in the secure cloud environment

## Analysis Results

### Market Map Visualization

The interactive map shows the boundary of the market, highlighting all locations in the market boundary:

![Map of individual market](/user-guide-content/tab4-map.png)


### Market Share and HHI results

Below the map the app presents detailed competition metrics for the defined market:

![Competition metrics for single market analysis](/user-guide-content/tab4-metrics.png)

### Competitor Analysis Table

Detailed breakdown of all competitors in the defined market:

![Competitive composition of individual market](/user-guide-content/tab4-breakdown.png)

## Advanced Analysis Options

### Enhanced Multi-Location Features
The system includes connectivity validation to ensure proper multi-location analysis:
- Validates catchment connectivity
- Identifies non-contiguous markets
- Provides warnings for separated locations

### Sensitivity Analysis

Test how results change with different market definitions:
- Compare 5km vs 10km radius
- Compare 10-minute vs 15-minute drive time
- Document which definition is most appropriate

### Economic Value Weighting

If you provided economic values (revenue, sales):
- Market shares are weighted by economic value
- More accurate representation of competitive significance
- Critical for markets with varying store sizes

## Special Considerations

### Edge Effects

For locations near boundaries (provincial borders, coastlines):
- Market areas may be truncated
- Consider adjusting analysis method
- Document any limitations in your analysis

## Exporting Individual Analysis

All analysis is saved for future reference and inclusion in the Excel report, generated on Tab 6 of the app

![Individual market analysis is saved for future use and exporting to report](/user-guide-content/tab4-saved.png)

## Best Practices

1. **Start with Conservative Definitions**: Begin with smaller markets and expand if justified
2. **Document Your Rationale**: Save notes on why you chose specific parameters
3. **Consider Multiple Scenarios**: Regulators may question your market definition
4. **Validate with Local Knowledge**: Confirm results make business sense

## Next Steps

After completing individual market analyses:
- **Tab 5: Optimal Divestiture** - If remedies are needed
- **Tab 6: Settings & Export** - Generate comprehensive reports
