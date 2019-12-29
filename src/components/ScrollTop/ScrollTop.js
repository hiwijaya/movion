import {useEffect} from "react";
import {useLocation} from "react-router-dom";


// this component made for fixed change page back to top issue
export default function ScrollTop() {
    const {
        pathname
    } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
