import { createStore } from 'redux';

//khoi tao state ban dau
const initialState = {
  users: {},
  countOrder: 0,
  orderFoods: [],
  orderDiningTables: [],
  loading:true
};

var rootReducer = (state = initialState, action) => {
  if (action.type === 'USER_STATUS') {
    return { ...state, users: action.payload }
  }
  if (action.type === 'ORDER_FOOD_STATUS') {
    return { ...state, orderFoods: [...state.orderFoods, action.payload] }
  }
  if (action.type === 'ORDER_DINING_TABLE_STATUS') {
    return { ...state, orderDiningTables: [...state.orderDiningTables, action.payload] }
  }
  if (action.type === 'COUNT_ORDER_STATUS') {
    return { ...state, countOrder: action.payload }
  }
  if (action.type === 'DELETE_ORDER_FOOD_STATUS') {
    return { ...state, orderFoods: state.orderFoods.filter(i => i.id !== action.payload.id)}
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: action.payload }
  }
  return state;
}

const store = createStore(rootReducer); // Khởi tạo store

//var action = {
// type: 'TOGGLE_STATUS',
// payload: { title: 'React Redux Tutorial', id: 1 }
//};

//store.dispatch(action); // luc nay action o tren myReDucer chinh la action nay

//console.log(store.getState());

export { store };