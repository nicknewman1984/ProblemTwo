import "./Styles.css";

const Screen = ({ value }) => {
    return <div className="screen">
        <p placeholder="0">{value}</p>
        </div>;
}

export default Screen