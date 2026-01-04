import './LeftSideBar.css'
import img1 from "../../assets/new.svg"
import img2 from "../../assets/collection.svg"
import img3 from "../../assets/random.svg"
import img4 from "../../assets/popular.svg"
import { NavLink } from "react-router-dom"; 


const mainMenu = [
  { label: "New", path: "/palettes/new", icon: <img src={img1} alt="new" style={{ width: 24, height: 24 }}  /> },
  { label: "Collection", path: "/collection", icon: <img src={img2} alt="collection" style={{ width: 24, height: 24 }}  /> },
  { label: "Random", path: "/palettes/random", icon: <img src={img3} alt="random" style={{ width: 24, height: 24 }} /> },
  { label: "Popular", path: "/palettes/popular", icon: <img src={img4} alt="popular" style={{ width: 24, height: 24 }} /> },
];

const collections = [
  "Pastel",
  "Retro",
  "Dark",
  "Neon",
  "Sky",
  "Vintage",
  "Warm",
  "Cool",
  "Arcade",
  "Cozy",
  "Purple",
  "Summer",
  "Autumn",
  "Clay",
  "Candy",
  "Forest",
  "Sunrise",
  "Storm",
  "Ocean",
  "Desert",
];



export default function Sidebar() {

  return (
    <aside className="sidebar">

      <div className='classforbottomborder'>
        {mainMenu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className="menu-item"
          >
            <div className='main-item-bar-div'>
              {item.icon}
              <span>{item.label}</span>
            </div>
          </NavLink>
        ))}
      </div>


      <ul className="collection-list">
        {collections.map((col) => {
          const slug = col.toLowerCase(); 
          return (
            <NavLink
              key={col}
              to={`/palettes/${slug}`}
              className="collection-item"
            >
              {col}
            </NavLink>
          )
        })}
      </ul>
    </aside>
  );
}
