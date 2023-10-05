const items = [
    {
      title: "Тональный крем KIKO",
      description: "Идеальная основа любого макияжа!",
      tags: ["face", "creme"],
      price: 1000,
      img: "./images/kiko.jpg",
      rating: 4.3,
    },
    {
      title: "Тушь для ресниц Belita Vitex",
      description: "Выразительный взгляд и длинные ресницы!",
      tags: ["face", "eyes"],
      price: 900,
      img: "./images/belita.jpg",
      rating: 2.4,
    },
    {
      title: "Блеск для губ Dior",
      description: "Увлаженение и объем мгновенно и надолго!",
      tags: ["lips"],
      price: 950,
      img: "./images/lip.jpg",
      rating: 5.0,
    },
    {
      title: "Губная помада MAC",
      description: "Интенсивный цвет и абсолютно матовое покрытие!",
      tags: ["lips"],
      price: 1100,
      img: "./images/lips mac.jpg",
      rating: 3.7,
    },
    {
      title: "Румяна для лица MAC",
      description: "Полупрозрачное регулируемое покрытие и естественный финиш!",
      tags: ["face"],
      price: 870,
      img: "./images/mac.jpg",
      rating: 3.9,
    },
    {
      title: "Палетка для макияжа глаз Dior",
      description: "Для создания макияжных образов от самого естественного до самого яркого!",
      tags: ["eyes"],
      price: 650,
      img: "./images/plate dior.jpg",
      rating: 5.0,
    },
    {
      title: "Парфюмерная вода Si Giorgio Armani",
      description: "Для женщины, сильной, но женственной, самодостаточной, но очаровательной.",
      tags: ["parfume"],
      price: 2200,
      img: "./images/si.jpg",
      rating: 4.9,
    },
    {
      title: "Парфюмерная вода Yves Saint Laurent",
      description: "Свобода быть дерзкой, страстной и смелой!",
      tags: ["parfume"],
      price: 2500,
      img: "./images/yves.jpg",
      rating: 4.4,
    },
  ];
  

  let currentState = [...items];
  
  
  const itemsContainer = document.querySelector("#shop-items");
  const itemTemplate = document.querySelector("#item-template");
  const nothingFound = document.querySelector("#nothing-found");
  
  
  function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
      itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
      nothingFound.textContent = "Ничего не найдено";
    }
  }
  

  function sortByAlphabet(a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  }
  

  renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
  
  
  function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}P`;
  
   
    const ratingContainer = item.querySelector(".rating");
    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      ratingContainer.append(star);
    }
  
    const tagsHolder = item.querySelector(".tags");
  
    tags.forEach((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      element.classList.add("tag");
      tagsHolder.append(element);
    });
  
  
    return item;
  }
  

  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-btn");
  
  
  function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
      el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
  }
  
  
  searchButton.addEventListener("click", applySearch);
  searchInput.addEventListener("search", applySearch);
  
  const sortControl = document.querySelector("#sort");
  sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "expensive": {
        currentState.sort((a, b) => b.price - a.price);
        break;
      }
      case "cheap": {
        currentState.sort((a, b) => a.price - b.price);
        break;
      }
      case "rating": {
        currentState.sort((a, b) => b.rating - a.rating);
        break;
      }
      case "alphabet": {
        currentState.sort((a, b) => sortByAlphabet(a, b));
        break;
      }
    }
    renderItems(currentState);
  });
  