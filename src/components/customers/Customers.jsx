import "./customers.scss";
import User from "../ui/user/User";
import Topbar from "../ui/topbar/Topbar";

function Customers({ IconBox }) {
    return (
        <section className="customers">
            <Topbar title={"Top Customers"} IconBox={IconBox} />
            <div className="customer-list">
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
            </div>
        </section>
    )
};

export default Customers;
