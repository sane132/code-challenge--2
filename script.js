

//Get html elements from the page by their Id
const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestInput = document.getElementById('guest-name');
//variable for guest limit
let guestCount = 0;
const MAX_GUESTS = 10;

// Handling form submission
form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload
//get guest name from input
  const guestName = guestInput.value.trim();
//check if it is empty-show an alert if it is empty
  if (guestName === '') {
    alert('Please enter a guest name.');
    return;
  }
//check if max-guest reached-show an alert if it is reached
  if (guestCount >= MAX_GUESTS) {
    alert('Guest list is full! Remove someone before adding more.');
    return;
  }
//if it is good add guest clear input
  addGuest(guestName);
  guestInput.value = ''; 
});

// Function to add a guest
function addGuest(name) {
  guestCount++; //Increase guest count

  // Create list item to rep one guest
  const li = document.createElement('li');
  li.className = 'guest-item';

  // Create guest name span (display guest name)
  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  // Create buttons container
  const btnContainer = document.createElement('div');

  // Delete button -remove guest from the list and decrease the count
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.addEventListener('click', () => {
    guestList.removeChild(li);
    guestCount--;
  });

  //  Add RSVP toggle -it switches attending/not attending and change background color for not attending
  const rsvpBtn = document.createElement('button');
  rsvpBtn.textContent = 'Attending';
  let attending = true;
  rsvpBtn.addEventListener('click', () => {
    attending = !attending;
    rsvpBtn.textContent = attending ? 'Attending' : 'Not Attending';
    rsvpBtn.style.backgroundColor = attending ? '' : '#f99';
  });

  //  Add category selector 
  
  const categorySelect = document.createElement('select');
  ['Friend', 'Family', 'Colleague'].forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });


  // Add timestamp add the current date and time when a guest is added
  const timestamp = document.createElement('span');
  const now = new Date();
  timestamp.textContent = now.toLocaleString();
  timestamp.style.fontSize = '0.8em';
  timestamp.style.marginLeft = '10px';

  // Append buttons and selectors to container
  btnContainer.appendChild(deleteBtn);
  btnContainer.appendChild(rsvpBtn);
  btnContainer.appendChild(categorySelect);

  // Append everything to the list item
  li.appendChild(nameSpan);
  li.appendChild(timestamp);
  li.appendChild(btnContainer);

  // Add to the guest list
  guestList.appendChild(li);
}