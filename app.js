const svg = document.querySelector("#solar-svg");
const infoDiv = document.querySelector("#info");
const centerX = 500;
const centerY = 500;
const a = 200; // Base radius
const b = 80; // Scaling factor

function getRadius(distanceAU) {
  return a + b * Math.log(distanceAU);
}

const planets = [
  {
    name: "Mercury",
    distance: 0.39,
    size: 5,
    color: "#a9a9a9",
    period: 88,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA11245/PIA11245~large.jpg",
    moons: 0,
    travelTime: "~6 years",
    facts: [
      "Extreme temperature variations",
      "No atmosphere",
      "Smallest planet",
    ],
  },
  {
    name: "Venus",
    distance: 0.72,
    size: 12,
    color: "#e6b800",
    period: 225,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA00104/PIA00104~large.jpg",
    moons: 0,
    travelTime: "~5 years",
    facts: ["Hottest planet", "Thick toxic atmosphere", "Rotates backwards"],
  },
  {
    name: "Earth",
    distance: 1,
    size: 12,
    color: "#1e90ff",
    period: 365.25,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA18033/PIA18033~large.jpg",
    moons: 1,
    travelTime: "",
    facts: ["Only planet with life", "70% water", "One moon"],
  },
  {
    name: "Mars",
    distance: 1.52,
    size: 7,
    color: "#ff4500",
    period: 687,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA04591/PIA04591~large.jpg",
    moons: 2,
    travelTime: "~7 years",
    facts: ["Red due to iron oxide", "Largest volcano", "Two moons"],
  },
  {
    name: "Jupiter",
    distance: 5.2,
    size: 15,
    color: "#ffa500",
    period: 4333,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA21973/PIA21973~large.jpg",
    moons: 79,
    travelTime: "~5 years",
    facts: ["Largest planet", "Great Red Spot", "Strong magnetic field"],
  },
  {
    name: "Saturn",
    distance: 9.58,
    size: 12,
    color: "#f0e68c",
    period: 10759,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA02222/PIA02222~large.jpg",
    moons: 82,
    travelTime: "~7 years",
    facts: ["Prominent ring system", "Least dense planet", "Hexagonal storm"],
  },
  {
    name: "Uranus",
    distance: 19.2,
    size: 10,
    color: "#add8e6",
    period: 30687,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA18182/PIA18182~large.jpg",
    moons: 27,
    travelTime: "~9 years",
    facts: ["Tilted axis", "Blue-green color", "Coldest planet"],
  },
  {
    name: "Neptune",
    distance: 30.0,
    size: 10,
    color: "#0000ff",
    period: 60190,
    imageUrl:
      "https://images-assets.nasa.gov/image/PIA01492/PIA01492~large.jpg",
    moons: 14,
    travelTime: "~12 years",
    facts: ["Strongest winds", "Great Dark Spot", "Farthest planet"],
  },
];

planets.forEach((planet, index) => {
  const radius = getRadius(planet.distance);
  const angleDeg = index * 45;
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = centerX + radius * Math.cos(angleRad);
  const y = centerY - radius * Math.sin(angleRad);

  const orbit = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  orbit.setAttribute("cx", centerX);
  orbit.setAttribute("cy", centerY);
  orbit.setAttribute("r", radius);
  orbit.setAttribute("stroke", "#555");
  orbit.setAttribute("stroke-width", "1");
  orbit.setAttribute("fill", "none");
  svg.appendChild(orbit);

  const planetCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  planetCircle.setAttribute("cx", x);
  planetCircle.setAttribute("cy", y);
  planetCircle.setAttribute("r", planet.size / 2);
  planetCircle.setAttribute("fill", planet.color);
  planetCircle.setAttribute("data-name", planet.name);
  svg.appendChild(planetCircle);
  planet.element = planetCircle;
  planet.initialAngle = angleRad;

  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", x + planet.size / 2 + 10);
  label.setAttribute("y", y);
  label.setAttribute("class", "planet-label");
  label.textContent = planet.name;
  label.addEventListener("click", () => togglePlanetInfo(planet));
  svg.appendChild(label);
  planet.label = label;
});

function togglePlanetInfo(planet) {
  if (
    infoDiv.style.display === "block" &&
    infoDiv.dataset.planet === planet.name
  ) {
    infoDiv.style.display = "none";
  } else {
    const auToKm = 149597870;
    const distanceKm = (planet.distance * auToKm).toLocaleString();
    let travelTimeHtml =
      planet.name !== "Earth"
        ? `<p><strong>Estimated Travel Time:</strong> ${planet.travelTime}</p>`
        : "";
    const factsList = planet.facts.map((fact) => `<li>${fact}</li>`).join("");
    infoDiv.innerHTML = `
                    <h3 style="margin-top: 0; color: #ffd700;">${planet.name}</h3>
                    <img src="${planet.imageUrl}" alt="${planet.name}" style="max-width: 200px; height: auto; border-radius: 5px; float: left; margin-right: 15px; padding:15px;">
                    <p><strong>Distance from Sun:</strong> ${planet.distance} AU (${distanceKm} km)</p>
                    <p><strong>Orbital Period:</strong> ${planet.period} days</p>
                    <p><strong>Number of Moons:</strong> ${planet.moons}</p>
                    ${travelTimeHtml}
                    <h4 style="color: #ffd700;">Interesting Facts:</h4>
                    <ul style="margin: 0; padding-left: 20px;">${factsList}</ul>
                    <p style="font-size: 12px; margin-top: 10px;">Image credit: NASA</p>
                `;
    infoDiv.style.display = "block";
    infoDiv.dataset.planet = planet.name;
  }
}

// Optional: Dynamic fetching from NASA Images API (uncomment to use)
/*
        async function fetchPlanetImage(planetName) {
            const response = await fetch(`https://images-api.nasa.gov/search?q=${planetName}%20planet`);
            const data = await response.json();
            const nasaId = data.collection.items[0].data[0].nasa_id;
            const assetResponse = await fetch(`https://images-api.nasa.gov/asset/${nasaId}`);
            const assetData = await assetResponse.json();
            return assetData.collection.items.find(item => item.href.includes('~large.jpg')).href;
        }
        */

const simulationSpeed = 36.5;
let totalSimulationDays = 0;
let lastTimestamp = performance.now();
let isRunning = false;

function animate(currentTimestamp) {
  if (isRunning) {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000;
    totalSimulationDays += deltaTime * simulationSpeed;
    lastTimestamp = currentTimestamp;

    planets.forEach((planet) => {
      const angle =
        (planet.initialAngle +
          (2 * Math.PI * totalSimulationDays) / planet.period) %
        (2 * Math.PI);
      const radius = getRadius(planet.distance);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);
      planet.element.setAttribute("cx", x);
      planet.element.setAttribute("cy", y);
      planet.label.setAttribute("x", x + planet.size / 2 + 10);
      planet.label.setAttribute("y", y);
    });
  }
  if (isRunning) {
    requestAnimationFrame(animate);
  }
}

document.getElementById("start-btn").addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    lastTimestamp = performance.now();
    requestAnimationFrame(animate);
  }
});

document.getElementById("stop-btn").addEventListener("click", () => {
  isRunning = false;
});
