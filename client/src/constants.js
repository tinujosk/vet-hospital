const serverIP = process.env.REACT_APP_SERVER_IP || 'localhost';
console.log('server IP inside code', serverIP);
export const API_URL = `http://${serverIP}:3001`;
