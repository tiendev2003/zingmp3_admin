import Topbar from "../ui/topbar/Topbar";
import "./tasklist.scss";


const tasks = { id: 1, userImg: "https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg", name: 'Hugh Jackma', price: '$499.99', deliveryDate: '15 May 2022', itemImg: "https://spruko.com/demo/synto/Synto/dist/assets/img/ecommerce/products/2.png" };

function TaskList({ IconBox }) {
    return (
        <section className="tasklist">
            <Topbar title={"Task List"} IconBox={IconBox} />
            <table className="table" key={tasks.id}>
                <tbody className="tableBody">
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                    <TableRow userImg={tasks.userImg} name={tasks.name} price={tasks.price} deliveryDate={tasks.deliveryDate} itemImg={tasks.itemImg} />
                </tbody>
            </table>
        </section>
    )
};

export default TaskList;

const TableRow = ({ userImg, name, price, deliveryDate, itemImg }) => {
    return (
        <tr className="table_Row">
            <td className="table_Cell">
                <div className="tiHead">
                    <div>
                        <img src={userImg} alt="Image Description" />
                        <span>
                        </span>
                    </div>
                    <div className="text">
                        <span>Name</span>
                        <p>{name}</p>
                    </div>
                </div>
            </td>
            <td className="table_Cell">
                <div className="text">
                    <span>Price</span>
                    <p className="price">{price}</p>
                </div>
            </td>
            <td className="table_Cell">
                <div className="text">
                    <span>Delivery Date</span>
                    <p>{deliveryDate}</p>
                </div>
            </td>
            <td className="table_Cell">
                <img src={itemImg} alt="Image Description" />
            </td>
        </tr>
    )
}
