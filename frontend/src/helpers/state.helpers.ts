import { Dispatch, SetStateAction } from 'react';

export const addToState = <T>(setState: Dispatch<SetStateAction<T[]>>) => {
  return (newItem: T) => setState((prev) => [...prev, newItem]);
};
export const updateState = <T extends { id: string }>(
  setState: Dispatch<SetStateAction<T[]>>
) => {
  return (newItem: T) => {
    setState((prev) => {
      const index = prev.findIndex((t) => t.id === newItem.id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1, newItem);
      return copy;
    });
  };
};
export const removeFromState = <T extends { id: string }>(
  setState: Dispatch<SetStateAction<T[]>>
) => {
  return (id: string | string[]) => {
    const idArray = Array.isArray(id) ? id : [id];
    setState((prev) => prev.filter((item) => !idArray.includes(item?.id)));
  };
};
