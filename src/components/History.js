import "./Styles.css";

const History = ({ value }) => {

    let display = value.join(" ");

    return <div className="history">{display}</div>;
}

export default History