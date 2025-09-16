import type { HeroesInstance } from "src/types/types";
import "./C_listItem.css";

function ListItem({ data }: { data: HeroesInstance }) {
  const placeholdersPath = "/placeholders/image_placeholder.png";
  const heroImage = data.image_url ? data.image_url : placeholdersPath;
  return (
    <li className="hero-li">
      <div className="hero-li__wrapper">
        <div className="hero-li__content">
          <div className="hero-li__image">
            <img src={heroImage} alt="hero image" />
          </div>
          <div className="hero-li__info_wrapper">
            <h2 className="hero-li__nickname">{data.nickname}</h2>
            <h3 className="hero-li__name">{data.real_name}</h3>
            <p className="hero-li__descr">{data.origin_description}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
