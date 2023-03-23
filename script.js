fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => handleCategory(data.data))
    .catch(err => console.error(err));


const handleCategory = (categorys) => {
    const totalCategorys = Object.values(categorys.news_category);
    console.log(totalCategorys.length);
    // for (let i = 0; i < totalCategorys.length; i++) {
        // console.log(i)
        totalCategorys.forEach(category => {
            // for (let i = 0; i < totalCategorys.length; i++) {
            console.log(category.category_name)
            const categoryName = category.category_name;
            // console.log(categoryName);
            const categoryItem = document.getElementById('categoryItem');
            categoryItem.innerHTML = `
                <li class="nav-item">
                <a class="nav-link text-secondary" href="#">${categoryName}</a>
                </li>
            `
            // }
        });
    // }

}
