
// 1 task
swapHtml('.head-cell','.foot-cell');

swap.onclick = function () { swapHtml('.head-cell','.foot-cell') };

function swapHtml(x ,y)
{
    let temp = document.querySelector(x).innerHTML;
    document.querySelector(x).innerHTML = document.querySelector(y).innerHTML;
    document.querySelector(y).innerHTML = temp;
}


// 2 task
task2.onclick = function()
{
    var S = areaOfParalelogram(4, 8)
    if (S < 0){
            alert('Error!!! You entered the wrong value')
        }
    document.querySelector('.data-cell').querySelector('p').after('Area of paralelogram: ' + S)
};
function areaOfParalelogram(side, heigh) 
{
    return side*heigh;
}

// 3 task
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/'
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  document.cookie = encodeURIComponent(name) +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

task3.onclick = function CountWords(){
  document.getElementById("task3").style.display = "none";
  let data = document.getElementById("inp").value;
  let length;
  if(data === "")
    length = 0;
  else{
    length = data.trim().split(/\s+/).length;
  }
  setCookie("CountWords", length);
  alert("Count words: " + length);
  localStorage.setItem('task3-form-display', "none");
  let isDelete = confirm("Remove cookie: CountWords = " + getCookie("CountWords"));
  if(isDelete){
    deleteCookie("CountWords");
    localStorage.setItem('task3-form-display', "block");
  }else{
    alert("Cookie not null. " + "CountWords = " + getCookie("CountWords") + ". Please click on to reload the page");
  }
}

function HideForm(){
  if(localStorage.getItem('task3-form-display'))
    document.getElementById("task3-form").style.display = localStorage.getItem('task3-form-display');
}


// 4 task
    loadColor('block_color');
    task4.onclick = function task4()
    {
    let color = document.querySelector('#form_block_color').querySelector('input').value;
    localStorage.setItem('block_color',color);
    paint();
    loadColor('block_color');
    }

    function paint(color)
    {
    //const color = localStorage.getItem('block_color');
    document.querySelector('.menu-cell').style.backgroundColor = color;
    }
    function loadColor(localStorageKey)
    {
        if (localStorage.getItem(localStorageKey))
        {
        paint(localStorage.getItem(localStorageKey));
        document.querySelector('#form_block_color').querySelector('input').value = localStorage.getItem(localStorageKey);
        }
    }

// 5 task
function task5(img, x, y) {
    img.width = x;
    img.height = y;
   }

   //6 task
document.addEventListener('DOMContentLoaded', () => {
    makeEditableBlock('data-cell');
    initEditableBlocks();
})

const initEditableBlocks = () => { 
    Array.from(document.getElementsByClassName('editArea')).map((area) => {
        area.addEventListener('change', (event) => {
            const newContent = event.target.value;
            if (isValidHTML(newContent)) {
                localStorage.setItem(`${event.target.parentNode.id}Content`, newContent);
                event.target.parentNode.children[0].innerHTML = newContent;
            }
            else {
                localStorage.removeItem(`${event.target.parentNode.id}Content`);
                document.location.reload();
            }
        })
    })
    Array.from(document.getElementsByClassName('editBtn')).map((btn) => {
        btn.addEventListener('click', (event) => {
            localStorage.removeItem(`${event.target.parentNode.id}Content`);
            document.location.reload();
        })
    })
}
const makeEditableBlock = (blockId) => {
    const content = localStorage.getItem(`${blockId}Content`) ?
        localStorage.getItem(`${blockId}Content`) :
        document.getElementById(blockId).innerHTML;
    document.getElementById(blockId).innerHTML = content;
    document.getElementById(blockId).insertAdjacentHTML('beforeend',
        `<textarea class="editArea">${content}</textarea>
  <button type="submit" class="editBtn">Return</button>`)
}
const isValidHTML = (html) => {
    const doc = document.createElement('div');
    doc.innerHTML = html;
    return doc.innerHTML === html;
};