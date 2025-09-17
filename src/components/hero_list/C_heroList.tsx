import { useContext } from "react";

import "./C_heroList.css";

import { HeroesDataContext } from "src/hooks/context/H_mainContext";

import C_ListItem from "./list_item/C_listItem";

function C_HeroList() {
  const listData = useContext(HeroesDataContext);
  return <ul className="hero__list">{listData ? listData.map((item) => <C_ListItem key={item.id} data={item} />) : <div>Empty</div>}</ul>;
}

export default C_HeroList;
