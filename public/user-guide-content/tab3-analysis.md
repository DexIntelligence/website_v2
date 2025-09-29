# Tab 3: Individual Market Analysis

## Overview
The Individual Market Analysis tab allows you to perform detailed analysis of specific locations with full control over market definition methods. This is essential for markets requiring special consideration or different parameters than the broad screening.

![Options for analysis of individual markets](/user-guide-content/tab3.png)

## Options for Analysis

### A. Single Location Analysis
Select one location to analyze its surrounding market in detail. As with Tab 2, users can choose:
 - **Distance**: Boundaries defined by a radius of stright-line distance
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

![Selecting market definition for individual market analysis](/user-guide-content/tab3-ind-defn.png)

## Analyzing Combined Catchments

Analyze markets that are combinations of individual location catchments by checking the "Multi-location analysis" checkbox:

![Selecting the option to analyze multiple catchments](/user-guide-content/multi-location-checkbox.png)

There are two options for analyzing multiple locations together:

**1. Union Method**: Shows the total area served by any of the selected locations

**2. Intersection Method**: Shows only the area served by all selected locations

## Analyzing Census Boundaries



## Understanding the Results

### Market Map Visualization

The interactive map shows:
- Selected location(s) with markers
- Market boundary in orange
- Competitor locations within market
- Color coding by brand

<div class="screenshot-placeholder">
[Screenshot: Detailed market map with all elements labeled]
</div>

### Competitor Analysis Table

Detailed breakdown of all competitors in the defined market:

| Brand | Locations | Market Share | Revenue |
|-------|-----------|--------------|---------|
| Purchaser | 3 | 28% | $2.5M |
| Target | 2 | 15% | $1.3M |
| Competitor A | 4 | 35% | $3.1M |
| Competitor B | 2 | 22% | $1.9M |

<div class="screenshot-placeholder">
[Screenshot: Competitor analysis table with market shares]
</div>

### Market Concentration Metrics

**Pre-Merger Metrics:**
- HHI: 1,750
- Purchaser Share: 28%
- Target Share: 15%

**Post-Merger Metrics:**
- HHI: 2,200 (Δ450)
- Combined Share: 43%
- Concentration Level: Moderately Concentrated → Highly Concentrated

<div class="screenshot-placeholder">
[Screenshot: Pre/post merger metrics comparison]
</div>

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

<div class="screenshot-placeholder">
[Screenshot: Side-by-side comparison of different market definitions]
</div>

### Economic Value Weighting

If you provided economic values (revenue, sales):
- Market shares are weighted by economic value
- More accurate representation of competitive significance
- Critical for markets with varying store sizes

<div class="screenshot-placeholder">
[Screenshot: Toggle between unit-based and value-based market shares]
</div>

## Special Considerations

### Edge Effects

For locations near boundaries (provincial borders, coastlines):
- Market areas may be truncated
- Consider adjusting analysis method
- Document any limitations in your analysis

<div class="screenshot-placeholder">
[Screenshot: Market near water boundary showing truncated catchment]
</div>

### Data Completeness

The analysis identifies:
- Competitors within market boundaries
- Missing data warnings
- Geocoding accuracy indicators
- **Location ID Requirements**: All operations use sanitized location IDs for consistency

## Exporting Individual Analysis

Export options for detailed market analysis:
- **PDF Report**: Full analysis with maps and tables
- **Excel Details**: Raw data for further analysis
- **Map Image**: High-resolution market map

<div class="screenshot-placeholder">
[Screenshot: Export menu with format options]
</div>

## Best Practices

1. **Start with Conservative Definitions**: Begin with smaller markets and expand if justified
2. **Document Your Rationale**: Save notes on why you chose specific parameters
3. **Consider Multiple Scenarios**: Regulators may question your market definition
4. **Validate with Local Knowledge**: Confirm results make business sense

## Common Use Cases

### Urban Retail Analysis
- Use 5-10km radius or 10-15 minute drive time
- Consider census subdivisions for official boundaries
- Account for public transit accessibility

### Rural/Suburban Markets
- Use larger radius (15-20km) or longer drive times (20-30 minutes)
- Census agglomerations often appropriate
- Consider seasonal variations

### Specialized Markets
- Adjust parameters based on product characteristics
- Consider customer willingness to travel
- Account for delivery radius if applicable

## Known Limitations

- **Multi-location analysis**: Requires contiguous (connected) catchment areas
- **Census boundaries**: Only available for Canadian geography
- **Travel-time accuracy**: Reflects typical traffic, may vary ±10-15%
- **Edge effects**: Markets near borders or water may be truncated

## Next Steps

After completing individual market analyses:
- **Tab 4: Optimal Divestiture** - If remedies are needed
- **Tab 5: Settings & Export** - Generate comprehensive reports

<div class="screenshot-placeholder">
[Screenshot: Navigation to next steps]
</div>