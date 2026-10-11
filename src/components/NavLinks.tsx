import NavLinksClient from "./NavLinksClient";
import { getCategories } from "@/lib/api";

const NavLinks = async () => {
    const data = await getCategories();

    return <NavLinksClient categories={data} />;
};

export default NavLinks;
