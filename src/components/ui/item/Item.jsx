import "./item.scss";

function Item({
  MySvg,
  title,
  amount,
  badge,
  BadgeIcon,
  boxStyle,
  contentStyle,
  desc,
}) {
  return (
    <div className="itemBox" style={boxStyle}>
      <section className="item" style={contentStyle}>
        <p className="badge">
          <BadgeIcon /> {badge}
        </p>
        <article>
          <div className="left">{MySvg}</div>
          <div className="right">
            <h3>{title}</h3>
            <h1>{amount}</h1>
          </div>
        </article>
        <p className="desc">{desc}</p>
      </section>
    </div>
  );
}

export default Item;
