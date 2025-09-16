import { useContext } from "react";
import { NavLink } from "react-router";

import "./C_heroList.css";

import { HeroDataContext } from "src/hooks/context/H_mainContext";

import C_ListItem from "./list_item/C_listItem";

function C_HeroList() {
  const listData = useContext(HeroDataContext);
  return (
    <ul className="hero__list">
      {listData ? (
        listData.map((item) => (
          <NavLink key={item.id} to={`/hero/${item.id}`}>
            <C_ListItem data={item} />
          </NavLink>
        ))
      ) : (
        <div>Empty</div>
      )}
    </ul>
  );
}

export default C_HeroList;
