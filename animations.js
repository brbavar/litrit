const menuIcon = document.getElementById('menu-icon');
const menuBar = document.getElementById('overlay');
const menuBarGradient = menuBar.style.backgroundImage;
const menu = document.getElementById('menu');
const loginBar = document.getElementById('login-bar');

const iconBars = [...menuIcon.children];
const navbars = [menuBar, loginBar];
const menuItems = [...menu.children];
const opacifiables = [...navbars, ...menuItems];
const hidableLinks = document.querySelectorAll(
  '#menu > div > a, #login-bar > a'
);

const toggleableClass = new Map([
  [menu, 'hidden'],
  [menuIcon, 'x-ified'],
]);
[...opacifiables, ...hidableLinks].forEach((elem) =>
  toggleableClass.set(elem, opacifiables.includes(elem) ? 'opaque' : 'active')
);

const toggleClass = (state, elem) => {
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
const toggleMenu = () => {
  if (animations.length) {
    animations.forEach((animation) => animation.reverse());
  } else {
    [
      turn(iconBars[0], -1),
      iconBars[1].animate([{ opacity: 1 }, { opacity: 0 }], 200),
      turn(iconBars[2], 1),
    ].forEach((animation) => animations.push(animation));
    for (elem of opacifiables)
      animations.push(opacify(elem, navbars.includes(elem) ? 0 : -5));
  }

  delayedStateChange(menu.classList.contains('hidden') ? 0 : 1);
};

menuIcon.addEventListener('click', toggleMenu);
