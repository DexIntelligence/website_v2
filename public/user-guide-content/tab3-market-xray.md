# Tab 3: Market X-Ray (Beta)

## Overview
The Market X-Ray feature provides an automated, comprehensive screening of all competitive overlaps in your dataset. It quickly identifies areas of concern by analyzing every location where the merging parties compete, helping you prioritize which markets require detailed investigation.

![Market X-Ray analysis interface](/user-guide-content/tab3-market-xray.png)

## What is Market X-Ray?

Market X-Ray performs systematic competitive screening across all locations in your dataset. Instead of analyzing markets one-by-one, it automatically:
- Identifies every location where parties overlap
- Calculates market shares and concentration metrics
- Flags high-risk competitive overlaps
- Provides sortable, filterable results for prioritization

This beta feature is designed to accelerate the initial stages of merger review by surfacing potential concerns before detailed market analysis.

## Running a Market X-Ray Analysis

### Step 1: Configure Market Definition

Choose how you want to define local markets for the screening:

**Distance-Based Markets:**
- Define markets by radius (e.g., 5km, 10km, 15km)
- Fastest computation

**Drive-Time Markets (Isochrones):**
- Define markets by travel time (e.g., 10 min, 15 min, 20 min)
- Accounts for road networks and traffic patterns

### Step 2: Set Screening Parameters

Configure which overlaps to identify:

**Market Share Thresholds:**
- Set minimum combined market share to flag (e.g., >35%)
- Customize based on your jurisdiction's guidelines

**HHI (Herfindahl-Hirschman Index) Thresholds:**
- Set minimum post-merger HHI to flag (e.g., >2500)
- Set minimum HHI increase (delta) to flag (e.g., >200)

**Party Presence Requirements:**
- Screen only markets where both parties have locations
- Option to include markets with only one party present

### Step 3: Execute the Scan

Click "Run Market X-Ray" to begin the automated analysis. The system will:
1. Generate markets around each location in your dataset
2. Calculate competitive metrics for each market
3. Identify overlaps meeting your threshold criteria
4. Compile results into an interactive table

![Market X-Ray results table](/user-guide-content/x-ray-results.png)

## Understanding the Results

### Results Table

The Market X-Ray results table displays all flagged markets with key information:

**Location Details:**
- Location name and address
- Party affiliation (Purchaser/Target)
- Geographic coordinates

**Competitive Metrics:**
- Combined party market share (%)
- Pre-merger HHI
- Post-merger HHI
- HHI delta (increase)
- Number of competitors in market

**Risk Indicators:**
- Color-coded severity (red/yellow/green based on thresholds)
- Ranking by concern level
- Quick visual identification of problem markets

## Use Cases

### 1. Initial Merger Screening
Run Market X-Ray early in diligence to:
- Quickly identify geographic concerns
- Estimate number of problem markets
- Plan detailed analysis strategy
- Brief counsel on competitive issues

### 2. Prioritising Deep Dives
Use screening results to:
- Focus on highest-risk markets first
- Allocate analytical resources efficiently
- Identify markets requiring remedies

### 3. Sensitivity Testing
Re-run analysis with different parameters:
- Test various market definition sizes
- Evaluate different threshold levels
- Understand robustness of concerns

### 4. Client Communication
Present screening results to:
- Give clients early visibility into issues
- Set expectations for review timeline
- Illustrate competitive landscape visually

## Beta Feature Limitations

As a beta feature, Market X-Ray has some current limitations:

**Performance:**
- Large datasets (>1000 locations) may take several minutes
- Drive-time calculations are more resource-intensive than distance

**Integration:**
- Results can be exported but not yet auto-populated into individual analysis tabs
- Enhanced workflow integration planned

## Best Practices

1. **Start Broad:** Use conservative (larger) market definitions initially
2. **Iterate:** Re-run with tighter definitions on flagged areas
3. **Document:** Save screening parameters and results for your records
4. **Validate:** Spot-check automated results against manual calculations
5. **Follow Up:** Use Tab 4 for detailed analysis of flagged markets

## Troubleshooting

**Analysis Taking Too Long:**
- Reduce dataset size (filter to relevant regions)
- Use distance-based instead of drive-time
- Contact support for large-scale projects

**No Results Returned:**
- Check threshold settings (may be too restrictive)
- Verify data uploaded correctly
- Ensure locations have valid coordinates

**Unexpected Results:**
- Review market definition parameters
- Check for data quality issues (duplicate locations, etc.)
- Validate against known competitive overlaps

## Next Steps

After completing Market X-Ray screening:
- **Tab 4: Individual Market Analysis** - Deep dive on flagged markets
- **Tab 5: Divestiture Analysis** - Identify optimal remedies if needed
- **Tab 6: Settings & Export** - Generate comprehensive reports

## Feedback

Market X-Ray is in active development. Please report:
- Performance issues
- Unexpected results
- Feature requests
- User experience feedback

Your input helps us refine this tool for merger review practitioners.
