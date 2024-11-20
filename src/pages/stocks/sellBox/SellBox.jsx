import "./sellBox.scss";
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';

function SellBox() {
    return (
        <section className="sellBox">
            <article className="txtContent">
                <div className="left">
                    <div className="icon">
                        <CameraOutlinedIcon />
                    </div>
                    <div>
                        <h4>Apple</h4>
                        <p>$12340141</p>
                    </div>
                </div>
                <div className="right">
                    <p>.14%</p>
                    <p>+5201f5d4fd</p>
                </div>
            </article>
            <article className="btnContainer">
                <button>Short</button>
                <button>Buy</button>
            </article>
        </section>
    )
};

export default SellBox;
