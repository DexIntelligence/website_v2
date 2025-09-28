# Market Mapper - Technical Documentation

## Overview
Production-ready Streamlit application for antitrust geographic market analysis. Handles 5,000+ locations with optimized memory management.

**Status**: Stable production build  
**Architecture**: Three-layer separation (core_analysis.py → analysis.py → app.py)  
**Deployment**: Google Cloud Run with IAP

## Application Workflow

### Tab 1: Upload Data
- Excel upload with column mapping
- Multi-service geocoding (OpenStreetMap → Google Maps/Mapbox)
- Pre-geocoded data support
- Deterministic coordinate spreading for visibility

### Tab 2: Market Overview
- Multi-market analysis (distance/travel-time)
- Regulatory threshold flagging (>30% share OR HHI >1800 with Δ>100)
- Interactive PyDeck maps
- Progress tracking and smart API caching

### Tab 3: Individual Market Analysis
- Single/multi-location analysis
- Distance, travel-time, or census boundary methods
- Union/intersection for combined catchments
- Market metrics (shares, HHI, ΔHHI)

### Tab 4: Optimal Divestiture
- Linear programming with CBC solver
- Crown jewel constraints
- Multi-market conflict resolution
- Heuristic-first warm start
- Real-time progress tracking

## Critical Implementation Rules

### Market Analysis Logic Flow
```
ALL MARKETS → OVERLAPPING MARKETS → PROBLEMATIC MARKETS
(geographic)   (competitive overlap)   (threshold breach)
```

### Variable Naming
- `markets_with_flags`: ALL markets with flags
- `overlapping_markets`: Both parties present
- `problematic_markets`: Exceeding thresholds
- Never use `truly_problematic` or variants

### Display Requirements
- Tab 2 shows ALL overlapping markets (not just problematic)
- Never filter tables to problematic-only
- Use `location_id` for all operations

## Technical Architecture

### Core Modules
- **core_analysis.py**: Pure mathematical functions
- **analysis.py**: Business logic and data processing
- **app.py**: Streamlit UI
- **utils/geometry_operations.py**: Spatial analysis
- **utils/memory_manager.py**: Memory optimization

### API Configuration
```bash
MAPBOX_API_KEY=pk.xxx  # Public token
MAPBOX_SECRET_KEY=sk.xxx  # Secret token
```

### Performance
- Memory: 0.065 MB per location (optimized)
- Distance caching: 50-80% reduction
- Bounding box pre-filtering: 70-90% reduction
- Census files: Individual parquets (10-100x faster)

## Deployment

### Google Cloud Run
```bash
# Deploy
gcloud builds submit --config cloudbuild.yaml

# View logs
gcloud run services logs read market-mapper --region=us-central1 --limit=50

# IAP access
gcloud iap web add-iam-policy-binding \
  --resource-type=backend-services \
  --service=market-mapper \
  --member="user:email@domain.com" \
  --role="roles/iap.httpsResourceAccessor"
```

### Configuration
- Memory: 2GB (handles 5000+ locations)
- CPU: 2 vCPUs
- Timeout: 3600s
- Scaling: 0-10 instances

## Development Guidelines

### Import Patterns
```python
# app.py imports from analysis.py
from analysis import calculate_hhi_metrics, sanitize_analysis_id_component

# analysis.py imports from core_analysis.py
from core_analysis import calculate_hhi, evaluate_regulatory_thresholds
```

### Analysis ID Generation
```python
clean_id = sanitize_analysis_id_component(location_id)
analysis_id = f"{clean_id}_radius_{radius_km}km"
```

### Memory Management
```python
# Use decorator for intensive operations
@memory_managed
def process_large_dataset():
    pass

# Force cleanup after operations
force_garbage_collection()
```

## Excel Reports

### Styling
- Font: Bahnschrift
- Brand orange: #ee9e46
- Professional borders and spacing
- Financial number formatting

### Methodology PDFs (v1.2)
- market_concentration_methodology.pdf (always included)
  - Distance-based and travel-time markets
  - Combined catchments (union/intersection)
  - Census boundaries (CMA, CA, CSD)
  - Point-in-polygon testing for all market types
- divestiture_methodology.pdf (when remedies analyzed)

## Known Issues
- Excel report: Redundant "Locations" column without economic variable
- Tab 4: Can exceed 2-4 hours for dense urban datasets
- Multi-location analysis requires contiguous catchments

## Future Enhancements
- Pairwise Matrix API for exact travel times
- Tab 2 auto-fit zoom
- Dynamic scale bar for maps
- External session state (see GCS_SESSION_STATE_EXTERNALIZATION.md)

## Testing
```bash
# Run core analysis tests
python test_core_analysis.py

# Run comprehensive test suite
python -m pytest tests/
```

### Test Coverage
**Core Analysis (`test_core_analysis.py`)**:
- Market shares sum to 100%
- HHI calculations accuracy
- Regulatory threshold evaluation
- Competitive overlap detection

**Component Tests (`tests/`)**:
- `test_coordinate_uniqueness.py`: Deterministic coordinate spreading and bounds clamping
- `test_analysis.py`: Location ID uniqueness and data processing
- `test_market_pipeline.py`: Market analysis pipeline and competitor aggregation
- `test_app_summary.py`: Executive summary generation and thresholds
- `test_unique_location_ids.py`: Location ID generation and validation