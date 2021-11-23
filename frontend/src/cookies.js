import Cookies from "universal-cookie";
export const token = () => {
    var cookies = new Cookies();
    return cookies.get("auth");
<<<<<<< HEAD
};

export const removeToken = () => {
    var cookies = new Cookies();
    return cookies.remove("auth");
};
=======
  };
  
export const removeToken = () => {
    var cookies = new Cookies();
    return cookies.remove("auth");
  };
  
>>>>>>> 0384a8045eada6b0db7c36783b79a85abe0d2b43
