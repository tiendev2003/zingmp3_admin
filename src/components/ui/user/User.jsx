import "./user.scss";
import profile from "../../../assets/profile.jpg";

function User() {
    return (
        <div className="user">
            <div className="content">
                <img src={profile} alt="" />
                <div className="text">
                    <p className="title">Jhon Doe</p>
                    <p className="desc">15 purchases</p>
                </div>
            </div>
            <div className="price_box">
                <span className="price">$1,835</span>
            </div>
        </div>
    )
};

export default User;
