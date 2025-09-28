# Tab 2: Market Overview

## Overview
The Market Overview tab provides a comprehensive multi-market screening across all your locations. This powerful analysis identifies which geographic markets may raise competitive concerns based on market share and concentration thresholds.

<div class="screenshot-placeholder">
[Screenshot: Market Overview tab showing map and results table]
</div>

## Understanding Market Analysis

### What is a Geographic Market?
A geographic market defines the area where customers can reasonably turn to for alternative suppliers. Market Mapper supports two methods:

1. **Distance Radius**: Fixed radius circles (e.g., 5km, 10km)
2. **Travel Time Isochrone**: Areas reachable within a certain drive time (e.g., 15 minutes)

<div class="screenshot-placeholder">
[Screenshot: Visual comparison of distance radius vs travel-time isochrone]
</div>

## Configuring Your Analysis

### Step 1: Select Market Definition Method

**Distance Radius**
- Simple circular markets
- Choose from preset distances (2km, 5km, 10km, 15km, 20km)
- Best for urban areas with uniform density

**Travel Time** (requires Mapbox API)
- Realistic drive-time boundaries
- Accounts for roads, traffic patterns, and barriers
- More accurate for suburban/rural areas

<div class="screenshot-placeholder">
[Screenshot: Market definition method selector with options]
</div>

### Step 2: Review Regulatory Thresholds

The system automatically flags markets that exceed:
- **Market Share**: Combined share > 30%
- **HHI Threshold**: HHI > 1800 AND ΔHHI > 100

These thresholds can be customized in Tab 5: Settings.

<div class="screenshot-placeholder">
[Screenshot: Threshold indicators and legend]
</div>

## Understanding the Results

### Interactive Map

The map displays all analyzed markets with color coding:
- 🟢 **Green**: No competitive concerns
- 🟡 **Yellow**: Approaching thresholds
- 🔴 **Red**: Exceeds regulatory thresholds

<div class="screenshot-placeholder">
[Screenshot: Interactive map with color-coded market circles]
</div>

### Results Table

The table shows detailed metrics for each market:

| Location | Market Share | HHI | ΔHHI | Flag |
|----------|-------------|-----|------|------|
| Toronto Downtown | 35% | 2100 | 150 | 🔴 |
| Mississauga | 22% | 1600 | 80 | 🟢 |
| Scarborough | 31% | 1850 | 120 | 🔴 |

Key Metrics:
- **Market Share**: Combined purchaser + target share post-merger
- **HHI**: Herfindahl-Hirschman Index (market concentration)
- **ΔHHI**: Change in HHI due to merger
- **Flag**: Visual indicator of threshold breach

<div class="screenshot-placeholder">
[Screenshot: Detailed results table with sorting and filtering options]
</div>

## Analyzing Overlapping Markets

When markets overlap (common in dense urban areas), the system identifies:
- Markets with competitive overlap (both parties present)
- Problematic markets (exceeding thresholds)
- All affected locations within each market

<div class="screenshot-placeholder">
[Screenshot: Overlapping markets visualization]
</div>

## Filtering and Exporting

### Filter Options
- Show only problematic markets
- Filter by province/state
- Search by location name
- Hide markets below certain thresholds

### Export Options
- Download results as Excel
- Export map as image
- Generate summary report

<div class="screenshot-placeholder">
[Screenshot: Filter panel and export buttons]
</div>

## Performance Optimization

For large datasets (1000+ locations):
- Analysis uses smart caching to reduce API calls
- Distance calculations are optimized with bounding boxes
- Progress indicator shows real-time status

<div class="screenshot-placeholder">
[Screenshot: Progress bar during large dataset analysis]
</div>

## Interpreting Results

### What Makes a Market Problematic?

A market is flagged as problematic when:
1. Combined market share exceeds 30%, OR
2. HHI exceeds 1800 AND the merger increases HHI by more than 100 points

### Understanding HHI
- **< 1500**: Unconcentrated market
- **1500-2500**: Moderately concentrated
- **> 2500**: Highly concentrated

### Next Steps for Problematic Markets
1. Review individual markets in detail (Tab 3)
2. Consider potential remedies (Tab 4)
3. Prepare regulatory filings with supporting data

## Best Practices

- **Start Broad**: Begin with larger radius/time to identify all potential issues
- **Refine Analysis**: Narrow down to realistic market definitions
- **Document Rationale**: Save your market definition choices for regulatory submissions
- **Consider Local Factors**: Some markets may need individual adjustment

## Common Questions

**Q: Why are some markets not showing flags despite high shares?**
A: Check if the HHI increase (ΔHHI) is below 100 - this is also required for flagging.

**Q: Can I analyze different radius for different markets?**
A: Yes, use Tab 3 for individual market analysis with custom parameters.

**Q: How accurate are travel-time isochrones?**
A: They reflect typical traffic conditions and are generally within 10-15% of actual drive times.

## Next Steps

After identifying problematic markets, proceed to:
- **Tab 3: Individual Market Analysis** for detailed single-market examination
- **Tab 4: Optimal Divestiture** to explore remedy options

<div class="screenshot-placeholder">
[Screenshot: Navigation buttons to other tabs]
</div>