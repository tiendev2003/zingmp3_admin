import "./btnDrop.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BtnDrop({ title }) {
    return (
        <div className="btnDrop">
            <span className="title">{title}</span>
            <><ExpandMoreIcon /></>
        </div>
    )
};

export default BtnDrop;
