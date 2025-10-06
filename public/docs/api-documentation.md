API Documentation
=================

Overview
--------

The Market Analysis Application uses two external API services to provide geocoding, mapping, and geographic analysis capabilities:

1. **Google Maps API** - Geocoding service
2. **Mapbox API** - Map visualization and drive-time isochrone generation

API keys are pre-configured in the application. This documentation explains how these services support the application's functionality.

* * *

Google Maps API
---------------

### Usage in the Application

**Primary Geocoding Service** (Tab 1: Upload Data)

* Converts street addresses into latitude/longitude coordinates
* Processes addresses at approximately 3-4 locations per second
* Handles complex address formats including multi-column addresses
* Serves as the primary geocoding method with fallback options available

### How It Works

When you upload location data:

1. The application sends each address to the Google Maps Geocoding API
2. Google returns precise latitude/longitude coordinates
3. Coordinates are displayed on the overview map
4. Failed geocoding attempts are logged and can be retried with alternative services

### Service Characteristics

* **Accuracy**: Generally provides the most accurate geocoding results
* **Coverage**: Global coverage with particularly strong performance in North America
* **Processing Speed**: ~3-4 addresses per second
* **Timeout**: 10 seconds per request before attempting fallback service

* * *

Mapbox API
----------

### Usage in the Application

**Map Visualization** (All Tabs)

* Provides interactive base map tiles throughout the application
* Displays location markers, market boundaries, and geographic features
* Supports zoom, pan, and other interactive map controls

**Isochrone Generation** (Tab 2 & Tab 3: Market Analysis)

* Creates drive-time based market boundaries
* Calculates realistic catchment areas based on road networks
* Accounts for traffic patterns and geographic barriers
* Processes approximately 400 isochrones per minute

**Fallback Geocoding** (Tab 1: Upload Data)

* Alternative geocoding service when Google Maps fails
* Provides comparable accuracy for most addresses

### How Isochrones Work

When you select drive-time analysis:

1. Application requests isochrone from Mapbox for each location
2. Mapbox calculates drivable area within specified time (e.g., 15 minutes)
3. Returns polygon boundary representing realistic market catchment
4. Progress bar shows completion status during bulk processing

### Service Characteristics

**Map Tiles:**

* High-resolution, interactive maps
* Consistent styling across all application views
* Fast loading and responsive performance

**Isochrones:**

* Based on OpenStreetMap road network data
* Reflects typical traffic conditions
* Generally within 10-15% of actual drive times
* More accurate for suburban/rural areas than simple distance radius

* * *

Performance & Limitations
-------------------------

### Geocoding Performance

**Dataset Size Expectations:**

* **< 100 locations**: 30-60 seconds
* **100-500 locations**: 2-5 minutes
* **500-1,000 locations**: 5-10 minutes
* **1,000-5,000 locations**: 15-45 minutes
* **5,000-10,000 locations**: 45-90 minutes

### Isochrone Generation Performance

**Processing Capacity:**

* Approximately 400 isochrones per minute
* Real-time progress indicator during bulk analysis
* Estimated completion time displayed for large datasets

**Dataset Size Expectations:**

* **< 100 locations**: 1-2 minutes
* **100-500 locations**: 2-10 minutes
* **500-1,000 locations**: 10-20 minutes
* **1,000+ locations**: 20+ minutes (consider regional batching)

### Known Limitations

**Geocoding:**

* Requires complete addresses (street, city, province/state)
* May struggle with rural routes or PO boxes
* Special characters or inconsistent formatting can cause failures
* Some international addresses may have lower accuracy

**Isochrones:**

* Require valid latitude/longitude coordinates
* Cannot generate isochrones for locations without road access
* Very remote locations may have limited road network data
* Calculation assumes typical traffic, not real-time conditions

* * *

Service Reliability
-------------------

### Fallback Mechanisms

The application includes robust fallback options:

**Geocoding Hierarchy:**

1. Google Maps (primary)
2. Mapbox (fallback option 1)
3. OpenStreetMap Nominatim (fallback option 2)

