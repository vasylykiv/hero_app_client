import { useContext } from "react";

import "./C_heroList.css";

import { HeroesDataContext } from "src/hooks/context/H_mainContext";

import C_ListItem from "./list_item/C_listItem";

function C_HeroList() {
  const listData = useContext(HeroesDataContext);

  console.log(listData);
  return <ul className="hero__list">{listData?.length > 0 ? listData.map((item) => <C_ListItem key={item.id} data={item} />) : <div className="hero__list_empty">Empty</div>}</ul>;
}

export default C_HeroList;
