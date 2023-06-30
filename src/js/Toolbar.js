export default function Toolbar(props) {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };
  const stringMonth=(date.getMonth()+1).toString();
  console.log(stringMonth)
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/*
        <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button>
        */}
        {/*
        <button type="button" onClick={navigate.bind(null, "PREV")}>
          ◁
        </button>
         */}
        <span className="rbc-toolbar-label">{`${date.getFullYear()}. ${("0" + (date.getMonth() + 1)).slice(-2)
        }`}</span>
        {/*
        <button type="button" onClick={navigate.bind(null, "NEXT")}>
          ▷
        </button>
         */}
      </span>
    </div>
  );
}
