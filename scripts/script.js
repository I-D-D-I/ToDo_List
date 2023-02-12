const input = document.querySelector('.cont__input');
const list = document.querySelector('.check__list');
const addBtn = document.querySelector('.btn__add');
const chkBtn = document.querySelector('.cont__btnGray');
const allBtn = document.querySelector('.cont__btnRed');
const form = document.querySelector('.input-field');
const card = document.querySelector('.check__wrapper');

let savedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
let todos = savedTodos;

const drawBtns = () => {
  !todos.length
    ? allBtn.style.display = 'none'
    : allBtn.style.display = 'inline-block';
  !todos.length
  ? chkBtn.style.display = 'none'
    : chkBtn.style.display = 'inline-block';

  !todos.length
    ? card.style.display = 'none'
    : card.style.display = 'block';
  
  } 

const addTodo = (evt) => {
  evt.preventDefault()
  let value = input.value;
  if (value.trim().length) {   
    todos.push  ({      
      id: new Date().toISOString(),
      text: value,
      isDone: false,
    });
  }
    localStorage.setItem('todos', JSON.stringify(todos))
    input.value = '';
    input.focus();
    renderTodos()
}

  const delTodo = (id) => {   
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos()
}

const toggleIsDone = (id) => { 
  todos = todos.map((todo) => {           
    if (id !== todo.id) {
      return todo                     
    }
      return todo = {
        ...todo,
        isDone: !todo.isDone,
      }
})
  renderTodos()
};

const deleteAll = () => {
  todos = [];
  renderTodos()
};

const deleteChecked = () => {
  todos = todos.filter((todo) => !todo.isDone)
  renderTodos()
}

const drawTodo = (obj) => {
  const li = document.createElement('li');
  li.innerHTML = `<input class='check' type='checkbox'> 
                  <span class='check__text'>${obj.text}</span>
                  <button class='cont__cross btn__del'>❌</button>`;    
  const del = li.querySelector('.btn__del');   
  const chk = li.querySelector('.check');
  
  chk.checked = obj.isDone;

  chk.addEventListener('change', () => toggleIsDone(obj.id));
  del.addEventListener('click', () => delTodo(obj.id))
  return li
}

function renderTodos () {
  list.innerHTML = '';
  localStorage.setItem('todos', JSON.stringify(todos))
  todos.forEach((item) => {
    list.append(drawTodo(item))
  })
  drawBtns()
}

renderTodos();

form.addEventListener('submit', addTodo);
allBtn.addEventListener('click', deleteAll);
chkBtn.addEventListener('click', deleteChecked);





