const menuIcon = document.getElementById('menu-icon');
const menuBar = document.getElementById('overlay');
const menuBarGradient = menuBar.style.backgroundImage;
const menu = document.getElementById('menu');
const loginBar = document.getElementById('login-bar');

const iconBars = [...menuIcon.children];
const navbars = [menuBar, loginBar];
const menuItems = [...menu.children];
const menuLinks = document.querySelectorAll('#menu > div > a');
const loginLinks = document.querySelectorAll('#login-bar > a');

const opacify = (elem, riseLen) =>
  elem.animate(
    [
      { opacity: 0, transform: `translateY(${riseLen}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    250
  );

const turn = (bar, turnDirection) =>
  bar.animate(
    [
      { transform: 'rotate(0) translateY(0)' },
      {
        transform: `rotate(calc(${turnDirection} * 45deg)) translateY(calc(${
          -1 * turnDirection
        } * 16.5px))`,
      },
    ],
    250
  );

const animations = [];

const toggleableClass = new Map([
  [menu, 'hidden'],
  [menuIcon, 'x-ified'],
]);
[...navbars, ...menuItems].forEach((elem) =>
  toggleableClass.set(elem, 'opaque')
);
[...menuLinks, ...loginLinks].forEach((elem) =>
  toggleableClass.set(elem, 'active')
);

const toggleClass = (state, elem, map) => {
  if (elem.classList.contains(state)) elem.classList.remove(state);
  else elem.classList.add(state);
};

const delayedStateChange = (opacity) => {
  setTimeout(() => {
    iconBars[1].style.opacity = opacity;
  }, 200);
  setTimeout(() => {
    toggleableClass.forEach(toggleClass);
  }, 50);
};

const toggleMenu = () => {
  const menuHidden = menu.classList.contains('hidden');

  if (menuHidden) {
    animations = [
      turn(iconBars[0], -1),
      iconBars[1].animate([{ opacity: 1 }, { opacity: 0 }], 200),
      turn(iconBars[2], 1),
    ];
    for (elem of [...navbars, ...menuItems])
      animations.push(opacify(elem, navbars.includes(obj) ? 0 : -5));
  } else {
    animations.forEach((animation) => animation.reverse());
  }

  delayedStateChange(menuHidden ? 0 : 1);
};

menuIcon.addEventListener('click', toggleMenu);
