import axios from "axios";

export const predictPromotion = async (data) => {

  const response = await axios.post(
    "/predict",
    data
  );

  return response.data;

};