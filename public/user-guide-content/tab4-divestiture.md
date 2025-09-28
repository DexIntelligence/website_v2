# Tab 4: Optimal Divestiture Analysis

## Overview
The Optimal Divestiture Analysis tab uses advanced optimization algorithms to calculate the minimum set of locations that must be divested to meet regulatory requirements. This powerful tool helps structure remedies that resolve competition concerns while minimizing business impact.

<div class="screenshot-placeholder">
[Screenshot: Divestiture Analysis tab main interface]
</div>

## Understanding Divestiture Analysis

### What is a Divestiture?
A divestiture is the sale of specific business assets (in this case, store locations) to address competition concerns. The goal is to maintain effective competition in problematic markets.

### Why Optimize?
- **Minimize Business Impact**: Keep as many locations as possible
- **Ensure Compliance**: Meet all regulatory thresholds
- **Maintain Viability**: Preserve business operations in key markets

<div class="screenshot-placeholder">
[Screenshot: Divestiture concept diagram]
</div>

## Configuration Options

### Step 1: Select Problematic Markets

The system automatically identifies markets requiring remedies based on:
- Markets exceeding threshold from Tab 2 analysis
- Custom market selections
- Regulatory feedback on specific markets

<div class="screenshot-placeholder">
[Screenshot: Problematic markets selection interface]
</div>

### Step 2: Set Divestiture Constraints

#### Crown Jewel Protection
Identify locations that should be divested only as a last resort:
- Flagship stores
- Recently renovated locations
- Strategic market positions

<div class="screenshot-placeholder">
[Screenshot: Crown jewel designation interface]
</div>

#### Divestiture Preferences
Set priorities for which locations to divest first:
- **Target First**: Prioritize divesting acquired locations
- **Purchaser First**: Consider divesting buyer's locations
- **Economic Value**: Divest lower-value locations first
- **No Preference**: Let algorithm optimize freely

<div class="screenshot-placeholder">
[Screenshot: Divestiture preference settings]
</div>

### Step 3: Define Success Criteria

Set target thresholds for post-divestiture markets:
- **Market Share Target**: Maximum combined share (e.g., < 30%)
- **HHI Target**: Maximum HHI level (e.g., < 1800)
- **ΔHHI Target**: Maximum HHI increase (e.g., < 100)

<div class="screenshot-placeholder">
[Screenshot: Threshold configuration panel]
</div>

## Understanding the Optimization Process

### Technical Implementation
The system uses the **CBC (Coin-or Branch and Cut) solver** for mixed-integer linear programming (MILP) optimization:

1. **Heuristic Warm-Start**: Quick initial solution using greedy heuristics
2. **CBC Optimization**: Branch-and-cut algorithm refines to find true minimum
3. **Multi-Market Conflict Resolution**: Handles overlapping market constraints
4. **Validation Phase**: Verify all constraints are met

**Key Technical Features**:
- Linear programming with integer constraints
- Crown jewel penalty weights in objective function
- Real-time progress tracking during solve

<div class="screenshot-placeholder">
[Screenshot: Optimization progress indicator with phases]
</div>

### Processing Time Expectations

**IMPORTANT**: Dense urban markets with many overlaps can be computationally intensive.

- Small problems (< 20 markets): 1-5 minutes
- Medium problems (20-50 markets): 5-15 minutes
- Large problems (50+ markets): 15-60 minutes
- **Very complex urban markets**: Can exceed 2-4 hours

**Performance Tips**:
- For very large problems, consider breaking into regions
- Crown jewel constraints increase solve time
- More overlapping markets = longer computation

## Interpreting Results

### Divestiture Summary

The optimization results show:
- **Total Divestitures Required**: Minimum number of locations
- **Markets Resolved**: Number of problematic markets addressed
- **Business Impact**: Revenue/economic value of divested locations

<div class="screenshot-placeholder">
[Screenshot: Divestiture summary statistics]
</div>

### Market-by-Market Breakdown

Detailed table showing remedies for each problematic market:

