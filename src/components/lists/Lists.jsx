import "./lists.scss";
import Table from "../ui/table/Table";
import Topbar from "../ui/topbar/Topbar";

function Lists({ title, theadData, rows, IconBox }) {
    return (
        <section className="lists">
            <Topbar title={title} IconBox={IconBox} />
            <div className="sub_Container">
                <Table theadData={theadData} rows={rows} />
            </div>
        </section>
    )
};

export default Lists;
