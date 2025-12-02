import {useCallback, useEffect, useMemo, useState} from 'react'
import { IoSearch } from "react-icons/io5";
import ProductTable from './ProductTable'

const apiBase = import.meta?.env?.VITE_API_BASE|| "http://localhost:5050";

const competitors = [
  { name: "All", link: "/competitor-all" },
  { name: "Chromatic Aura", link: "/chromatic-aura" },
  { name: "Graphic Systems", location: "Minnesota", markup: "20%", link: "/graphic-systems" },
  { name: "Innomark", location: "Ohio", markup: "25%", link: "/innomark" },
  { name: "Sandy Alexander", location: "New Jersey", markup: "30%", link: "/sandy-alexander" },
  { name: "Quad", location: "Wisconsin", markup: "25%", link: "/quad" },
  { name: "Duggal", location: "New York", markup: "25%", link: "/duggal" }
];

const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        if(timer) clearTimeout(timer);
        timer = setTimeout( () => fn(...args) , delay )
    };
}

const SearchBar = () => {

    const [q, setQ] = useState('');
    const [selectedCompetitor, setSelectedCompetitor] = useState('All');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchResults = useCallback( async (searchText, competitor) => {

        // if(!searchText){
        //     setRows([])
        //     setLoading(false);
        //     return;
        // }

        setError(null);
        setLoading(true);

        const paramsObject = {search: searchText ?? "", limit:"20" }
        if (competitor && competitor !== "All") paramsObject.competitor = competitor;

        const params = new URLSearchParams (paramsObject);
        const url = `${apiBase}/api/products?${params.toString()}`

        const res = await fetch(url)
        try{
            
            if(!res.ok) throw new Error ("API" + res.status)
            const data = await res.json()
            setRows(data.results || [])
            setLoading(false);
        }
        catch (err) {
            setError(err.message)
            setRows([])
        } finally {
            setLoading(false);
        }
    }, []); 

    // const handleCompetitorClick = (competitorName) => {
    //     setSelectedCompetitor(competitorName);
    // }

    const debouncedFetch = useMemo( () => debounce(fetchResults, 300), [fetchResults])

    useEffect (() => {
        debouncedFetch(q, selectedCompetitor)
    }, [q, selectedCompetitor])

    

  return (
    <section className="border-b-[0.5px] border-gray-400">
        <div className="flex justify-center items-center gap-2 pt-4 pb-2 bg-gray-100 w-full">
            <div className="flex justify-start items-center w-1/2 bg-white rounded border border-gray-300 rounded-4xl pl-4">
                <IoSearch className="inline-block text-black"/>
                <input 
                    value = {q}
                    onChange={(e)=>{setQ(e.target.value)}}
                    type="text" 
                    id="searchBox" 
                    placeholder="Search..."
                    className="w-full focus:outline-none flex justify-center text-xs p-1 border-gray-300 rounded h-8 text-black"/>
            </div>
        </div>
        <div className="">
            <div className="flex justify-center items-center gap-4 pb-2 bg-gray-100 w-full">
                {competitors.map((competitor) => {
                    return (
                        <button key={competitor.name} onClick={ ()=> {
                            selectedCompetitor === competitor.name ? setSelectedCompetitor("All") : setSelectedCompetitor(competitor.name);
                        }} className={ selectedCompetitor === competitor.name ? 'bg-[#01122c] border-white text-white text-xs p-1 rounded-2xl px-4 cursor-pointer' : 'border border-black text-black text-xs p-1 rounded-2xl px-4 cursor-pointer' } >{competitor.name}</button>
                    )
                })}
            </div>
        </div>
        {error ? <p>{error}</p> : '' }
        <ProductTable rows = {rows} loading={loading}/>

    </section>
  );
}

export default SearchBar;



// SearchBar.jsx
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { IoSearch } from "react-icons/io5";
// import ProductTable from "./ProductTable";

// const apiBase = import.meta?.env?.VITE_API_BASE || "http://localhost:5050";

// const competitors = [
//   { name: "All", link: "/competitor-all" },
//   { name: "Chromatic Aura", link: "/chromatic-aura" },
//   { name: "Graphic Systems", location: "Minnesota", markup: "20%", link: "/graphic-systems" },
//   { name: "Innomark", location: "Ohio", markup: "25%", link: "/innomark" },
//   { name: "Sandy Alexander", location: "New Jersey", markup: "30%", link: "/sandy-alexander" },
//   { name: "Quad", location: "Wisconsin", markup: "25%", link: "/quad" },
//   { name: "Duggal", location: "New York", markup: "25%", link: "/duggal" }
// ];

// // Map competitor -> primary text color (as provided)
// const competitorColors = {
//   "Chromatic Aura": "#DE1A58",
//   "Graphic Systems": "#002455",
//   "Innomark": "#007E6E",
//   "Sandy Alexander": "#62109F",
//   "Quad": "#FFC400",
//   "Duggal": "#e76f51"
// };

// // Simple debounce util
// const debounce = (fn, delay) => {
//   let timer = null;
//   return (...args) => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   };
// };

