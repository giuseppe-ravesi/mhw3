let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
}

/*Menu a comparsa */
const hamMenu = document.querySelector(".hamburger-icon");
const menuHidden = document.querySelector(".menu-comparsa");

hamMenu.addEventListener('click', () => {
  hamMenu.classList.toggle("active");
  menuHidden.classList.toggle("active");
}
)

const apiUrl = 'https://newsapi.org/v2/top-headlines?country=it&category=sports&apiKey=f6e641d6d5eb4955aefc2f5d86035499';


// Funzione per caricare e visualizzare in modo casuale 4 articoli alla volta
function loadAndDisplayRandomArticles() {
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
  
      const shuffledArticles = shuffleArray(data.articles);
      
      displayArticles(shuffledArticles.slice(0, 4));

      if (shuffledArticles.length > 4) {
          document.getElementById('load-more-btn').style.display = 'block';
      }
  })
  .catch(error => {
      console.error('Si è verificato un errore durante il recupero delle notizie:', error);
  });
}


function loadMoreArticles() {
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      // Mescolare casualmente l'array di articoli
      const shuffledArticles = shuffleArray(data.articles);

      // Visualizzare altri 4 articoli
      displayArticles(shuffledArticles.slice(0, 4));
  })
  .catch(error => {
      console.error('Si è verificato un errore durante il recupero delle notizie:', error);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funzione per visualizzare gli articoli nel DOM
function displayArticles(articles) {
  const newsContainer = document.querySelector('.carousel-container');
  newsContainer.innerHTML = ''; 

  articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
          <div class="article-content">
              <h3>${article.title}</h3>
              <a href="${article.url}" target="_blank">Leggi di più</a>
          </div>
      `;
      newsContainer.appendChild(articleElement);
  });
}

// Caricamento e visualizzazione dei 4 articoli casuali all'avvio
document.addEventListener('DOMContentLoaded', loadAndDisplayRandomArticles);

// Gestione del click sul pulsante "Carica altri"
document.getElementById('load-more-btn').addEventListener('click', loadMoreArticles);
