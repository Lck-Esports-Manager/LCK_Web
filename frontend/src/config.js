import { token } from "./cookies.js";

export const header = {
  headers: {
    Authorization: `jwt ${token()}`,
  },
};

export const domain="http://localhost"
//"http://ec2-13-125-93-239.ap-northeast-2.compute.amazonaws.com" 
// "http://localhost"
  
