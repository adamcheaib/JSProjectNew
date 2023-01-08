
// G
// CODE According to specification
function click_filter_element(event) {
  event.target.classList.toggle("selected");
  update_programmes()

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */

}


// G
// CODE according to specification
function create_filter_element(data) {

  let parent = data.parent;
  let new_filter = document.createElement("li");
  new_filter.classList.add(data.class);
  new_filter.textContent = data.textContent
  parent.appendChild(new_filter);
  new_filter.addEventListener("click", click_filter_element)
  return new_filter

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}


// VG
// CODE according to specifications
function toggle_cities(event) {
  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters() {
  /*
    ARGUMENT
      The function does take any arguments.
  
    SIDE-EFFECTS
      The function creates country filter containers and then creates filter elements for 
  */

  function create_country(country) {
    /*
        ARGUMENT
          The function takes an object as argument.
    
        SIDE-EFFECTS
          The function creates a container (div) using an object from the COUNTRIES array.
    
        NO RETURN VALUE
    */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {
    /*
        ARGUMENTS
          The functions take an object as an argument.
    
        SIDE-EFFECTS
          The function creates a filter-element by using the create_filter_element 
          and the argument's (object) keys' values as values for the arguments in create_filter_element. 
          The created filter elements are then appended to the matching countries.
    
        NO RETURN VALUE
    */
    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter() {

  function create_level(level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter() {
  function create_subject(subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter() {
  function create_element(data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {
  let parent_new_program = document.createElement("div");
  let child_new_program = document.createElement("li");
  let child_sun = document.createElement("li");
  let program_parent = document.querySelector("#programmes ul");

  let info = {
    uni: UNIVERSITIES[programme.universityID].name,
    city: CITIES[UNIVERSITIES[programme.universityID].cityID].name,
    sun_index: CITIES[UNIVERSITIES[programme.universityID].cityID].sun,
    country: COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name,
    level: LEVELS[programme.levelID - 1].name,
    subject: SUBJECTS[programme.subjectID].name,
    language: LANGUAGES[programme.languageID].name,
    background: `url(./media/geo_images/${CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal[get_random_number(CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal.length, 0)]}`,
  };

  let sun_percent = percenter(info.sun_index, 365);


  parent_new_program.appendChild(child_new_program);
  parent_new_program.classList.add("programme");
  parent_new_program.style.backgroundImage = info.background
  program_parent.appendChild(parent_new_program);
  child_sun.classList.add("bottom_programme")
  parent_new_program.appendChild(child_sun)

  child_new_program.innerHTML = `<h1>${programme.name}</h1>
    <p>${info.uni}</p>
    <p>${info.city}, ${info.country}</p>
    <p>${info.level}, ${info.subject}, ${info.language}</p>`


  child_sun.innerHTML = `<p>${info.city}, sun-index: ${info.sun_index} (${sun_percent}%)</p>`

  /*
 
    ARGUMENT
      programme (object): One of the objects from PROGRAMMES
 
    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.
 
 
      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.
 
    NO RETURN VALUE
 
  */

}


// G
// CODE according to the specification
function update_programmes() {
  let old_programs = document.querySelector("#programmes ul");
  old_programs.innerHTML = "";
  array_each(read_filters(), create_programme)
  let empty_string = document.querySelector("#programmes p");
  if (old_programs.innerHTML !== "") {
    empty_string.style.display = "none"
  }

  if (old_programs.innerHTML === "") { empty_string.style.display = "block" }

  /*
      NO ARGUMENTS
 
      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.
 
        VG: The top images (header) need to be updated here
 
      NO RETURN VALUE
 
  */

  let top_images = document.querySelectorAll("#top_images > div");
  function picture_placer(array) {
    let random_country = COUNTRIES[get_random_number(COUNTRIES.length)].imagesNormal;
    let image_picker = random_country[get_random_number(random_country.length)]
    array.style.backgroundImage = `url(./media/geo_images/${image_picker}`
  }
  array_each(top_images, picture_placer)

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters() {
  /*
    ARGUMENTS
      The function does take any arguments.
  
    SIDE-EFFECTS
      The function creates arrays based on the selected filter-elements which then matches
      a program's city, university, level, subject and language.

    RETURN VALUE
      Returns an array of the programme-elements that match the "selected" filters.
  
  */
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer); // konverterar selected elements dataID till interger.
  }
  array_each(city_selected_dom, callback_add_cityID); // lägger till interger dataID i en array.

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) { // matchar cityID med en stads ID från förra arrayen.
        universities.push(university); // lägger till dem i universities array
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) { //matchar programID med programmens ID
        programmes.push(programme); // lägger till dem i programmes array.
      }
    }
  }
  array_each(universities, callback_add_programmes);


  // Gör samma sak fast med levels dvs med id osv.
  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);


  // Gör samma sak fast med language dvs med id osv.
  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);


  // Gör samma sak fast emd subject dvs med ID osv.
  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
