# Tab 4: Optimal Divestiture Analysis

## Overview
The Optimal Divestiture Analysis tab uses advanced optimization algorithms to calculate the minimum set of locations that must be divested to meet regulatory requirements. This powerful tool helps structure remedies that resolve competition concerns while minimizing business impact.

![Tab 4: optimal remedy analysis](/user-guide-content/tab4.png)

## Understanding Divestiture Analysis

### What is a Divestiture?
A divestiture is the sale of specific business assets (in this case, store locations) to address competition concerns. The goal is to maintain effective competition in problematic markets.

### Why Optimize?
- **Minimize Business Impact**: Keep as many locations as possible
- **Ensure Compliance**: Meet all regulatory thresholds
- **Maintain Viability**: Preserve business operations in key markets

## Configuration Options

### Step 1: Select Problematic Markets

The system automatically identifies markets requiring remedies based on markets exceeding threshold from Tab 2 analysis:
 - **Select** the analysis from the dropdown menu

### Step 2: Set Divestiture Constraints

#### Market share and HHI thresholds

Optimization identifies the assets to be divested to get market shares and/or concentration below given thresholds:

**1.** It is unlikely that the Competition Bureau will require divestitures to result in market shares below the statutory thresholds, but the precise standard remains uncertain

**2.** The thresholds targeted by the algorithm can be configured in Tab 5 of the app (see part 5 of this user guide)

#### Crown Jewel Protection
Identify locations that should be divested only as a last resort:
- Flagship stores
- Recently renovated locations
- Strategic market positions

![Selecting crown jewels for remedy analysis](/user-guide-content/crown-jewels.png)

### Step 4: Choose Solution Method

The optimizatin procedure has different setting for extremely large datasets. For most datasets, "Full" is the best option, and will complete in a few minutes.

For larger datasets (e.g., 500+ merging party locations), assess the solution progressivley:
 - **Start Fast**: Select "Quick" for initial estimate of solution
 - **Progress To More Precise Methods**: depending on the complexity of the problem, and how long the solution is taking, gradually get more precise results by assessing the solution first with Quickest, then Quick, then Medium, and if time permits, the Full solution. Use the Estimate Time button to see estimated time to completion for the solution at different precision levels.

![Selecting optimization precision](/user-guide-content/tab4-options.png)

## Understanding the Optimization Process

### Technical Implementation
The system uses the **CBC (Coin-or Branch and Cut) solver** for mixed-integer linear programming (MILP) optimization:

1. **Heuristic Warm-Start**: Quick initial solution using greedy heuristics
2. **CBC Optimization**: Branch-and-cut algorithm refines to find true minimum
3. **Multi-Market Conflict Resolution**: Handles overlapping market constraints
4. **Validation Phase**: Verify all constraints are met

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

![Remedy package results](/user-guide-content/tab4-results.png)

### Strategic Multi-market Locations Summary

The app identifies the locations that affect market shares in many different markets, and provides detailed information on their impact on the divestiture:

![Breakdown of multi-market impact locations](/user-guide-content/tab4-multi-market.png)

### Market-by-Market Breakdown

Detailed table showing details of the remedy recommended for each problematic market:

![Overview of individual market divestitures](/user-guide-content/tab4-markets.png)

## Exporting Remedy Proposals

All remedies are saved for future reference and inclusion in the Excel report, generated on Tab 5 of the app

![All remedies are saved for future use and exporting to report](/user-guide-content/tab4-saved.png)

### Regulatory Submission Package

On tab 5, user can generate comprehensive remedy proposal including:
- Executive summary
- Market-by-market analysis
- Divestiture list with rationale
- Supporting methodology

## Best Practices

1. **Run Multiple Scenarios**: To determine the sensisitivy of results to different market definitions and target thresholds
2. **Document Assumptions**: Clear rationale for constraints
3. **Consider Buyer Perspective**: Ensure packages are viable
4. **Plan for Negotiation**: Have fallback options ready
5. **Validate Results**: Check optimization against business logic

## Common Questions

**Q: Why is the optimization taking so long?**
A: Dense urban markets with many overlaps create complex optimization problems. Consider breaking into regions.

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
