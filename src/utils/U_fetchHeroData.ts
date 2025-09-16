import axios from "axios";
import type { HeroInstance } from "src/types/types";

async function U_fetchHeroData(id: string): Promise<HeroInstance | undefined> {
  try {
    const response = (await axios.get(`http://localhost:3001/api/get_hero/${id}`)).data;

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export default U_fetchHeroData;
