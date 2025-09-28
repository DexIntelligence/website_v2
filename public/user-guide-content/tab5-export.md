# Tab 5: Settings & Export

## Overview
The Settings & Export tab is your control center for configuring analysis parameters and generating professional reports. This is where you customize thresholds, manage API keys, and export your analysis for regulatory submissions or internal review.

<div class="screenshot-placeholder">
[Screenshot: Settings & Export tab overview]
</div>

## Regulatory Threshold Configuration

### Market Share Thresholds

Configure when market share triggers regulatory concern:
- **Default**: 30% combined share
- **Range**: 25% - 50%
- **Considerations**: Varies by jurisdiction and industry

<div class="screenshot-placeholder">
[Screenshot: Market share threshold slider]
</div>

### HHI Thresholds

Set Herfindahl-Hirschman Index parameters:
- **HHI Level**: Minimum HHI to flag (default: 1800)
- **ΔHHI**: Minimum increase to flag (default: 100)

Standard Classifications:
- **Unconcentrated**: HHI < 1500
- **Moderately Concentrated**: HHI 1500-2500
- **Highly Concentrated**: HHI > 2500

<div class="screenshot-placeholder">
[Screenshot: HHI threshold configuration panel]
</div>

### Jurisdiction-Specific Settings

Pre-configured threshold sets for different jurisdictions:
- **Canada Competition Bureau**: 35% share or HHI > 1800 with ΔHHI > 100
- **US DOJ/FTC**: 30% share or HHI > 2500 with ΔHHI > 200
- **European Commission**: 40% share or HHI > 2000 with ΔHHI > 150
- **Custom**: Define your own thresholds

<div class="screenshot-placeholder">
[Screenshot: Jurisdiction preset dropdown]
</div>

## API Configuration

### Mapbox API Keys

Required for travel-time analysis:
- **Public Token**: For map display (starts with `pk.`)
- **Secret Token**: For isochrone calculations (starts with `sk.`)

<div class="screenshot-placeholder">
[Screenshot: API key configuration fields]
</div>

### API Rate Limits

**Mapbox API Limits**:
- **Rate limit**: 300 requests per minute
- **Monthly quotas**: Based on your Mapbox plan
- **Optimization**: Smart caching reduces API calls by 50-80%

<div class="screenshot-placeholder">
[Screenshot: API usage dashboard]
</div>

## Export Options

### Excel Reports

Generate comprehensive Excel workbooks with multiple sheets:

#### Sheet 1: Executive Summary
- Transaction overview
- Key findings
- Problematic market count
- Recommended remedies

#### Sheet 2: Market Analysis
- All analyzed markets
- Pre/post merger metrics
- Threshold breach indicators
- Market maps (as images)

#### Sheet 3: Competitor Details
- Complete competitor inventory
- Market-by-market breakdown
- Share calculations
- Location details

#### Sheet 4: Divestiture Plan (if applicable)
- Recommended divestitures
- Market impact analysis
- Post-remedy structures

<div class="screenshot-placeholder">
[Screenshot: Excel export preview showing multiple sheets]
</div>

### Report Customization

Configure what to include in exports:
- [ ] Include technical methodology
- [ ] Add market maps
- [ ] Include competitor details
- [ ] Show calculation formulas
- [ ] Add data sources

<div class="screenshot-placeholder">
[Screenshot: Export customization checkboxes]
</div>

### Professional Excel Formatting

