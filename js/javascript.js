let todoItems = [];
let madeAllActive = false;
let currentTab = 'All';

function showTodoItems() {
    if (currentTab === 'All') {
        showAllItems();
    } else if (currentTab === 'Todo') {
        showTodoItems();
    } else if (currentTab === 'Complete') {
        showCompleteItems();
    }
}

function insertTodoItemsHTML(todoItem, eventListDiv) {
    let checkBoxNode = document.createElement('input');//创建节点
    let deleteButtonNode = document.createElement('button');
    deleteButtonNode.setAttribute('onclick', 'hasDeleted(' + todoItem.id + ')');
    deleteButtonNode.append(document.createTextNode('X'));
    checkBoxNode.setAttribute("type", "checkbox");//节点里面写入属性
    checkBoxNode.setAttribute("onclick", 'toggleEventStatus(' + todoItem.id + ')');
    let titleNode;
    if (todoItem.active) {
        titleNode = document.createElement('span');
    } else {
        checkBoxNode.setAttribute('checked', '');
        titleNode = document.createElement('s');
        titleNode.setAttribute('style', 'color:#b8c1c7');
    }
    let blank = document.createElement('br');
    titleNode.append(document.createTextNode(todoItem.title));
    eventListDiv.append(checkBoxNode);
    eventListDiv.append(titleNode);
    eventListDiv.append(deleteButtonNode);
    eventListDiv.append(blank);
}

function inputTodoItems() {
    let todoItem;
    let inputTitle = document.getElementsByClassName('input text')[0].value;
    todoItem = {
        'title': inputTitle,
        'id': todoItems.length,
        'active': true,
        'hasDelete': false
    };
    todoItems.push(todoItem);
    document.getElementsByClassName("input text")[0].value = '';
    showTodoItems();
}

function showAllItems() {
    let eventListDiv = document.getElementById('event-list');
    eventListDiv.innerHTML = '';
    for (let todoItem of todoItems) {
        if (todoItem.hasDeleted) continue;
        insertTodoItemsHTML(todoItem, eventListDiv);
    }
    updateActiveItemNum();
}

function updateActiveItemNum() {
    let activeItemNum = 0;
    for (let todoItem of todoItems) {
        if (todoItem.active && !todoItem.hasDeleted) {
            activeItemNum++;
        }
    }
    if (activeItemNum) {
        document.getElementById("itemsNum").innerHTML = activeItemNum;
    } else if (activeItemNum === 0) {
        document.getElementById("itemsNum").innerHTML = null;
    }
    if (activeItemNum === todoItems.length) {
        madeALLActive = false;
    } else if (activeItemNum === 0) {
        madeALLActive = true;
    }
}

function toggleItemStatus(id) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.active = !todoItem.active;
        }
    }
    showTodoItems();
}

function deleteButton(id) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.hasDeleted = true;
        }
    }
    showAllItems();
}

function oneClick() {
    console.log(todoItems);
    for (let todoItem of todoItems) {
        changeItemStatus(todoItem.id, madeAllActive);
    }
    madeAllActive = !madeAllActive;
    showTodoItems();
}

function changeItemStatus(id, status) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.active = status;
            break;
        }
    }
}

window.document.onkeydown = function (event) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.keyCode === 13) {
        inputTodoItems();
    }
};

function changeButtonBgColor(classname) {
    document.getElementsByClassName(classname)[0].style.backgroundColor = '#b8c1c7';
}

function changeButtonBgColorToDefault(classname) {
    document.getElementsByClassName(classname)[0].style.backgroundColor = 'white';
}

function buttonAll() {
    currentTab = 'All';
    changeButtonBgColor('all');
    changeButtonBgColorToDefault('todo');
    changeButtonBgColorToDefault('complete');
    showAllItems();
}

function showActiveItems() {
    let eventListDiv = document.getElementById("event-list");//即将要插入东西的那个框
    eventListDiv.innerHTML = '';//每一次输入完待办事件后要将输入框清空
    for (let todoItem of todoItems) {
        if (!todoItem.active || todoItem.hasDeleted) continue;
        insertTodoItemsHTML(todoItem, eventListDiv);
    }
    updateActiveItemNumHTML();
}

function showCompleteItems() {
    let eventListDiv = document.getElementById("event-list");//即将要插入东西的那个框
    eventListDiv.innerHTML = '';//每一次输入完待办事件后要将输入框清空
    for (let todoItem of todoItems) {
        if (todoItem.active || todoItem.hasDeleted) continue;
        insertTodoItemsHTML(todoItem, eventListDiv);
    }
    updateActiveItemNumHTML();
}
function buttonTodo() {
    currentTab = 'Todo';
    changeButtonBgColor('todo');
    changeButtonBgColorToDefault('all');
    changeButtonBgColorToDefault('complete');
    showActiveItems();
}

function buttonComplete() {
    currentTab = 'Complete';
    changeButtonBgColor('complete');
    changeButtonBgColorToDefault('all');
    changeButtonBgColorToDefault('todo');
}

