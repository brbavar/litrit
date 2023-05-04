import data from '../data/mock-accts.json' assert { type: 'json' };

// const pantry = require('pantry-node');
// const pantryID = '198f80ce-8106-4b86-bda6-ab0070dd10bd';
// const pantryClient = new pantry(pantryID);
// const options = { parseJSON: true };

const submitForm = async () => {
  const registrationForm = document.querySelector('body#register form');
  const form = jsonifyForm(registrationForm);
  const postReq = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Length': '147',
      'Content-Type': 'application/json',
      Host: 'weak-puce-toad-garb.cyclic.app',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      // 'X-Forwarded-For': '99.65.186.42',
      // 'X-Forwarded-Port': '443',
      // 'X-Forwarded-Proto': 'https',
    },
    body: form,
  };
  await fetch(`https://weak-puce-toad-garb.cyclic.app/`, postReq).catch(
    (error) => console.log(error)
  );
  // pantryClient.basket
  //   .update('accounts', form, options)
  //   .then((response) => console.log(response));
};

const jsonifyForm = (form) => {
  const formKeyNodes = form.querySelectorAll(
    '.field > :nth-child(1):not(.submit)'
  );
  const formValNodes = form.querySelectorAll('.field > :nth-child(2)');

  const jsonifiedForm = {};
  for (var i = 0; i < formKeyNodes.length; i++)
    jsonifiedForm[formKeyNodes[i].textContent] = formValNodes[i].value;

  return jsonifiedForm;
};

const submitButton = document.querySelector('body#register form input.submit');
submitButton.addEventListener('click', submitForm);
