import { changeByAmount, getCounter } from '../model/counterStore.ts';

export const addTen = () => {
  const counter = getCounter();
  if (counter < 0) {
    changeByAmount(-10);
  } else {
    changeByAmount(10);
  }
}
