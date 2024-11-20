import "./table.scss";

// const theadData = ["PRODUCT", "CATEGORY", "STOCK", "TOTAL SALE",];

// const rows = [
//     {
//         id: 1143155,
//         product: "Acer Nitro 5",
//         img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//         category: "John Smith",
//         totalSale: 785,
//         stock: "In Stock",
//     },
//     {
//         id: 2235235,
//         product: "Playstation 5",
//         img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
//         category: "Michael Doe",
//         totalSale: 900,
//         stock: "Out Of Stock",
//     },
//     {
//         id: 2342353,
//         product: "Redragon S101",
//         img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
//         category: "John Smith",
//         totalSale: 35,
//         stock: "Out Of Stock",
//     },
//     {
//         id: 2357741,
//         product: "Razer Blade 15",
//         img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
//         category: "Jane Smith",
//         totalSale: 920,
//         stock: "In Stock",
//     },
//     {
//         id: 2342355,
//         product: "ASUS ROG Strix",
//         img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
//         category: "Harold Carol",
//         totalSale: 2000,
//         stock: "Out Of Stock",
//     },
//     {
//         id: 2235035,
//         product: "Playstation 5",
//         img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
//         category: "Michael Doe",
//         totalSale: 900,
//         stock: "Out Of Stock",
//     },
// ];

function Table({ theadData, rows }) {
    return (
        <table className="table">
            <thead>
                <tr className="table_Head">
                    {theadData.map((item, i) => (
                        <th key={i} className="thData">
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((item) => {
                    return <tr key={item.id} className="table_Row">
                        <td className="table_Cell">
                            <div className="cellWrapper">
                                <img src={item.img} alt="" className="image" />
                                <span>{item.product}</span>
                            </div>
                        </td>
                        {item.category &&
                            <td className="table_Cell">{item.category}</td>
                        }
                        <td className="table_Cell stock">
                            <span className={item.stock === "In Stock" ? "badge inStock" : "badge outStock"}>{item.stock}</span>
                        </td>
                        <td className="table_Cell">{item.totalSale}</td>
                    </tr>
                })}
            </tbody>
        </table>
    )

};

export default Table;




