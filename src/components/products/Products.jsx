import "./products.scss";
import Product from "../ui/product/Product";
import Topbar from "../ui/topbar/Topbar";


function Products({ title, IconBox, children }) {
    return (
        <section className="products">
            <Topbar title={title} IconBox={IconBox} />
            <div className="productsContainer">
                {children}
            </div>
        </section>
    )
};

export default Products;

