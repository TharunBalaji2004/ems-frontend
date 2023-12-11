import { Link } from "react-router-dom";

const Navbar = (props) => {
    if (props.isVisible == null) props.isVisible = true;


    return (
        <>
            <nav className="flex flex-row flex-wrap content-center justify-between px-10 w-screen h-20 bg-sky-500">
                <div className="flex items-center">

                    <Link to="/">
                        
                        <p className="text-white font-bold text-sm md:text-lg">Employee Management System</p>
                        <p className="text-white font-normal text-sm">Developed by Tharun Balaji R</p>

                    </Link>
                </div>

                
                <div className="flex items-center"> 
                    {props.isVisible && (
                        <Link to="/change" state={{ isEdit: false }}>
                            <button className="px-4 py-1 rounded-3xl bg-white text-sky-500 font-bold shadow-2xl text-sm lg:text-base">Add Employee</button>
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
}


export default Navbar;