**Manual Override:**

* Failed geocodes can be manually corrected
* Pre-geocoded data can bypass API services entirely
* Retry options available for failed addresses

### Error Handling

The application gracefully handles API issues:

* Failed requests are logged and reported to user
* Alternative services automatically attempted when available
* Partial results saved (e.g., 950 of 1,000 locations geocoded)
* Users can retry failed addresses with different services

* * *

Best Practices for Optimal Performance
--------------------------------------

### Data Preparation

**Before Upload:**

* Ensure addresses are complete and properly formatted
* Use consistent address formatting across your dataset
* Include city and province/state for all locations
* Remove special characters when possible

**For Large Datasets (1,000+ locations):**

* Consider pre-geocoding data outside the application
* Break analysis into regional segments when feasible
* Use existing coordinates if available
* Save geocoded results to avoid re-processing

### Analysis Optimization

**Drive-Time Analysis:**

* Start with smaller market definitions (10-15 minutes) for faster processing
* Use distance-based analysis for initial screening
* Reserve drive-time analysis for detailed market examination
* Consider Census Boundaries as an alternative for broad screening

**Multi-Market Screening:**

* Distance-based analysis processes much faster than drive-time
* Use Tab 2 for broad screening with distance radius
* Use Tab 3 for detailed individual markets with drive-time isochrones

* * *

Understanding API-Related Messages
----------------------------------

### Common Status Messages

**"Geocoding in progress... X of Y complete"**

* Normal processing message
* Shows real-time progress through your dataset
* Expected processing speed: 3-4 addresses per second

**"Generating isochrones... X of Y complete"**

* Creating drive-time market boundaries
* Expected processing speed: ~400 per minute
* Large datasets may take 20+ minutes

**"Geocoding failed for X locations"**

* Some addresses could not be converted to coordinates
* Review failed addresses for formatting issues
* Try alternative geocoding service
* Consider manual coordinate entry

**"Some locations outside isochrone service area"**

* Locations lack sufficient road network data
* Common for very remote or island locations
* Use distance-based analysis instead

* * *

Technical Specifications
------------------------

### Google Maps Geocoding API

**Service**: Google Maps Geocoding API **Purpose**: Address to coordinate conversion **Response Format**: JSON with latitude/longitude **Rate**: ~3-4 requests per second (application-managed) **Coverage**: Global

### Mapbox Services

**Map Tiles Service**:

* Provider: Mapbox GL JS
* Style: Mapbox Streets
* Zoom Levels: 0-22

**Isochrone Service**:

* API: Mapbox Isochrone API
* Profile: Driving
* Contour Types: Time-based (5, 10, 15, 20, 25, 30 minutes)
* Rate: ~400 requests per minute (application-managed)

**Geocoding Service** (fallback):

* API: Mapbox Geocoding API
* Coverage: Global
* Accuracy: Comparable to Google Maps for most regions

* * *

Troubleshooting
---------------

### If Geocoding Fails

1. **Check address format**: Ensure complete addresses with city and province/state
2. **Try alternative service**: Use "Try Another Service" button to attempt Mapbox or OSM
3. **Review failed addresses**: Check for typos, special characters, or incomplete data
4. **Use pre-geocoded data**: If available, upload data with existing coordinates

### If Isochrones Fail

1. **Verify coordinates**: Ensure locations have valid latitude/longitude
2. **Check location accessibility**: Very remote areas may lack road network data
3. **Switch to distance analysis**: Use radius-based markets as alternative
4. **Reduce dataset size**: Process smaller regional batches

### If Maps Don't Display

1. **Refresh the page**: Clear browser cache and reload
2. **Check browser compatibility**: Use modern browsers (Chrome, Firefox, Safari, Edge)
3. **Verify internet connection**: Ensure stable connection for loading map tiles
4. **Review browser console**: Technical errors may provide specific guidance

* * *

_For technical support or questions about API functionality, please contact your application administrator._
