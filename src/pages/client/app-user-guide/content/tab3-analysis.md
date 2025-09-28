# Tab 3: Individual Market Analysis

## Overview
The Individual Market Analysis tab allows you to perform detailed analysis of specific locations with full control over market definition methods. This is essential for markets requiring special consideration or different parameters than the broad screening.

<div class="screenshot-placeholder">
[Screenshot: Individual Market Analysis tab interface]
</div>

## Selecting Locations for Analysis

### Single Location Analysis
Select one location to analyze its surrounding market in detail.

### Multi-Location Analysis
Analyze multiple locations together to understand combined catchment areas:
- **Union**: Combined reach of all selected locations
- **Intersection**: Overlapping area served by all locations

<div class="screenshot-placeholder">
[Screenshot: Location selector with single and multi-location options]
</div>

## Market Definition Methods

### Method 1: Distance Radius

Simple circular markets based on straight-line distance.

**When to Use:**
- Urban areas with uniform density
- Preliminary screening
- When travel patterns are not critical

**Configuration:**
- Select radius: 2km, 5km, 10km, 15km, or 20km
- Custom radius option available

<div class="screenshot-placeholder">
[Screenshot: Distance radius selector and resulting circular market]
</div>

### Method 2: Travel-Time Isochrone

Market boundaries based on actual driving time.

**When to Use:**
- Suburban or rural areas
- Markets with natural barriers (rivers, mountains)
- When customer travel patterns matter

**Configuration:**
- Drive time: 5, 10, 15, 20, or 30 minutes
- Traffic conditions: Typical weekday patterns

<div class="screenshot-placeholder">
[Screenshot: Travel-time selector and irregular isochrone shape]
</div>

### Method 3: Census Boundaries

Use official Canadian census geography for market definition.

**Available Boundaries:**
- **CMA**: Census Metropolitan Areas (large urban centers)
- **CA**: Census Agglomerations (medium urban centers)
- **CSD**: Census Subdivisions (municipalities)

**When to Use:**
- Regulatory precedent uses census boundaries
- Need consistent, official boundaries
- Comparing to demographic data

<div class="screenshot-placeholder">
[Screenshot: Census boundary selector with map showing official boundaries]
</div>

## Analyzing Combined Catchments

When analyzing multiple locations together:

### Union Method
Shows the total area served by any of the selected locations.

**Use Case**: Understanding the combined reach of multiple stores that will be under common ownership post-merger.

<div class="screenshot-placeholder">
[Screenshot: Union of three store catchment areas]
</div>

### Intersection Method
Shows only the area served by all selected locations.

**Use Case**: Identifying the core market area where all stores compete directly.

<div class="screenshot-placeholder">
[Screenshot: Intersection showing overlapping coverage area]
</div>

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

## Next Steps

After completing individual market analyses:
- **Tab 4: Optimal Divestiture** - If remedies are needed
- **Tab 5: Settings & Export** - Generate comprehensive reports

<div class="screenshot-placeholder">
[Screenshot: Navigation to next steps]
</div>