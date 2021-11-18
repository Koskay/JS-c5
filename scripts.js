const btn = document.querySelector('.j-btn');
const mess = document.querySelector('.label__hint1');
const mess2 = document.querySelector('.label__hint2');
const resultNode = document.querySelector('.result');
let cards = '';
const myJSON = localStorage.getItem('myJSON');

//Проверка есть ли данные в localStorge
if(myJSON){
  //Отображаем последние данные, затем очищаем localStorge 
        JSON.parse(myJSON).forEach(item=>{
          const cardBlock = `
            <div class='card'>
              <img src=${item.download_url} class='card-image'/>
              <p>${item.author}</p>
            </div>`;
          cards = cards + cardBlock;
          });
          resultNode.innerHTML = cards;
        localStorage.clear();
}else{btn.addEventListener('click', () => {
  // Валидация
  
  const value1 = document.querySelector('.one');
  const value2 = document.querySelector('.two');
  
  if (value2.value > 10 && value1.value > 10){
    mess2.classList.remove('label__hint');
    mess.classList.add('label__hint');
    mess2.textContent = '';
    mess.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
  }else if (value2.value > 10){
    mess.classList.remove('label__hint');
    mess2.classList.add('label__hint');
    mess.textContent = '';
    mess2.textContent = 'Лимит вне диапазона от 1 до 10';
  }else if(value1.value > 10){
    mess2.classList.remove('label__hint');
    mess.classList.add('label__hint');
    mess2.textContent = '';
    mess.textContent = 'Номер страницы вне диапазона от 1 до 10';
  }else{
    // Если валидация пройдена, делаем запрос
      fetch(`https://picsum.photos/v2/list?page=${value1.value}&limit=${value2.value}`)
        .then((response) => {
          // Превращаем объект в JSON. Мы не можем его сразу прочитать,
          // надо отдать в следующий then
          const result = response.json();
          return result;
        })
        .then((data) => {
          data.forEach(item=>{
            const cardBlock = `
              <div class='card'>
                <img src=${item.download_url} class='card-image'/>
                <p>${item.author}</p>
              </div>`;
            cards = cards + cardBlock;
            });
          //Подстовляем в HTML
          resultNode.innerHTML = cards;
          //Записавыем в localStorge
          localStorage.setItem('myJSON', JSON.stringify(data));
    })
      
     .catch((error) => { console.log(error.message) });
  }});
}
