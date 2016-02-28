//Following Dan Ambramov tutorial on egghead.io, copied from my codepen at codepen.io/matt-paul

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
        return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// Reimplementing createStore function
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      // removes unsubscribed listeners from the listener array
      listeners = listeners.filter(l => l !== listener)
    }
  };

  //Dummy action to get the reducer to return an initial value
  dispatch({});

  return { getState, dispatch, subscribe };
};



const store = createStore(counter);

//Store Methods
console.log(store.getState());

//Dispatches an action to modify the application state
store.dispatch({ type: 'INCREMENT' })

//renders the result to our page
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
})
