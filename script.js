fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => handleCategory(data.data))
    .catch(err => console.error(err));


const handleCategory = (categories) => {
    const categoryItems = categories.news_category.map(category => {
        const categoryId = category.category_id;
        const categoryName = category.category_name;
        return `
            <li class="nav-item">
            <a class="nav-link text-secondary" href="#${categoryName.toLowerCase()}" data-category-id="${categoryId}">${categoryName}</a>
            </li>
          `;
    }).join('');
    const categoryItem = document.getElementById("categoryItem");
    categoryItem.innerHTML = categoryItems;


    // Add event listener to links in the navbar
    const navbarLinks = document.querySelectorAll('.nav-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const categoryId = event.target.getAttribute('data-category-id');
            console.log(categoryId)
            fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.error(err));
        });
    });
};


