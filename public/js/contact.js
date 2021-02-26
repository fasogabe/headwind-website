const contact_section = document.querySelector('.contact');
const contact_form = document.getElementById('contact-form');

contact_form.addEventListener('submit', (e) => {
  e.preventDefault();

  let mail = new FormData(contact_form);
  sendMail(mail);
  //console.log(status);
});

const sendMail = (mail) => {
  fetch('/send', { method: 'post', body: mail })
    .then((response) => {
      let type;
      if (response.status !== 200) {
        console.log(`Error - Status Code: ${response.status}`);
        insertAlert('danger', 'Error: Email not sent.');
      } else {
        insertAlert('success', 'Email has been sent!');
      }
    })
    .catch((err) => console.log(`Fetch error: ${err}`));
};

const insertAlert = (type, msg) => {
  const alert = document.createElement('div');
  alert.innerHTML = `
        <div class="alert alert-${type}" role="alert">
          ${msg}
        </div>
      `;
  contact_section.insertBefore(alert, contact_form);
};
