export interface Props {
    data: string;
}

const CalHeader = (props: Props) => {
      return (
        <div className="header row flex-middle">
            <div className="col col-start">
              {/* <div className="icon" onClick={() => changeMonthHandler("next")}>next month</div> */}

            <div className="col col-center">
              <span>{props.data}</span>
            </div>
            <div className="col col-end">
              {/* <div className="icon" onClick={() => changeMonthHandler("next")}>next month</div> */}
            </div>
        </div>
        </div>     
      );
}

export default CalHeader;