import { TCoffee, TGetCoffeeListRegByParams } from '../types/coffeeTypes.ts';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const BASE_URL = 'https://purpleschool.ru/coffee-api';

type TCoffeeState = {
  coffeeList?: TCoffee[],
  controller?: AbortController,
}

type TCoffeeActions = {
  getCoffeeList: (params?: TGetCoffeeListRegByParams) => void;
}

const coffeeSlice: StateCreator<TCoffeeState & TCoffeeActions, [['zustand/devtools', never]], []> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  getCoffeeList: async (params) => {
    const { controller } = get();
    if (controller) {
      controller.abort()
    }

    const newController = new AbortController();
    set({controller: newController})
    const { signal }  = newController;

    try {
      const { data } = await axios.get<TCoffee[]>(BASE_URL, { params, signal })
      set({ coffeeList: data }, false, 'coffeeStore/getCoffeeList')
    } catch (e) {
      if (axios.isCancel(e)) {
        return;
      }
    }
  },
})

export const useCoffeeList = create<TCoffeeState & TCoffeeActions>()(devtools(coffeeSlice));
