export const randomPhoto = () => {
  const randIndex = Math.ceil(Math.random() * 4);
  if (randIndex === 1) {
    return 'bg1.jpeg';
  } else {
    return `bg${randIndex}.jpg`;
  }
};
