async function changeContentWithDelay(contentBlocksNames, delay = 0)
{
    let blocksHtml = [];
    contentBlocksNames.forEach(block => {
        blocksHtml.push(document.querySelector(block).innerHTML);
    });
    for (let index = 0; index < blocksHtml.length - 1; index++)
    {
        await sleep(delay);
        document.querySelector(contentBlocksNames[index+1]).innerHTML = blocksHtml[index];
    }
    await sleep(delay);
    document.querySelector(contentBlocksNames[0]).innerHTML = blocksHtml[blocksHtml.length-1];
}

changeContentWithDelay(['#foot-cell','#head-cell'],5000);

 //5 task lab 3
function task5(img, x, y) {
    img.width = x;
    img.height = y;
   }
   

function addColorChangeWithDelay(delay)
{
    setInterval(()=>{document.querySelector('#menu-cell').style = 'color:' + 
        'hsla(' + Math.floor(Math.random()*360) + ', 100%, 82%, 1)';}, delay);
    

    var widthImage = document.getElementById('logo-cell').getElementsByTagName('img')[0].width;

    if(widthImage != 180)
    {
        widthImage = document.getElementById('logo-cell').getElementsByTagName('img')[0].width;
        setInterval(()=>{document.querySelector('#head-cell').style = 'color:' + 
        'hsla(' + Math.floor(Math.random()*360) + ', 100%, 82%, 1)';}, delay);
         setInterval(()=>{document.querySelector('#foot-cell').style = 'color:' + 
        'hsla(' + Math.floor(Math.random()*360) + ', 100%, 82%, 1)';}, delay);
    }
}
addColorChangeWithDelay(5000);

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createCommitFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='git-commits-form';
    form.style = 'display:flex; flex-direction:column; border:solid 1px white; color: white;';

    let username = document.createElement("input");
    username.setAttribute('type',"text");
    username.setAttribute('name',"username");
    username.setAttribute('placeholder',"Username");
    username.setAttribute('required',true);

    let repositoryName = document.createElement("input");
    repositoryName.setAttribute('type',"text");
    repositoryName.setAttribute('name',"repository-name");
    repositoryName.setAttribute('placeholder',"Repository name");
    repositoryName.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Get commits";

    form.append(username);
    form.append(repositoryName);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
async function addCommitsToBlock(blockName)
{
    let username = document.querySelector('#git-commits-form > input[name="username"]').value;
    let repositoryName = document.querySelector('#git-commits-form > input[name="repository-name"]').value;

    let response = await fetch(`https://api.github.com/repos/${username}/${repositoryName}/commits`);
    
    let div = document.createElement('div');
    div.id="commits-content";
    div.style.height = "15%";
    div.style.overflow = "auto";

    let ul = document.createElement('ul');
    if (response.ok) 
    {
        response.json().then(data => data.forEach(c => 
            {
                let li = document.createElement('li');
                li.textContent = `${c.commit.author.name} : ${c.commit.message}`;
                ul.append(li);
            }));
        div.append(ul);
    }
    else 
    {
        let p = document.createElement('p');
        p.textContent = `Error : ${response.status}(${response.statusText})`;
        p.style = 'display:border-box; border: solid 0.1em white; padding = 1em;';
        div.append(p);
    }
    document.querySelector(blockName).appendChild(div);
}

function someFunc()
{
    // Some code
}
async function callFunc(...functions)
{
    for (let index = 0; index < functions.length; index++)
    {
        await functions[index]();
        console.log(`The ${index+1} function has finished its work`)
    }
}
callFunc(someFunc, function(){return sleep(5000)});

createSortFormTo('#data-cell')

function createSortFormTo(blockName)
{
    let form = document.createElement("form");
    form.id='sort-form';
    form.style = 'display:flex; flex-direction:column; border:solid 1px white; color: white;';

    let listOfValues = document.createElement("input");
    listOfValues.setAttribute('type',"text");
    listOfValues.setAttribute('name',"list-of-values");
    listOfValues.setAttribute('placeholder',"List of values");
    listOfValues.setAttribute('required',true);

    let submit = document.createElement("button");
    submit.setAttribute('type',"submit");
    submit.textContent = "Sort";

    form.append(listOfValues);
    form.append(submit);

    document.querySelector(blockName).append(form);
}
function selectionSort(arr)
{ 
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let tmp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = tmp;
        }
    }
    return arr;
}
function sortListOfValuesToBlock(blockName)
{
    let listOfValues = document.querySelector('#sort-form > input[name="list-of-values"]').value;

    let regex = /\d+/g;
    let numberList = listOfValues.match(regex).map(Number);
    if(!numberList)
        console.log("Error: no number is a list");
    else
    {
        console.log('Input list of numbers :');
        console.log(numberList.slice());
        console.log('Sorted list of numbers :')
        console.log(selectionSort(numberList));
    }
}

createCommitFormTo('#data-cell');

document.addEventListener('submit',function(event)
    {
        if(event?.target.id == 'git-commits-form')
        {
            event.preventDefault();
            if(document.querySelector('#commits-content'))
            {
                document.querySelector('#commits-content').remove();
            }
            addCommitsToBlock('#' + document.querySelector('#git-commits-form').parentNode.id);
            document.querySelector('#git-commits-form').reset();
        }
        if(event?.target.id == 'sort-form')
        {
            event.preventDefault();
            if(document.querySelector('#sort-content'))
            {
                document.querySelector('#sort-content').remove();
            }
            sortListOfValuesToBlock('#' + document.querySelector('#sort-form').parentNode.id);
            document.querySelector('#sort-form').reset();
        }
    });


