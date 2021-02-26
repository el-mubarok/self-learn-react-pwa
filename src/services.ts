var endpoint: string = "https://fakestoreapi.com/";

const GetProducts = () => {
  return fetch(`${endpoint}products?limit=4`)
  .then(res=>res.json());
}

export {
  GetProducts
};