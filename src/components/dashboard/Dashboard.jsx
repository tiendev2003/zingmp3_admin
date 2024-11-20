import "./dashboard.scss";
import Item from "../ui/item/Item";
import { svgIcon } from "../../data/dashSource";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function Dashboard({ boxStyle, children }) {
    return (
        <div className="dashboard">
            {children}
        </div>)
};

export default Dashboard;



{/* <Item title="Total Revenue" amount="$26,35,262" MySvg={svgIcon.one} BadgeIcon={TrendingUpIcon} badge="2.2%" boxStyle={boxStyle} />
<Item title="Total Sales" amount="$56,35,262" MySvg={svgIcon.two} BadgeIcon={TrendingUpIcon} badge="1.8%" boxStyle={boxStyle} />
<Item title="Total Products" amount="$4,262" MySvg={svgIcon.three} BadgeIcon={TrendingDownIcon} badge="2.0%" boxStyle={boxStyle} />
<Item title="Total Expenses" amount="$35,262" MySvg={svgIcon.four} BadgeIcon={TrendingUpIcon} badge="1.4%" boxStyle={boxStyle} /> */}