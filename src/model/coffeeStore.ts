import { TCoffee } from '../types/coffeeTypes.ts';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const BASE_URL = 'https://purpleschool.ru/coffee-api';

type TCoffeeState = {
  coffeeList?: TCoffee[]
}

type TCoffeeActions = {
  getCoffeeList: () => void;
}

const coffeeSlice: StateCreator<TCoffeeState & TCoffeeActions, [['zustand/devtools', never]], []> = (set) => ({
  coffeeList: undefined,
  getCoffeeList: async () => {
    try {
      const { data } = await axios.get<TCoffee[]>(BASE_URL)
      set({ coffeeList: data }, false, 'coffeeStore/getCoffeeList')
    } catch (e) {
      console.log(e)
    }
  },
})

export const useCoffeeList = create<TCoffeeState & TCoffeeActions>()(devtools(coffeeSlice));
