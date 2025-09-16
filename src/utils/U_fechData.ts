import axios from "axios";
import type { ResponseData } from "src/types/types";

async function U_fetchData(page: any): Promise<ResponseData | undefined> {
  try {
    const response = (await axios.get(`http://localhost:3001/api/get_all_heroes?page=${page}&limit=5`)).data;

    return response;
  } catch (err) {
    console.error(err);
  }
}

export default U_fetchData;
