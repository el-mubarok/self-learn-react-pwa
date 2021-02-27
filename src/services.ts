var endpoint: string = "https://fakestoreapi.com/";

const GetProducts = () => {
  return fetch(`${endpoint}products?limit=10`)
  .then(res=>res.json());
}

const GetPopular = () => {
  return fetch(`${endpoint}products?limit=6`)
  .then(res=>res.json());
}

export {
  GetProducts,
  GetPopular
};