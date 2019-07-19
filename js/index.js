let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let madeALLActive = false;
let currentTab = 'ALL';
setTimeout("showTodoItems()",500);

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

function updateActiveItemNumHTML() {
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

function showTodoItems() {
    if (currentTab === 'ALL') {
        showAllItems();
    } else if (currentTab === 'TODO') {
        showActiveItems();
    } else if (currentTab === 'COMPLETE') {
        showCompleteItems();
    }
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function showAllItems() {
    let eventListDiv = document.getElementById("event-list");//即将要插入东西的那个框
    eventListDiv.innerHTML = '';//每一次输入完待办事件后要将输入框清空
    for (let todoItem of todoItems) {
        if (todoItem.hasDeleted) continue;
        insertTodoItemsHTML(todoItem, eventListDiv);
    }
    updateActiveItemNumHTML();
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

function toggleEventStatus(id) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.active = !todoItem.active;
            break;
        }
    }
    showTodoItems();
}

function changeEventStatus(id, status) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.active = status;
            break;
        }
    }
}

function hasDeleted(id) {
    for (let todoItem of todoItems) {
        if (todoItem.id === id) {
            todoItem.hasDeleted = true;
            break;
        }
    }
    showTodoItems();
}

function inputEventDetail() {
    let inputTitle = document.getElementsByClassName("input text")[0].value;
    if (!inputTitle) return;
    let todoItem = {
        'active': true,
        'title': inputTitle,
        'id': todoItems.length,
        'hasDeleted': false
    };
    todoItems.push(todoItem);
    document.getElementsByClassName("input text")[0].value = '';
    showTodoItems();
}

function oneClick() {
    for (let todoItem of todoItems) {
        changeEventStatus(todoItem.id, madeALLActive);
    }
    madeALLActive = !madeALLActive;
    showTodoItems()
}

window.document.onkeydown = function (event) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.keyCode === 13) {
        inputEventDetail();
    }
};

function changeButtonBgColor(classname) {
    document.getElementsByClassName(classname)[0].style.backgroundColor = '#b8c1c7';
}

function changeButtonBgColorToDefault(classname) {
    document.getElementsByClassName(classname)[0].style.backgroundColor = '#FFF';
}

const ALL_TAB_CLASS_NAME = 'option all';
const TODO_TAB_CLASS_NAME = 'option todo';
const COMPLETE_TAB_CLASS_NAME = 'option complete';

function buttonAll() {
    currentTab = 'ALL';
    changeButtonBgColor(ALL_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(COMPLETE_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(TODO_TAB_CLASS_NAME);
    showTodoItems();
}

function buttonTodo() {
    currentTab = 'TODO';
    changeButtonBgColor(TODO_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(ALL_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(COMPLETE_TAB_CLASS_NAME);
    showTodoItems();
}

function buttonComplete() {
    currentTab = 'COMPLETE';
    changeButtonBgColor(COMPLETE_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(TODO_TAB_CLASS_NAME);
    changeButtonBgColorToDefault(ALL_TAB_CLASS_NAME);
    showTodoItems();

}
