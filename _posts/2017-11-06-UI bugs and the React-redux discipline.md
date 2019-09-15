---
title: UI bugs and the React/Redux discipline
---

# UI bugs and the React/Redux discipline

I saw the light on React when I read [James Long's excellent blogpost](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome) where he reimplemented the principles of React as the ["Bloop" library (250 lines)](https://gist.github.com/jlongster/11192270).

> We expressed our component's structure in JavaScript instead of trying to mangle it into the DOM.

> Aren't you tired of having to query the DOM tree and manually manage the structure to create UIs?

It took me a long time to get a deep understanding of what i would call the "React discipline" and the benefits of it. This blogpost tries to lay out what i've understood.


## Pure functions

The most fundamental block React is built on is functions and more accurately [pure functions](https://en.wikipedia.org/wiki/Pure_function), that is functions which return value does only depend on the function arguments and do not affect the world beyond returning the result being returned (no HTTP request, no change in the UI, no change to the localStorage or whatever, etc.).

Other writings go in more details, but among the benefits of pure functions there are :
* they're easier to reason about; you only need to worry about what's passed as argument
* they're easy to test in unit tests

As a consequence, they're easy to debug if you ever found a bug in a pure function.


## The naïve raw DOM/jQuery approach to UI

Let's make a list!

````js
const initialItems = [`San`, `La fête est finie`, `Basique`];

const ol = document.createElement('ol');
document.body.append(ol);

initialItems.forEach(item => {
    const li = document.createElement('li');
    li.append(item);
    ol.append(li);
})

const input = document.createElement('input');
document.body.append(input);

input.addEventListener('keypress', e => {
    if(e.key === "Enter"){
        const newItem = input.value;
        const li = document.createElement('li');
        li.append(newItem);
        // altering the DOM tree
        ol.append(li);
        input.value = '';
    }
})
````

The interesting part in around `addEventListener`. When the user hits `Enter`, a new `li` is created and appended to the right place. This case is simple, but at scale, you can have various sources of events that lead to DOM tree alteration like a `fetch` promise that resolves, a setTimeout or any event (`visibilitychange`, `scroll`, `click`, etc.) on any element happening in an order you cannot control.

(Faire un dessin du DOM qui est modifié par des évènements)

If, for any reason, the UI (the DOM tree) does not look like you'd expect, how to debug it? One approach is to try to guess how the UI ended up this way, but our cognitive abilities are limited. Another way would be to reproduce the conditions which led to the UI looking the way it does.

For the second choice, what you need to do is:
* Get the initial DOM tree from the parsed HTML (usually easy)
* Get the ordered list of all events that occured and led to DOM tree alteration (shockingly hard)

In the naïve "raw DOM" approach, reproducing a UI bug is hard and as a consequence is hard to track down and fix.


## UI as a function of the data - the "React discipline"

My understanding of React is that its heart is pure functions that take data as input and output a fragment of UI. Give this function the same data and the same UI comes out. React has lots of details that are mostly unimportant like the separation between `props` and `state`, lifecycle methods, etc. but the heart is the clear separation between the data in input and the fragment of UI created as output.

UI as functions of data already existed in template languages, like Mustache, but [composition of 2 templates wasn't easy](https://stackoverflow.com/questions/6846672/mustache-templating-nested-templates). As a consequence, it was only practically possible to create components, but not the whole UI. Thanks for functions calling functions, the entire screen can be a function of the data with the React discipline.

````js
function ItemList(list){
    const ol = document.createElement('ol');
    list.forEach(item => {
        const li = document.createElement('li');
        li.append(item);
        ol.append(li);
    });
    return ol;
}

function Input(onNewItem){
    const input = document.createElement('input');
    input.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            const newItem = input.value;
            onNewItem(newItem);
        }
    })
    return input;
}

const items = [`San`, `La fête est finie`, `Basique`];

(function render(){
    document.body.innerHTML = '';
    document.body.append(
        ItemList(initialItems),
        Input(item => {
            items.push(item);
            render();
        })
    );
})();
````

Here, the `ListItem` and `Input` functions are pure. So as demonstrated, one can apply the "React discipline" to raw DOM.

In case the UI looks wrong, you know exactly which part of the code is to blame with two possible guilty parts: 
* the function
* the input data

If the problem is in the function, easy, get the same input data pure function, write a [regression test](https://en.wikipedia.org/wiki/Regression_testing) that fails and work on your function as much as needed until the new test passes along with all the other tests. To get the same input data, either a `console.log` or remote logging at the function top will get it.

Or maybe the function works and the problem is the input data that is wrong for some reason.
If the data is wrong, to reproduce it, one has to... get the ordered list of all events that occured and led to data alteration (shockingly hard)...

Back to square one? Not exactly. By making our UI with functions, we've drawn a boundary which has the first benefit that it should be clearer in the code what parts are about UI and what part are about storing the data to pass it down to the UI functions at some point. But it remains that part of the problem has been shifted from a UI problem to a data state problem.

Enters redux...


## The application state as a function of an action and the previous state - the redux discipline

If your UI is a function of your data, then at some point in time, you need a consolidated view of your data. Let's call this consolidated view the "application state".

> get the ordered list of all events that occured and led to data alteration (shockingly hard)

The heart of the redux discipline lies in two core ideas :
* model any and all of the possible events that occur and affect the application state as an "action"
* have a pure function that takes the previous state and an action as input and outputs the next state (redux calls it the "reducer")

If the application state ever is erroneous because of a bug, it can have two possible causes: 
* the function
* the inputs (previous state + action)

If the bug is in the function, you can `console.log` the arguments, regression test, fix. Controlled type of problem.

If the bug comes from an erroneous previous state, then debug the previous function call since the previous state comes from there.
The bug might come from the action, but these are meant to be small unitary pieces of data to model an event, so it's a rare event.

In the end, bugs will happen, but the redux discipline helps keeping the problem fairly easily fixable.

Very much like with React, [you might not need redux (the library)](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367#.d3b2vhnnv) to adhere to the redux discipline.







