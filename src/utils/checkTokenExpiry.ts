import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true; 
  }
}
