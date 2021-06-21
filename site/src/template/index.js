const mainTask = () => {
  const highlightKey = "highlight";
  const setUtils = () => {
    const debounce = (fn, delay) => {
      let task = null;
      return (...args) => {
        clearTimeout(task);
        task = setTimeout(() => fn(...args), delay);
      };
    };
    const catchInput = (input, cb) => {
      const callback = debounce(() => {
        const v = input.value;
        if (v) cb(v);
      }, 200);
      let lockInputCb = false;
      input.addEventListener("input", () => {
        if (!lockInputCb) callback();
      });
      input.addEventListener("compositionstart", () => {
        lockInputCb = true;
      });
      input.addEventListener("compositionend", () => {
        lockInputCb = false;
        callback();
      });
    };
    return { catchInput };
  };
  const { catchInput } = setUtils();
  const setBackground = () => {
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
  };
  const setComments = () => {
    const checkFacebookAvailable = () =>
      new Promise((resolve, reject) => {
        const i = new Image();
        i.src = "https://www.facebook.com/images/facebook.png";
        i.onerror = (e) => reject(e);
        i.onload = () => resolve();
        i.style.display = "none";
        body.append(i);
        setTimeout(() => reject(), 5000);
      });
    const body = document.getElementsByClassName("markdown-body")[0];
    const initComments = () => {
      if (
        ![
          "/",
          "/index.html",
          "/blog/index.html",
          "/blog/code.html",
          "/blog/leetcode.html",
          "/blog/essay.html",
          "/blog/about.html",
        ].includes(window.location.pathname)
      ) {
        checkFacebookAvailable()
          .then(() => {
            const root = document.createElement("div");
            root.id = "fb-root";
            root.className = "post-comments";
            const comments = document.createElement("div");
            comments.className = "fb-comments";
            comments.setAttribute("data-href", window.location.href);
            comments.setAttribute("data-numposts", "5");
            comments.setAttribute("data-width", "100%");
            root.appendChild(comments);
            body.appendChild(root);
          })
          .catch(() => {
            const reminder = document.createElement("div");
            reminder.className = "reminder";
            reminder.innerText = "Facebook Comments Service is unavailable";
            body.appendChild(reminder);
          });
      }
    };
    const changeComments = () => {
      const title = body.getElementsByTagName("h1")[0];
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
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-0SEZ9KRGY7");
    });
  };
  const setSearch = () => {
    let loading = false;
    const separator = "---";
    let searchFunc;
    const input = document.querySelector(".search-input");
    const searchButton = document.querySelector('.search-button');
    const dropdown = document.querySelector(".dropdown-container");
    const findDropdownCell = (node) => {
      if (Array.from(node.classList).includes("search-dropdown-cell-container"))
        return node;
      if (Array.from(node.classList).includes("search-dropdown")) return;
      return findDropdownCell(node.parentElement);
    };
    const chooseCb = (e) => {
      Array.from(dropdown.children).forEach((node) => {
        node.style.backgroundColor = "";
      });
      const node = findDropdownCell(e.target);
      if (node) {
        node.style.backgroundColor = "#ecebeb";
      }
    };
    searchButton.addEventListener("click", async () => {
      input.style.opacity = '1';
      input.style.visibility = 'visible';
      searchButton.style.opacity = '0';
      searchButton.style.visibility = 'hidden';
      setTimeout(() => {
        input.focus();
      }, 500);
      if (!searchFunc && !loading) {
        input.addEventListener("blur", () => {
          setTimeout(() => {
            document.querySelector(".search-dropdown").style.overflowX = "";
            searchButton.style.opacity = '1';
            searchButton.style.visibility = 'visible';
            input.style.opacity = '0';
            input.style.visibility = 'hidden';
          }, 100);
        });
        loading = true;
        const searchContent = JSON.parse(
          await (await fetch("/blog/search.json")).text()
        );
        const cIndex = new FlexSearch({
          doc: {
            id: "key",
            field: ["title", "content", "key"],
          },
          encode: false,
          tokenize: function (str) {
            return str.replace(/[\x00-\x7F]/g, "").split("");
          },
        }).add(
          Object.entries(searchContent).reduce((acc, [key, value]) => {
            value.content.split("\n").forEach((s, i) => {
              acc.push({
                key: `${key}${separator}${i}`,
                content: s,
                title: value.title,
              });
            });
            return acc;
          }, [])
        );
        const eIndex = new FlexSearch({
          doc: {
            id: "key",
            field: ["title", "content", "key"],
          },
        }).add(
          Object.entries(searchContent).reduce((acc, [key, value]) => {
            value.content.split("\n").forEach((s, i) => {
              acc.push({
                key: `${key}${separator}${i}`,
                content: s,
                title: value.title,
              });
            });
            return acc;
          }, [])
        );
        dropdown.addEventListener("mouseover", chooseCb);
        searchFunc = (s) => {
          const ret = [...eIndex.search(s), ...cIndex.search(s)];
          const item = Array.from(new Set(ret.map(({ title }) => title))).map(
            (title) => ret.find((item) => item.title === title)
          );
          dropdown.innerHTML = item
            .map(
              ({ key, content, title }) =>
                `<div class='search-dropdown-cell-container'><a href=${`${
                  window.location.origin
                }/blog/${
                  key.split(separator)[0]
                }?${highlightKey}=${encodeURIComponent(
                  content
                )}`}><div class='search-dropdown-cell'><div class='search-dropdown-content'>${content}</div> <div class='search-dropdown-title'>- ${title}</div></div></a></div>`
            )
            .join("");
          dropdown.style.display = "";
          document.querySelector(".search-dropdown").style.overflowX = "scroll";
        };
        loading = false;
      } else if (searchFunc && input.value.length > 2) {
        searchFunc(input.value);
      }
    });
    catchInput(input, (s) => {
      if (searchFunc && s.length > 2) {
        searchFunc(s);
      }
    });
  };
  const setHighlight = () => {
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get(highlightKey);
    if (highlight) {
      const nodes = Array.from(
        document.querySelectorAll(".post-article *")
      ).filter((node) =>
        (node.textContent || "").toLowerCase().includes(highlight.toLowerCase())
      );
      const node = nodes
        .sort((a, b) => a.textContent.length - b.textContent.length)
        .shift();
      if (node) {
        node.style.backgroundColor = "yellow";
        node.scrollIntoView();
      }
    }
  };
  setBackground();
  setComments();
  setSearch();
  setHighlight();
};
mainTask();