// /* ----- Color helpers ----- */
// // convert hex like "#aabbcc" to {r,g,b}
// function hexToRgb(hex) {
//   const h = hex.replace("#", "");
//   if (h.length === 3) {
//     // short form like #abc
//     return {
//       r: parseInt(h[0] + h[0], 16),
//       g: parseInt(h[1] + h[1], 16),
//       b: parseInt(h[2] + h[2], 16)
//     };
//   }
//   return {
//     r: parseInt(h.substring(0, 2), 16),
//     g: parseInt(h.substring(2, 4), 16),
//     b: parseInt(h.substring(4, 6), 16)
//   };
// }

// // lighten hex by blending with white by factor (0..1). factor 0.8 -> very light
// function lightenHex(hex, factor = 0.8) {
//   const { r, g, b } = hexToRgb(hex);
//   const nr = Math.round(r + (255 - r) * factor);
//   const ng = Math.round(g + (255 - g) * factor);
//   const nb = Math.round(b + (255 - b) * factor);
//   return `rgb(${nr}, ${ng}, ${nb})`;
// }

// // compute luminance -> to choose contrast color (black/white)
// function getRelativeLuminance({ r, g, b }) {
//   // convert sRGB to linear RGB
//   const srgb = [r / 255, g / 255, b / 255].map((c) =>
//     c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
//   );
//   return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
// }

// function contrastColorForHex(hex) {
//   const rgb = hexToRgb(hex);
//   const lum = getRelativeLuminance(rgb);
//   // WCAG-ish threshold: if luminance is low -> use white text; otherwise black
//   return lum > 0.5 ? "#000000" : "#ffffff";
// }

// /* ----- Component ----- */
// const SearchBar = () => {
//   const [q, setQ] = useState("");
//   const [selectedCompetitor, setSelectedCompetitor] = useState("All");
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchResults = useCallback(async (searchText, competitor) => {
//     setError(null);
//     setLoading(true);

//     const paramsObject = { search: searchText ?? "", limit: "20" };
//     if (competitor && competitor !== "All") paramsObject.competitor = competitor;

//     const params = new URLSearchParams(paramsObject);
//     const url = `${apiBase}/api/products?${params.toString()}`;

//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("API " + res.status);
//       const data = await res.json();
//       setRows(data.results || []);
//     } catch (err) {
//       setError(err.message || "Fetch error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const debouncedFetch = useMemo(() => debounce(fetchResults, 300), [fetchResults]);

//   useEffect(() => {
//     debouncedFetch(q, selectedCompetitor);
//   }, [q, selectedCompetitor, debouncedFetch]);

//   return (
//     <section className="border-b-[0.5px] border-gray-400">
//       <div className="flex justify-center items-center gap-2 pt-4 pb-2 bg-gray-100 w-full">
//         <div className="flex justify-start items-center w-1/2 bg-white rounded border border-gray-300 rounded-4xl pl-4">
//           <IoSearch className="inline-block text-black" />
//           <input
//             value={q}
//             onChange={(e) => {
//               setQ(e.target.value);
//             }}
//             type="text"
//             id="searchBox"
//             placeholder="Search..."
//             className="w-full focus:outline-none flex justify-center text-xs p-1 border-gray-300 rounded h-8 text-black"
//           />
//         </div>
//       </div>

//       <div className="">
//         <div className="flex justify-center items-center gap-4 pb-2 bg-gray-100 w-full flex-wrap">
//           {competitors.map((competitor) => {
//             const isSelected = selectedCompetitor === competitor.name;

//             // keep All button styling exactly as before
//             if (competitor.name === "All") {
//               return (
//                 <button
//                   key={competitor.name}
//                   onClick={() =>
//                     isSelected ? setSelectedCompetitor("All") : setSelectedCompetitor(competitor.name)
//                   }
//                   className={
//                     isSelected
//                       ? "bg-[#01122c] border-white text-white text-xs p-1 rounded-2xl px-4 cursor-pointer"
//                       : "border border-black text-black text-xs p-1 rounded-2xl px-4 cursor-pointer"
//                   }
//                 >
//                   {competitor.name}
//                 </button>
//               );
//             }

//             // For other competitors, pull color from map
//             const primaryColor = competitorColors[competitor.name] || "#222222";
//             const lightBg = lightenHex(primaryColor, 0.80); // 0.80 produces a very light pastel
//             const activeTextColor = contrastColorForHex(primaryColor);

//             // For unselected: text = primaryColor (dark text), bg = lightBg
//             // For selected: bg = primaryColor, text = contrast color (black/white chosen for accessibility)
//             const style = {
//               color: isSelected ? activeTextColor : primaryColor,
//               backgroundColor: isSelected ? primaryColor : lightBg,
//               borderColor: primaryColor,
//               fontWeight: isSelected ? 600 : 500,
//               transition: "all 150ms ease",
//             };

//             return (
//               <button
//                 key={competitor.name}
//                 onClick={() =>
//                   isSelected ? setSelectedCompetitor("All") : setSelectedCompetitor(competitor.name)
//                 }
//                 style={style}
//                 className="text-xs p-1 rounded-2xl px-4 cursor-pointer border"
//                 aria-pressed={isSelected}
//               >
//                 {competitor.name}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {loading ? <p className="text-center py-2">Loading...</p> : null}
//       {error ? <p className="text-center py-2 text-red-500">{error}</p> : null}

//       <ProductTable rows={rows} />
//     </section>
//   );
// };

// export default SearchBar;