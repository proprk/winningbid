import { LuLogOut } from "react-icons/lu";

const Nav = () => {
  return (
    <>
       <section>
         <div className="flex justify-between items-center p-1 bg-[#01122c] text-white px-20 py-4">
           <div>
             <img className="w-[40px] h-auto" src="/images/logo.png" alt="" />
           </div>
           <div className="flex gap-4 text-xs font-medium justify-center items-center">
              <a href="/" className="flex items-center gap-1 border px-2 py-1 rounded-md hover:bg-white hover:text-black transition duration-300">
                <LuLogOut/> Logout
              </a>
           </div>
         </div>
       </section>
    </>
  )
}

export default Nav;