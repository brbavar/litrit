const menuIcon = document.getElementById('menu-icon');
const menuBar = document.getElementById('menu-bar');
const menuBarGradient = menuBar.style.backgroundImage;
const menu = document.getElementById('menu');
const loginBar = document.getElementById('login-bar');

const iconBars = [...menuIcon.children];
const navbars = [menuBar, loginBar];
const menuItems = [...menu.children];
const fadeIn = (item) =>
  item.animate(
    [
      { opacity: 0, transform: 'translateY(-5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    250
  );

var counterClockwiseTurn, fadeOut, clockwiseTurn;
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
const initOpacity = new Map([
  [menuBar, 0.8],
  [loginBar, 0],
]);

const solidify = (bar) =>
  bar.animate([{ opacity: initOpacity.get(bar) }, { opacity: 1 }], 250);

const showMenu = () => {
  menuIcon.removeEventListener('click', showMenu);

  menuBar.style.opacity = 0.65;
  menuBar.style.backgroundImage = 'none';
  menuBar.style.backgroundColor = 'rgba(139, 55, 55, 0.8)';
  menuBar.style.borderBottom = '1px rgb(21, 21, 21) solid';

  counterClockwiseTurn = turn(iconBars[0], -1);

  fadeOut = iconBars[1].animate([{ opacity: 1 }, { opacity: 0 }], 200);
  navbars.forEach((bar) => solidify(bar));
  menuItems.forEach((item) => {
    fadeIn(item);
  });

  clockwiseTurn = turn(iconBars[2], 1);

  setTimeout(() => {
    iconBars[1].style.opacity = 0;
  }, 200);
  setTimeout(() => {
    iconBars[0].style.transform = 'rotate(-45deg) translateY(16.5px)';
    iconBars[2].style.transform = 'rotate(45deg) translateY(-16.5px)';

    navbars.forEach((bar) => (bar.style.opacity = 1));
    menuItems.forEach((item) => (item.style.opacity = 1));

    [menuIcon, iconBars[0], iconBars[2]].forEach((x) =>
      x.addEventListener('click', hideMenu)
    );
  }, 50);
};

const hideMenu = () => {
  [menuIcon, iconBars[0], iconBars[2]].forEach((x) =>
    x.removeEventListener('click', hideMenu)
  );

  [counterClockwiseTurn, fadeOut, clockwiseTurn].forEach((animation) =>
    animation.reverse()
  );
  navbars.forEach((bar) => solidify(bar).reverse());
  menuItems.forEach((item) => {
    fadeIn(item).reverse();
  });

  setTimeout(() => {
    iconBars[1].style.opacity = 1;
  }, 200);
  setTimeout(() => {
    [iconBars[0], iconBars[2]].forEach((bar) => (bar.style.transform = ''));

    menuBar.style.backgroundImage = menuBarGradient;
    menuBar.style.backgroundColor = '';
    menuBar.style.borderBottom = '';
    [...menuItems, loginBar].forEach((x) => (x.style.opacity = 0));

    menuIcon.addEventListener('click', showMenu);
  }, 50);
};

menuIcon.addEventListener('click', showMenu);
