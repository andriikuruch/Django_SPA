import Main from "/static/components/main/Main.js";
import OrderHistory from "/static/components/order_history/OrderHistory.js";
import Category from "/static/components/category/Category.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        {path: "/", view: Main},
        {path: "/woman", view: Main},
        {path: "/men", view: Category},
        {path: "/kids", view: Main},
        {path: "/comming-soon", view: Main},
        {path: "/about", view: Main},
        {path: "/login", view: OrderHistory},
        // {path: "/basket", view: Main},
    ];

    const potentialMatches = routes.map(route => {
      return {
        route: route,
        isMatch: location.pathname === route.path
      };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    // const path = match.route.path.split('/').slice(1, 5);
    // const nav_path = document.querySelector('.nav-path');
    //
    // if (path[0] !== "") {
    //     nav_path.style.display = "block";
    //     nav_path.innerHTML = '<a href="/" data-link>Home</a>';
    //     const devider = '   /   ';
    //     for (let link of path) {
    //         nav_path.innerHTML += devider + `<a href=${link} data-link>${link}</a>`
    //     }
    // } else {
    //     nav_path.style.display = "none";
    // }

    const app = document.getElementById('app');
    const template = await view.getTemplate();
    app.innerHTML = '';
    app.appendChild(template);
};

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});


const searchButton = document.querySelector(".search__button");

searchButton.addEventListener('click', evt => {
    const search = searchButton.parentElement;

    if (!search.classList.contains("isActive")) {
        search.classList.add("isActive");
    } else {
        search.classList.remove("isActive");
    }
});

document.addEventListener("click", ev => {
    const search = searchButton.parentElement;
    const didClickedOutside = !search.contains(ev.target);

    if (didClickedOutside) {
        search.classList.remove("isActive");
    }
});

const basket = document.querySelector(".basket");

basket.addEventListener("click", evt => {
    const notClickedDropdown = !basket.children[2].contains(evt.target);
    const isClosed = !basket.classList.contains("isActive");

    if (isClosed) {
        basket.classList.add("isActive");
    } else {
        if (notClickedDropdown) {
            basket.classList.remove("isActive");
        }
    }
});

document.addEventListener("click", ev => {
    const didClickedOutside = !basket.contains(ev.target);

    if (didClickedOutside) {
        basket.classList.remove("isActive");
    }
});
