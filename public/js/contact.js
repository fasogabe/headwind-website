const contact_container = document.getElementById('contact-container');
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
        insertAlert(
          'success',
          'Email has been sent! Thank you for your message. We will respond as soon as possible.'
        );
      }
    })
    .catch((err) => console.log(`Fetch error: ${err}`));
};

const insertAlert = (type, msg) => {
  const alert = document.createElement('div');
  alert.innerHTML = `
        <div id="contact-alert" class="alert alert-${type}" role="alert">
          ${msg}
        </div>
      `;
  contact_container.insertBefore(alert, contact_form);
  clearFields();
  setTimeout(() => {
    document.getElementById('contact-alert').remove();
  }, 5000);
};

const clearFields = () => {
  const name = (document.getElementById('contactFormName').value = '');
  const email = (document.getElementById('contactFormEmail').value = '');
  const message = (document.getElementById('contactFormMessage').value = '');
};
