window.onload = () => {
  setup();
}

function setup() {
  const peopleSphere = document.getElementById('people-sphere');
  peopleSphere.addEventListener("click", async function (e) {
    const data = await getRandomData('people');
    const formattedData = formatPeopleData(data);
    updateText(formattedData, 'people-text');
  });

  const planetSphere = document.getElementById('planets-sphere');
  planetSphere.addEventListener("mousedown", async function (e) {
    const data = await getRandomData('planets');
    const formattedData = formatPlanetsData(data);
    updateText(formattedData, 'planets-text');
  });

  const starshipsSphere = document.getElementById('starships-sphere');
  starshipsSphere.addEventListener("updateData", async function (e) {
    const data = await getRandomData('starships');
    const formattedData = formatStarshipsData(data);
    updateText(formattedData, 'starships-text');
  });

  // Trigger the updateData event every 5 seconds
  setInterval(() => {
    const updateEvent = new CustomEvent('updateData');
    starshipsSphere.dispatchEvent(updateEvent);
  }, 5000);
};

async function getRandomData(category) {
  const randomId = Math.floor(Math.random() * 10) + 1;
  const url = `https://swapi.dev/api/${category}/${randomId}/`;
  return await getData(url);
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function updateText(data, category) {
  const categoryText = document.getElementById(category);
  categoryText.setAttribute('text', `value: ${data}`);
}

function formatPeopleData(data) {
  return `${data.name}\nHeight: ${data.height}\nGender: ${data.gender}`;
}

function formatPlanetsData(data) {
  return `${data.name}\nDiameter: ${data.diameter}\nPopulation: ${data.population}`;
}

function formatStarshipsData(data) {
  return `${data.name}\nCrew: ${data.crew}\nLength: ${data.length}`;
}
