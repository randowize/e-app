const PI = Math.PI;
export const getRadians  = () => (new Date().getSeconds() * PI / 30) - (90 * PI / 180);
