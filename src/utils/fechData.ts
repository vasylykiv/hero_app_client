import axios from "axios";
import type { ResonseData } from "src/types/types";

async function fetchData(): Promise<ResonseData | undefined> {
  try {
    const response = (await axios.get("http://localhost:3001/api/get_hero")).data;

    return response;
  } catch (err) {
    console.error(err);
  }
}

export default fetchData;
