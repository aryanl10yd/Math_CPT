
---

### `index.js`
```javascript
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const navItems = navbar.querySelectorAll("li");
    const sections = document.querySelectorAll(".section");
    const navIndicator = document.getElementById("nav-indicator");

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const targetSection = sections[index];
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Move the nav indicator
            navIndicator.style.left = `${item.offsetLeft}px`;
            navIndicator.style.width = `${item.offsetWidth}px`;

            // Highlight active tab
            navItems.forEach((tab) => (tab.style.backgroundColor = ""));
            item.style.backgroundColor = getHoverColor(item.textContent);
        });
    });

    function getHoverColor(tabName) {
        switch (tabName) {
            case "Front-Page News":
                return "lightcoral";
            case "Letter":
                return "lightblue";
            case "Business":
                return "lightgreen";
            case "Sports":
                return "orange";
            case "Entertainment":
                return "pink";
            case "Special":
                return "lightyellow";
            default:
                return "white";
        }
    }
});
