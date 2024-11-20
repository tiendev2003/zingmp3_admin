import "./topbar.scss";

function Topbar({ title, IconBox }) {

    return (
        <div className="topbar">
            <div className="topbar_left">
                <h3 className="title">{title}</h3>
            </div>
            {IconBox}
        </div>)
};

export default Topbar;