export interface Props {
  header: string;
}

const CalHeader = ({header}: Props) => {
  console.log("Header is ", header)
  return (
    <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon">next month</div>
        </div>
        <div className="col col-center">
          <span>{header}</span>
        </div>
        <div className="col col-end">
          <div className="icon">next month</div>
        </div>
    </div>
  );
}

export default CalHeader;