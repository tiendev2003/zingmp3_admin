import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./actionBtn.scss";

const actionBtnData = [
  {
    icon: <VisibilityOutlinedIcon />,
    ttext: "View",
  },
  {
    icon: <EditOutlinedIcon />,
    ttext: "Edit",
  },
  {
    icon: <DeleteOutlineOutlinedIcon />,
    ttext: "Delete",
  },
];

function ActionBtn() {
  return (
    <div className="action_btn">
      {actionBtnData.map((btn, i) => (
        <div className="icon" key={i}>
          {btn.icon}
          <span className="tooltiptext">{btn.ttext}</span>
        </div>
      ))}
    </div>
  );
}

export default ActionBtn;
