import { useNavigate } from "react-router-dom";
import "./MenuPop.css";

export default function MenuPop() {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="popupMenu" onClick={(e) => e.stopPropagation()}>
      <div className="menuItem" onClick={() => goTo("/")}>Palettes</div>
      <div className="menuItem" onClick={() => goTo("/create")}>Create</div>
      <div className="menuItem">Collections</div>
    </div>
  );
}
