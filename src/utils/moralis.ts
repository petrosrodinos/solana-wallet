import Moralis from "moralis";
import { MORALIS_API_KEY } from "../constants";

export const initMoralis = async () => {
  try {
    return await Moralis.start({
      apiKey: MORALIS_API_KEY,
    });
  } catch (error) {}
};
