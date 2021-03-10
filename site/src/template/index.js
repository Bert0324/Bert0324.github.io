// background
particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 1600 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#000000",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
});

// comments
const checkFacebookAvailable = () => new Promise((resolve, reject) => {
    const i = new Image();
    i.src = 'https://www.facebook.com/images/facebook.png';
    i.onerror = e => reject(e);
    i.onload = () => resolve();
    i.style.display = 'none';
    body.append(i);
    setTimeout(() => reject(), 5000);
});
const body = document.getElementsByClassName('markdown-body')[0];
const initComments = () => {
    if (![
        '/',
        '/blog/index.html', 
        '/blog/code.html', 
        '/blog/leetcode.html', 
        '/blog/essay.html',
        '/blog/about.html'
    ].includes(window.location.pathname)) {
        checkFacebookAvailable().then(() => {
            const root = document.createElement('div');
            root.id = 'fb-root';
            root.className = 'post-comments';
            const comments = document.createElement('div');
            comments.className = 'fb-comments';
            comments.setAttribute('data-href', window.location.href);
            comments.setAttribute('data-numposts', '5');
            comments.setAttribute('data-width', '100%');
            root.appendChild(comments);
            body.appendChild(root);
        }).catch(() => {
            const reminder = document.createElement('div');
            reminder.className = 'reminder';
            reminder.innerText = 'Facebook Comments Service is unavailable';
            body.appendChild(reminder);
        });
    }
};
const changeComments = () => {
    const title = body.getElementsByTagName('h1')[0];
    if (title) {
        document.title = title.innerText;
    }
};
if (body) {
    changeComments();
    initComments();
}

(window.requestIdleCallback || setTimeout)(() => {
    window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
  
	gtag('config', 'G-0SEZ9KRGY7');
});