**Automatic Styling Applied**:
- **Font**: Bahnschrift throughout the workbook
- **Brand Colors**: Orange accent (#ee9e46) for headers and highlights
- **Financial Formatting**: Numbers formatted with thousands separators
- **Professional Borders**: Clean table borders and spacing
- **Conditional Formatting**: Threshold breaches highlighted automatically

<div class="screenshot-placeholder">
[Screenshot: Sample formatted report page]
</div>

## Methodology Documentation

### Included Methodology PDFs

**Always Included**:
- **market_concentration_methodology.pdf**:
  - HHI calculation formulas
  - Market share methodology
  - Distance-based and travel-time market definitions
  - Combined catchment analysis (union/intersection)
  - Census boundary definitions (CMA, CA, CSD)
  - Point-in-polygon testing methodology

**Conditionally Included**:
- **divestiture_methodology.pdf** (when remedies are analyzed):
  - CBC solver optimization approach
  - Crown jewel constraints
  - Heuristic warm-start process
  - Multi-market conflict resolution

<div class="screenshot-placeholder">
[Screenshot: PDF attachment panel]
</div>

### Custom Methodology Notes

Add case-specific methodology notes:
- Rationale for market definitions
- Data sources and limitations
- Assumptions and sensitivities
- Regulatory precedents referenced

<div class="screenshot-placeholder">
[Screenshot: Custom notes editor]
</div>

## Memory Management

### Real-Time Memory Monitoring

**Memory Usage Display**:
- Current usage shown in sidebar (MB)
- Warning at 500 MB usage
- **Clear Analysis Data** button appears when threshold exceeded

### Automatic Optimization
- Garbage collection after major operations
- Efficient DataFrame handling
- Smart caching to balance speed and memory

### Performance Guidelines
- **Memory per location**: ~0.065 MB
- **Maximum recommended**: 5,000 locations
- **Container limit**: 2-3 GB total

<div class="screenshot-placeholder">
[Screenshot: Save analysis dialog]
</div>

### Data Export Formats

Export analysis data:
- **Excel**: Full formatted workbook with multiple sheets
- **CSV**: Raw data export for further analysis

<div class="screenshot-placeholder">
[Screenshot: Data format selection dropdown]
</div>

### Session Management

**Current Session**:
- Analysis state maintained during session
- Export results before closing to preserve work
- No automatic versioning - save important analyses locally

<div class="screenshot-placeholder">
[Screenshot: Backup and recovery options]
</div>

## Report Generation

### Quick Export

One-click report generation with default settings:
- Standard format
- All analyses included
- Current thresholds
- PDF + Excel package

<div class="screenshot-placeholder">
[Screenshot: Quick Export button]
</div>

### Custom Report Builder

Build tailored reports:
1. Select sections to include
2. Choose visualizations
3. Add custom commentary
4. Preview before export

<div class="screenshot-placeholder">
[Screenshot: Custom report builder interface]
</div>

### Regulatory Submission Package

Specialized export for regulatory filings:
- Compliant format
- Required disclosures
- Supporting documentation
- Confidential/public versions

Components:
- Executive summary (public)
- Detailed analysis (confidential)
- Remedy proposal
- Supporting methodology
- Data appendices

<div class="screenshot-placeholder">
[Screenshot: Regulatory package generator]
</div>

## Performance Settings

### Memory Management

Monitor and manage application performance:
- Current memory usage
- Clear cached data
- Reset analysis state
- Optimize for large datasets

<div class="screenshot-placeholder">
[Screenshot: Memory usage indicator and controls]
</div>

### Processing Preferences

Configure analysis behavior:
- **Parallel Processing**: Use multiple CPU cores
- **Cache Results**: Store intermediate calculations
- **Progress Detail**: Verbose or simple progress indicators
- **Error Handling**: Strict or permissive mode

<div class="screenshot-placeholder">
[Screenshot: Processing preferences panel]
</div>

## Best Practices

### Before Exporting
1. Review all threshold settings
2. Verify market definitions are appropriate
3. Check for data completeness
4. Run quality checks on results

### Report Tips
- Generate both detailed and summary versions
- Include methodology for transparency
- Save analysis state for future questions
- Create both PDF and Excel formats

### Regulatory Submissions
- Use jurisdiction-specific thresholds
- Include all supporting documentation
- Prepare confidential and public versions
- Maintain audit trail of analysis

## Common Questions

**Q: Can I change thresholds after running analysis?**
A: Yes, changing thresholds will automatically update all flags and results.

**Q: How do I share reports with colleagues?**
A: Export reports and analysis state files, which can be shared and imported.

**Q: What's included in the methodology PDFs?**
A: Detailed explanations of calculations, formulas, and academic references.

## Final Steps

After configuring and exporting:
1. **Review all reports** for accuracy
2. **Save analysis state** for future reference
3. **Download backup** of all data
4. **Share with stakeholders** as appropriate

<div class="screenshot-placeholder">
[Screenshot: Final checklist and completion message]
</div>

## Known Issues

- **Excel reports**: May contain redundant "Locations" column without economic variable
- **Large exports**: Excel files with 1000+ locations may take time to generate
- **Memory limits**: Export may fail if memory usage exceeds container limits

## Support and Resources

Need help with exports or settings?
- Technical documentation in appendices
- Contact support team
- Methodology PDFs included with all exports

<div class="screenshot-placeholder">
[Screenshot: Help and support links]
</div>