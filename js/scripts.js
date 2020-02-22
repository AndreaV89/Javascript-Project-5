// Variables

const gallery = $('#gallery');
const search = $('.search-container');


fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        createArray(data.results);
        generateHTML(data.results);
    });


const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>
`;
search.html(searchHTML);

// Create Employee Array

const employeeArray = [];
function createArray(data) {
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
    return employeeArray;
}

// Create HTML
let html = "";
function generateHTML (arr){
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
    gallery.html(html);
}

// Create modal
let modalHTML = "";
function generateModalHTML(index) {
    const modalContainer = document.createElement('DIV');
    modalContainer.classList.add('modal-container');
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
    if(index === 0) {
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn" disabled>Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
    } else if (index === 11) {
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn" disabled>Next</button>';
    } else {
        modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>';
        modalHTML += '<button type="button" id="modal-next" class="modal-next btn">Next</button>';
    }
    modalHTML += '</div>';
    modalContainer.innerHTML = modalHTML;
    gallery.after(modalContainer);
}

// Create Modal 
let index;
$('document').ready(function() {
    $('#gallery').on('click', '.card', function(){
        index = $(this).index();
        generateModalHTML(index);
        $('#modal-container').css('display', 'block');
        console.log(index);
        return index;
    });
});


// Exit Modal 

$('document').ready(function() {
    $('body').on('click', '#modal-close-btn', function() {
        modalHTML = "";
        $('.modal-container').remove();
        $('.modal-container').css('display', 'none');
    });
});


// Modal Arrow 

$('document').ready(function() {
    $('body').on('click', '.btn', function() {
        if($(this).text() === 'Prev') {
            index -= 1;
        } else if($(this).text() === 'Next') {
            index += 1;
        }
        modalHTML = "";
        $('.modal-container').remove();
        generateModalHTML(index);
    });
});


// Search Filter

$('body').on('keyup', '#search-input', function(){
    let input = $('#search-input').val().trim().toLowerCase();
    for (let i = 0; i < employeeArray.length; i++) {
        let name = employeeArray[i].firstName.toLowerCase() + ' ' + employeeArray[i].lastName.toLowerCase();
        let NameController = name.includes(input);
        if(NameController) {
            gallery.children().eq(i).show();
        } else {
            gallery.children().eq(i).hide();
        } 
    }  
});

