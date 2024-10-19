import { create, StateCreator } from 'zustand';

type TCounterState = {counter: number;}

type TCounterActions = {
  decrement: () => void;
  increment: () => void;
  changeByAmount: (value: number) => void;
  reset: () => void;
}

const counterSlice: StateCreator<TCounterState & TCounterActions> = (set) => ({
  counter: 0,
  decrement: () => {
    set((state) => ({...state, counter:  state.counter - 1}));
  },
  increment: () => {
    set((state) => ({...state, counter:  state.counter + 1}));
  },
  changeByAmount: (value) => {
    set((state) => ({...state, counter:  state.counter + value}));
  },
  reset: () => {
    set((state) => ({...state, counter: 0}));
  }
})

export const useCounterStore = create<TCounterState & TCounterActions>(counterSlice)

export const changeByAmount = (value: number) => useCounterStore.getState().changeByAmount(value);
export const getCounter = () =>  useCounterStore.getState().counter;
