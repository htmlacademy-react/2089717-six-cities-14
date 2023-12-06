import { UserData } from '../types';

export const saveUserData = (userData: UserData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const deleteUserData = (): void => {
  localStorage.removeItem('userData');
};

export const getUserData = (): UserData | void => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return JSON.parse(userData);
  }
};

export const getToken = (): string => {
  const userData = getUserData();
  if (userData) {
    return userData.token;
  }
  return '';
};

export const getEmail = (): string => {
  const userData = getUserData();
  if (userData) {
    return userData.email;
  }
  return '';
};
