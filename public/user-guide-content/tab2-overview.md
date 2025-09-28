# Tab 2: Market Overview

## Overview
The Market Overview tab provides a comprehensive **multi-market screening simultaneously across all your locations**. This powerful analysis identifies which geographic markets may raise competitive concerns based on market share and concentration thresholds.

**Key Capability**: Analyzes all overlapping markets at once, not just problematic ones, giving you a complete competitive landscape view.

<div class="screenshot-placeholder">
[Screenshot: Market Overview tab showing map and results table]
</div>

## Critical Analysis Flow

### The Three-Stage Logic
The Market Overview follows this critical progression:

1. **ALL MARKETS** → Identifies all geographic markets around your locations
2. **OVERLAPPING MARKETS** → Filters to markets where both merger parties are present (competitive overlap)
3. **PROBLEMATIC MARKETS** → Flags those exceeding regulatory thresholds

**IMPORTANT**: Tab 2 displays **ALL overlapping markets**, not just problematic ones. This complete view is essential for understanding the full competitive landscape.

<div class="screenshot-placeholder">
[Screenshot: Three-stage analysis flow diagram]
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

**CRITICAL**: The system displays ALL overlapping markets where both parties are present, not just problematic ones. This comprehensive view allows you to:

- See the complete competitive landscape
- Identify markets approaching thresholds
- Understand geographic patterns of competition
- Prepare for potential regulatory questions

When markets overlap (common in dense urban areas), the system shows:
- **All markets with competitive overlap** (both parties present) - displayed in table
- **Problematic markets** (exceeding thresholds) - flagged with indicators
- **All affected locations** within each market

<div class="screenshot-placeholder">
[Screenshot: Overlapping markets visualization]
</div>

## Display and Export Options

### Understanding the Display
By default, the table shows **ALL overlapping markets** (where both parties compete). This is intentional and required for proper analysis. Markets are flagged but not filtered out.

### Available Views
- **Default**: All overlapping markets with flags
- **Sort by severity**: Problematic markets first
- **Search**: Find specific locations
- **Province/state grouping**: Regional analysis

### Export Options
- Download complete results as Excel
- Export analysis summary
- Generate regulatory report format

<div class="screenshot-placeholder">
[Screenshot: Filter panel and export buttons]
</div>

## Performance Optimization

### Dataset Capacity
- **Handles up to 5,000+ locations** comfortably
- **Memory usage**: ~0.065 MB per location
- **Container requirement**: 2-3 GB total

### Optimization Features
For large datasets:
- **Smart caching**: 50-80% reduction in API calls through intelligent result caching
- **Bounding box pre-filtering**: 70-90% reduction in distance calculations
- **Real-time progress tracking**: Shows analysis status and estimated completion
- **Memory monitoring**: Sidebar displays current memory usage

### Performance Expectations
- **< 100 locations**: Near-instant results
- **100-1000 locations**: 1-5 minutes
- **1000-5000 locations**: 5-15 minutes

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