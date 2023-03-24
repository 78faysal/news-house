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
    const spinner = document.getElementById('spinner');
    navbarLinks.forEach(link => {
        link.addEventListener('click', event => {
            spinner.style.display = 'block';
            event.preventDefault();
            const categoryId = event.target.getAttribute('data-category-id');
            console.log(categoryId)
            fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
                .then(response => response.json())
                .then(data => {
                    handleNewses(data.data); spinner.style.display = 'none';
                })
                .catch(err => console.error(err));
        });
    });


    const handleNewses = (newses) => {

        const newsItems = newses.map(news => {
            const thumbnail = news.thumbnail_url;
            const title = news.title;
            const details = news.details;
            const img = news.author.img;
            const name = news.author.name;
            const date = news.author.published_date;
            const views = news.total_view;
            console.log(news.total_view)
            return `
                <div class="card mb-3" style="max-width: auto;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${thumbnail}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 my-auto">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${details.slice(0, 400)}...</p>
                                
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center">
                                        <img style=" max-height: 40px" class="rounded-circle img-fluid" src="${img}" alt="">
                                        <div>
                                            <p class="mb-0">${name}</p>
                                            <p class="mb-0">${date}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-0">Views: ${views}</p>
                                    </div>
                                    <button class="btn btn-secondary">-></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            `
        }).join('');
        const newsItem = document.getElementById("newsItem");
        newsItem.innerHTML = newsItems;

        const errorMessage = document.getElementById("errorMessage");
        if (newses.length === 0) {
            errorMessage.innerHTML = `<p class="mb-0">No items found</p>`
        } else {
            errorMessage.innerHTML = `<p class="mb-0">${newses.length} items found</p>`
        }

        // setup for spinner 
        document.getElementById("spinner").style.display = "block";
        setTimeout(function () {
            document.getElementById("spinner").style.display = "none";
        }, 3000);
    };
};


