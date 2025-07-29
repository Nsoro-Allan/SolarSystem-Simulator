# Solar System Simulation

An interactive web-based simulation of our solar system that visualizes the planets orbiting around the sun, complete with detailed information about each celestial body.

## Features

- Real-time orbital simulation of all eight planets in the solar system
- Accurate relative distances using Astronomical Units (AU)
- Interactive planet information display with:
  - Distance from the Sun (in AU and kilometers)
  - Orbital period
  - Number of moons
  - Estimated travel time from Earth
  - Interesting facts about each planet
- NASA imagery for each planet
- Adjustable simulation with start/stop controls
- Visual orbit paths
- Planet labels

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- SVG for planet and orbit rendering

## Setup

1. Clone this repository to your local machine
2. Open `index.html` in a modern web browser
3. No additional dependencies or build steps required!

## Usage

- Click the "Start" button to begin the planetary orbital simulation
- Click the "Stop" button to pause the simulation
- Click on any planet's label to view detailed information about that planet
- Click the same planet again to hide the information panel

## Technical Details

- Planet distances are scaled logarithmically to maintain visibility while preserving relative positioning
- Orbital periods are based on actual planetary data
- Simulation speed is set to 36.5 days per second (configurable)
- Planets are rendered using SVG circles with appropriate scaling and coloring
- Planet positions are calculated using parametric equations for circular orbits

## Data Sources

- Planet imagery provided by NASA
- Planetary facts and figures based on NASA data
- Distances are measured in Astronomical Units (AU) where 1 AU = 149,597,870 km

## Future Enhancements

- Dynamic image fetching from NASA Images API (code structure already in place)
- Addition of planetary moons
- Interactive zoom functionality
- Realistic planet textures
- Mobile-responsive design
- Adjustable simulation speed

## Credits

- Planet images: NASA
- Astronomical data: Various NASA and astronomical databases

## Author

- Nsoro Allan

