
let query = document.getElementById('searchInput');
let searchbtn = document.getElementById('searchbtn');
let clearbtn = document.getElementById('clearbtn');
let result = document.getElementById('resultContainer');
let dropdown = document.getElementById('dropdown');
let closebtn = document.getElementById('close-btn');

function toggleDropdown(show) {
  dropdown.style.display = show ? "block" : "none";
}

function search() {
  const input = query.value.toLowerCase().trim();

  if(!input){
    toggleDropdown(false);
    return;
  }
  fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
      let found = false;
      console.log(data)
      data.countries?.forEach((country) => {
        country.cities?.forEach((city) => {
          if(city.name.toLowerCase().includes(input)) {
            showResult(city.name, city.imageUrl, city.description);
            found = true;
          }
        });
      });
      data.temples?.forEach((temple) => {
        if(temple.name.toLowerCase().includes(input)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          found = true;
        }
      });
      data.beaches?.forEach((beach) => {
        if(beach.name.toLowerCase().includes(input)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          found = true;
        }
      });
      if(!found){
        searchError();
      }
    }) .catch(error => {
      console.log(error);
    });
}
searchbtn.addEventListener('click', search);

function showResult(name, img, description) {
  toggleDropdown(true);
  result.innerHTML= `
  <div class='search-result'>
  <h2 class='result-header'>${name}</h2>
  <img src='${img}' alt="${name}" class="result-img">
  <p class='result-description'>${description}</p>
  </div>
  `
}

function searchError() {
  toggleDropdown(true);
  result.innerHTML = `<p>Sorry we can't find the result</p>`
}

function clearSearch(){
  query.value = '';
  toggleDropdown(false);
  result.innerHTML= '';
  console.log('cleared');
}
clearbtn.addEventListener('click', clearSearch);
closebtn.addEventListener('click', () => toggleDropdown(false));

query.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    search()
  }
})

