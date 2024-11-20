import "./stockItem.scss";

function StockItem({ SvgLogo, title, amount, graph }) {

    return (
        <section className="stockItem">
            <article className="content">
                <div className="left">
                    <div className="logo">
                        {SvgLogo}
                    </div>
                    <div className="text">
                        <p className="title">{title}</p>
                        <p className="amount">{amount}</p>
                    </div>
                </div>
                <div className="right">
                    {graph}
                </div>
            </article>
        </section>
    )
};

export default StockItem;
