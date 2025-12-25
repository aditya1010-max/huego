// // import axios from "axios";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./CreatePalette.css";

// // export default function CreatePaletteModal() {
// //   const [name, setName] = useState("");
// //   const [category, setCategory] = useState("General");
// //   const [colors, setColors] = useState(["", "", "", ""]);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const paletteData = {
// //       name,
// //       category,
// //       colors: colors.map((hex) => ({ hex }))
// //     };

// //     await axios.post("http://localhost:5000/api/palettes", paletteData);
// //     navigate("/"); // Close modal and go home
// //   };

// //   return (
// //     <div className="modalOverlay">
// //       <div className="modalBox">
// //         <h2>Create Palette</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             placeholder="Palette Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //           />

// //           {colors.map((hex, i) => (
// //             <input
// //               key={i}
// //               placeholder={`#Color ${i + 1} (HEX)`}
// //               value={hex}
// //               onChange={(e) => {
// //                 const newColors = [...colors];
// //                 newColors[i] = e.target.value;
// //                 setColors(newColors);
// //               }}
// //             />
// //           ))}

// //           <select value={category} onChange={(e) => setCategory(e.target.value)}>
// //             <option>General</option>
// //             <option>Warm</option>
// //             <option>Cold</option>
// //             <option>Neon</option>
// //           </select>

// //           <div className="modalActions">
// //             <button type="submit">Save</button>
// //             <button type="button" onClick={() => navigate("/")}>
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }




// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import ColorPickerPanel from "../pages/ColorPicker";
// import SelectedColorsPreview from "../pages/SelectedColorsPreview";
// import "./CreatePalette.css";

// const CreatePalette = () => {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("General");
//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [color, setColor] = useState<string>("#AABBCC");
//   const navigate = useNavigate();

//   const addColor = (clr: string) => {
//     if (!selectedColors.includes(clr) && selectedColors.length < 8) {
//       setSelectedColors([...selectedColors, clr]);
//     }
//   };

//   const removeColor = (clr: string) => {
//     setSelectedColors(selectedColors.filter((c) => c !== clr));
//   };

//   const handleSave = async () => {
//     if (!name.trim() || selectedColors.length === 0) return;

//     const paletteData = {
//       name,
//       category,
//       colors: selectedColors.map((hex) => ({ hex })),
//     };

//     await axios.post("http://localhost:5000/api/palettes", paletteData);

//     navigate("/");
//   };

//   return (
//     <div className="createPage">

//       <header className="createHeader">
//         <Link to="/">← Back</Link>
//         <button disabled={!name || selectedColors.length === 0} onClick={handleSave}>
//           Save Palette
//         </button>
//       </header>

//       <div className="paletteForm">
//         <input
//           className="paletteNameInput"
//           placeholder="Palette Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <select
//           className="categorySelect"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option>General</option>
//           <option>Warm</option>
//           <option>Cold</option>
//           <option>Neon</option>
//           <option>Pastels</option>
//         </select>
//       </div>

//       <SelectedColorsPreview
//         colors={selectedColors}
//         onRemove={removeColor}
//       />

//       <ColorPickerPanel
//         color={color}
//         setColor={setColor}
//         onAdd={addColor}
//       />

//       {selectedColors.length > 0 && (
//         <p className="hintText">Click a color to remove it</p>
//       )}
//     </div>
//   );
// };

// export default CreatePalette;






















// src/pages/CreatePalette.tsx
import { Link } from "react-router-dom";
import "./CreatePalette.css";

const CreatePalette: React.FC = () => {
  return (
    <div className="createPage">
      <header className="createHeader">
        <Link to="/" className="backLink">
          ← Back
        </Link>
        <button className="saveBtn" disabled>
          Save Palette
        </button>
      </header>

      <main className="createContent">
        <section className="createMeta">
          <h1 className="createTitle">Create New Palette</h1>
          <p className="createSubtitle">
            Start with an empty canvas. We’ll add the color picker, name, and
            category step by step.
          </p>

          {/* We will wire these later */}
          {/* <input ... /> */}
          {/* <select ... /> */}
        </section>

        <section className="createWorkspace">
          <div className="emptyStateBox">
            <p className="emptyTitle">No colors yet</p>
            <p className="emptyText">
              Soon this area will show a live preview of your palette as you
              pick colors.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreatePalette;