| Market | Locations to Divest | Post-Remedy Share | Post-Remedy HHI |
|--------|-------------------|-------------------|-----------------|
| Toronto Downtown | Store #123, #456 | 29% | 1,750 |
| Mississauga | Store #789 | 25% | 1,650 |
| Scarborough | Store #234 | 28% | 1,700 |

<div class="screenshot-placeholder">
[Screenshot: Detailed market remedy table]
</div>

### Divestiture Map

Visual representation showing:
- 🔴 Locations to divest (red markers)
- 🟢 Locations to retain (green markers)
- 🟡 Crown jewels avoided (yellow markers)
- Market boundaries with resolution status

<div class="screenshot-placeholder">
[Screenshot: Map showing divestiture recommendations]
</div>

## Alternative Scenarios

### Scenario Testing
Run multiple scenarios to understand options:

1. **Minimum Divestiture**: Absolute minimum required
2. **Clean Sweep**: Divest all target locations in problematic markets
3. **Balanced Approach**: Mix of purchaser and target divestitures
4. **Crown Jewel Protection**: Avoid key assets at all costs

<div class="screenshot-placeholder">
[Screenshot: Scenario comparison interface]
</div>

### Sensitivity Analysis

Test how results change with different thresholds:
- What if regulators require < 25% market share?
- Impact of stricter HHI requirements
- Trade-offs between different markets

<div class="screenshot-placeholder">
[Screenshot: Sensitivity analysis controls and results]
</div>

## Package Deal Options

### Creating Divestiture Packages

Group locations for sale to single buyer:
- Maintain operational viability
- Ensure effective competition
- Meet buyer interest

Package Considerations:
- Geographic clustering
- Brand consistency
- Operational synergies
- Economic viability

<div class="screenshot-placeholder">
[Screenshot: Package creation interface]
</div>

## Exporting Remedy Proposals

### Regulatory Submission Package

Generate comprehensive remedy proposal including:
- Executive summary
- Market-by-market analysis
- Divestiture list with rationale
- Post-remedy market structures
- Supporting methodology

<div class="screenshot-placeholder">
[Screenshot: Export package options]
</div>

### Internal Reporting

Create internal documents for decision-making:
- Business impact assessment
- Alternative scenario comparison
- Implementation timeline
- Buyer identification priorities

## Implementation Considerations

### Practical Constraints

Real-world factors to consider:
- **Lease Terms**: Can locations be transferred?
- **Employee Impact**: Staffing considerations
- **Brand Requirements**: Franchise agreements
- **Timing**: How quickly can divestitures be completed?

### Buyer Requirements

Ensure divested package is attractive:
- Sufficient scale for viability
- Geographic coherence
- Positive cash flow potential
- Operational independence

<div class="screenshot-placeholder">
[Screenshot: Implementation checklist]
</div>

## Best Practices

1. **Run Multiple Scenarios**: Don't rely on single optimization
2. **Document Assumptions**: Clear rationale for constraints
3. **Consider Buyer Perspective**: Ensure packages are viable
4. **Plan for Negotiation**: Have fallback options ready
5. **Validate Results**: Check optimization against business logic

## Common Questions

**Q: Why is the optimization taking so long?**
A: Dense urban markets with many overlaps create complex optimization problems. Consider breaking into regions.

**Q: Can I manually override recommendations?**
A: Yes, you can manually select/deselect locations and re-run analysis.

**Q: What if no solution exists?**
A: This means thresholds cannot be met with any divestiture combination. Consider behavioral remedies or market exit.

## Known Issues & Limitations

- **Processing time**: Dense urban datasets can exceed 2-4 hours
- **Memory usage**: Large optimization problems may require breaking into regions
- **No solution cases**: Some threshold combinations may be impossible to achieve
- **Complexity scaling**: Overlapping markets exponentially increase solve time

## Next Steps

After determining optimal divestitures:
- **Tab 5: Settings & Export** - Generate final reports
- **Download remedy package** for regulatory submission
- **Share results** with legal and business teams

<div class="screenshot-placeholder">
[Screenshot: Next steps and export options]
</div>