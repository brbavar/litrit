const submitForm = async () => {
  const registrationForm = document.querySelector('body#register form');
  const form = jsonifyForm(registrationForm);
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: form,
  };
  await fetch(`https://weak-puce-toad-garb.cyclic.app/`, req);
};

const jsonifyForm = (form) => {
  const formData = new FormData(form);
  const jsonifiedForm = {};

  for (const [key, val] of formData) {
    jsonifiedForm[key] = val;
  }

  return jsonifiedForm;
};
