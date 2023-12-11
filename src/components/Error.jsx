import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <>
            <Navbar isVisible={false} />
            
            <div className="flex justify-center p-10">
                <p className="text-xl font-bold">404: Page not found</p>

                <Link to="/">

                    <button className="px-4 py-1 rounded-3xl bg-white text-sky-500 font-bold shadow-2xl">Go Home</button>
                </Link>
            </div>
        </>
    );
}


export default Error;