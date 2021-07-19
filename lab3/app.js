document.querySelector('#t1').onclick = task1
document.querySelector('#t2').onclick = task2
document.querySelector('#t3').onclick = task3
document.querySelector('#t4').onclick = task4
document.querySelector('#t5').onfocus = task5_1
document.querySelector('#t5').onblur  = task5_2
window.onload = () => {
    paint()
    let isBoss = confirm("Ты здесь главный?");
}

function task1(){
    const text2 = document.querySelector('.p2').querySelector('.caption')
    const text6 = document.querySelector('.p6').querySelector('.slogan_2_2_part')
    const temp = text2.textContent
    text2.textContent = text6.textContent
    text6.textContent = temp
    if(text2.textContent != 'Your-Tour'){
        text2.style.fontSize = 1 + 'rem' 
        text2.style.width = 10.5 + 'rem'
    }
    else{
        text2.style.fontSize = 2 + 'em'
        text2.style.width = 9.6825 + 'rem'
    }
}

function task2(){
    const d1 = 10
    const d2 = 8
    const S = 0.5*d1*d2
    const str = 'Площа ромба зі сторонами 10 та 8 дорівнює ' + S
    document.querySelector('.p5').querySelector('p').after('Площа ромба зі сторонами 10 та 8 дорівнює ' + S)
}

function task3(){
    let num = document.querySelector('#min_max').querySelector('input').value.split(' ');
    let max = num[0];
    for(let i = 0; i < num.length; i++){
        num[i] = +num[i];
        if(num[i] > max){max = num[i]}
    }
    let min = num[0];
    for(let i = 0; i < num.length; i++){
        num[i] = +num[i];
        if(num[i] < min){min = num[i]}
    }
    localStorage.setItem('min',min);
    localStorage.setItem('max',max);
    alert('Max: ' + max + ' Min: ' + min)
}

function task4(){
    const color = document.querySelector('#border_color').querySelector('input').value;
    localStorage.setItem('border_color',color);
    paint()
}

function task5_1(){
    document.querySelector('#t5').value = 'Focus'
}
function task5_2(){
    document.querySelector('#t5').value = 'Task 5'
}

function paint(){
    const color = localStorage.getItem('border_color');
    document.querySelector('.p1').style.border = ['solid',0.3+'rem',color].join(' ')
    document.querySelector('.p2').style.border = ['solid',0.3+'rem',color].join(' ')
    document.querySelector('.p3').style.border = ['solid',0.3+'rem',color].join(' ')
    document.querySelector('.p4').style.border = ['solid',0.3+'rem',color].join(' ')
    document.querySelector('.p5').style.border = ['solid',0.3+'rem',color].join(' ')
    document.querySelector('.p6').style.border = ['solid',0.3+'rem',color].join(' ')
}