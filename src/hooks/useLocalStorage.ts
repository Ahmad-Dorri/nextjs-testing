'use client';

type LocalStorageType = {
  id: string;
  value: string;
}[];

export const useLocalStorage = (key: string) => {
  const getLocalStorage = () => {
    return JSON.parse(
      window.localStorage.getItem(key) || '[]'
    ) as LocalStorageType;
  };

  const setLocalStorage = (value: string) => {
    try {
      const newLocalStorage: LocalStorageType = [
        ...getLocalStorage(),
        {
          id: new Date().valueOf().toString(),
          value,
        },
      ];

      return window.localStorage.setItem(key, JSON.stringify(newLocalStorage));
    } catch (error) {
      console.log(error);
    }
  };

  const removeLocalStorage = (id: string) => {
    try {
      const newLocalStorage = getLocalStorage().filter(
        (todo) => todo.id !== id
      );
      window.localStorage.setItem(key, JSON.stringify(newLocalStorage));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  };
};
