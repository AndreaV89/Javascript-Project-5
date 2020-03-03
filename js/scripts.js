/* Andrea Vannetti FSJS Techdegree
 * Project 5 - Public API Requests
 * scripts.js */

// Variables
const gallery = $('#gallery');
const search = $('.search-container');
const employeeArray = [];
const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;


// Create the HTML for the search input field
search.html(searchHTML);


// Send a request to the API site
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => {
        // Use the response to create an array of employee, and generate HTML for each employee
        createArray(data.results);
        generateHTML(data.results);
    });


// Create an array for storing all the needed information about each employee, retrieved from the response
const createArray = data => {
    data.forEach(element => {
       employeeArray.push({
           'image': element.picture.large,
           'firstName': element.name.first,
           'lastName': element.name.last,
           'email': element.email,
           'phone': element.cell,
           'city': element.location.city,
           'state': element.location.state,
           'streetName': element.location.street.name,
           'streetNumber': element.location.street.number,
           'postcode': element.location.postcode,
           'birthdate': element.dob.date.slice(0, 10)
       }); 
    });
};


// Create the card for each employee
let html = "";
const generateHTML = arr => {
    // Loop over the array of employees
    for(let i = 0; i < arr.length; i++) {
        html += '<div class="card">';
        html += '<div class="card-img-container">'
        html += `<img class="card-img" src=${arr[i].picture.large} alt="profile picture">`;
        html += '</div>'
        html += '<div class="card-info-container">';
        html += `<h3 id="name" class="card-name cap">${arr[i].name.first} ${arr[i].name.last}</h3>`;
        html += `<p class="card-text">${arr[i].email}</p>`;
        html += `<p class="card-text cap">${arr[i].location.city}, ${arr[i].location.state}</p>`;
        html += '</div>';
        html += '</div>';
    }
    // Set the HTML of #gallery div
    gallery.html(html);
}


// Create the modal window for the selected employee
let modalHTML = "";
const generateModalHTML = index => {
    const modalContainer = document.createElement('DIV');
    // Add the class .modal-container
    modalContainer.classList.add('modal-container');
    // Create the HTML
    modalHTML += '<div class="modal">';
    modalHTML += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
    modalHTML += '<div class="modal-info-container">';
    modalHTML += `<img class="modal-img" src=${employeeArray[index].image} alt="profile picture">`;
    modalHTML += `<h3 id="name" class="modal-name cap">${employeeArray[index].firstName} ${employeeArray[index].lastName}</h3>`;
    modalHTML += `<p class="modal-text">${employeeArray[index].email}</p>`;
    modalHTML += `<p class="modal-text cap">${employeeArray[index].city}</p>`;
    modalHTML += '<hr>';
    modalHTML += `<p class="modal-text">${employeeArray[index].phone}</p>`;
    modalHTML += `<p class="modal-text">${employeeArray[index].streetNumber} ${employeeArray[index].streetName}, ${employeeArray[index].city}, ${employeeArray[index].state} ${employeeArray[index].postcode}</p>`;
    modalHTML += `<p class="modal-text">Birthday: ${employeeArray[index].birthdate}</p>`;
    modalHTML += '</div>';
    modalHTML += '</div>';
    modalHTML += '<div class="modal-btn-container">';
    // If is the first employee in the list
    if(index === 0) {
        // Disable the Prev button
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn" disabled>Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
    // If is the last employee in the list
    } else if (index === 11) {
        // Disable the Next button
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn" disabled>Next</button>';
    // Else enable both buttons
    } else {
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
    }
    modalHTML += '</div>';
    modalContainer.innerHTML = modalHTML;
    gallery.after(modalContainer);
}


// User Input Search function
const searchEmployee = () => {
    // Take the user input
    let input = $('#search-input').val().trim().toLowerCase();
    // Loop over the array searching for matches
    for (let i = 0; i < employeeArray.length; i++) {
        // Takes the name of each employees
        let name = employeeArray[i].firstName.toLowerCase() + ' ' + employeeArray[i].lastName.toLowerCase();
        let NameController = name.includes(input);
        // If the name includes the search show it
        if(NameController) {
            gallery.children().eq(i).show();
        } else {
            gallery.children().eq(i).hide();
        } 
    }; 
};


// Add the click event listener to each card for open the modal
let index;
$('document').ready(() => {
    $('#gallery').on('click', '.card', function () {
        // Get the index of the clicked card
        index = $(this).index();
        // Generate the modal for the clicked card using the index
        generateModalHTML(index);
        $('#modal-container').css('display', 'block');
    });
});


// Add the Event listener to Exit Modal button 
$('document').ready(() => {
    $('body').on('click', '#modal-close-btn', function () {
        // Reset all the modal HTML
        modalHTML = "";
        // Remove the modal container
        $('.modal-container').remove();
    });
});


// Add the Event Listener to Prev and Next button 
$('document').ready(() => {
    $('body').on('click', '.btn', function() {
        // If the 'Prev' button is clicked decreases index by 1
        if($(this).text() === 'Prev') {
            index -= 1;
        // If the 'Next' button is clicked increases index by 1
        } else if($(this).text() === 'Next') {
            index += 1;
        }
        // Reset the modal and create a new one for the Prev or Next employee
        modalHTML = "";
        $('.modal-container').remove();
        generateModalHTML(index);
    });
});


// Add the keyup Event Listener for real time search
$('body').on('keyup', '#search-input', () => {
    searchEmployee();
});


// Add the click Event Listener for search
$('body').on('click', '#search-submit', () => {
    searchEmployee();
});







