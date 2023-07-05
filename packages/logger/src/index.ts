export const logger = {
  error: (place: string, message: any) => {
    console.error(place, message);
  },
  log: (place: string, message: any) => {
    console.log(place, message);
  },
};
