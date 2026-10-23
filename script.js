document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const nav = document.getElementById('navlinks');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? '×' : '☰';
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const plan = document.getElementById('plan');
  if (plan) {
    const params = new URLSearchParams(window.location.search);
    const requestedPlan = params.get('plan');
    if (requestedPlan) {
      const option = Array.from(plan.options).find(o => o.text.trim() === requestedPlan || o.value.trim() === requestedPlan);
      if (option) plan.value = option.value || option.text;
    }
  }

  const form = document.getElementById('contactform');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(form);
      const subject = encodeURIComponent('Website inquiry — ' + (f.get('business') || f.get('name')));
      const body = encodeURIComponent(
        'Name: ' + f.get('name') +
        '\nBusiness: ' + f.get('business') +
        '\nEmail: ' + f.get('email') +
        '\nCurrent website: ' + f.get('website') +
        '\nInterested in: ' + f.get('plan') +
        '\n\nProject details:\n' + f.get('details')
      );
      window.location.href = 'mailto:01christopherolum@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});
