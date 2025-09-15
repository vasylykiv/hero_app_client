import fechData from "$utils/fechData";
import { useState, useEffect } from "react";
import type { HeroInstance, ResonseData } from "src/types/types";

function HeroList() {
  const [list, setList] = useState<HeroInstance[]>([]);

  useEffect(() => {
    async function fetch() {
      const fetchedData: ResonseData | undefined = await fechData();
      const heroData = fetchedData?.data;

      if (heroData) setList(heroData);
    }

    fetch();
  }, []);

  return <div>{list && list.map((item) => <div key={item.id}>{item.nickname}</div>)}</div>;
}

export default HeroList;
