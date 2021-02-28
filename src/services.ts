var endpoint: string = "https://fakestoreapi.com/";

const GetProducts = (limit = 10) => {
  return fetch(`${endpoint}products?limit=${limit}`)
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