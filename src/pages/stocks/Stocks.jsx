import "./stocks.scss";
import Products from "../../components/products/Products";
import Lists from "../../components/lists/Lists"
import Topbar from "../../components/ui/topbar/Topbar";
import { applicantData } from "../../data/dashSource";
import { countryTHData, recruitersTHData, rows } from "../../data/tableSource";
import ListTable from "../../components/ui/listtable/ListTable";
import TitleBar from "../../components/ui/titleBar/TitleBar";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Dashboard from "../../components/dashboard/Dashboard";
import LinesChart from "../../components/ui/linesChart/LinesChart";
import StockItem from "./stockItem/StockItem";
import ActionBtn from "../../utils/actionBtn/ActionBtn";
import Button from "../../utils/button/Button";
import MoreIcon from "../../utils/moreIcon/MoreIcon";
import BtnDrop from "../../utils/btnDrop/BtnDrop";
import DateValue from "../../utils/dateValue/DateValue";
import MixedChart from "../../components/ui/mixedChart/MixedChart";
import { stocksMixedData } from "../../data/chartData";
import SellBox from "./sellBox/SellBox";
import Product from "../../components/ui/product/Product";
import CodeIcon from '@mui/icons-material/Code';
import Main from "../../utils/main/Main";

function Stocks() {
    return (
        <Main containerName="stocks">
            <TitleBar text="Stocks Dashboard" />
            <Dashboard>
                <StockItem amount="$26,35,262" SvgLogo={<PeopleAltOutlinedIcon />} title={"Total Amount Invested"} graph={<LinesChart />} />
                <StockItem amount="$26,35,262" SvgLogo={<PeopleAltOutlinedIcon />} title={"Total Amount Invested"} graph={<LinesChart />} />
                <StockItem amount="$26,35,262" SvgLogo={<PeopleAltOutlinedIcon />} title={"Total Amount Invested"} graph={<LinesChart />} />
                <StockItem amount="$26,35,262" SvgLogo={<PeopleAltOutlinedIcon />} title={"Total Amount Invested"} graph={<LinesChart />} />
            </Dashboard>
            <div className="center">
                <section className="statistics">
                    <Topbar title={"total investments"} IconBox={<DateValue />} />
                    <div className="statisticsContainer">
                        <MixedChart data={stocksMixedData} />
                    </div>
                </section>
                <Products title={"my stocks"} IconBox={<MoreIcon Icon={<BtnDrop title={"all stocks"} />} />} >
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                    <Product image={"https://spruko.com/demo/synto/Synto/dist/assets/img/users/12.jpg"} title={"Mortal Yun"} desc={"Phd"} price={"25 Courses"} date={"Stocks & Trading"} />
                </Products>
            </div>
            <div className="sellBoxContainer">
                <SellBox />
                <SellBox />
                <SellBox />
                <SellBox />
            </div>
            <div className="bottom">
                <Lists title={"Transaction History"} theadData={countryTHData} rows={rows} />
                <Lists title={"Top Recruiters"} theadData={recruitersTHData} rows={rows} />
            </div>
        </Main>
    )
};

export default Stocks;
