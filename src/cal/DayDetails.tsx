export interface Props {
    data: string;
}

const DayDetails = (props: Props) => {
    return <div>{props.data}</div>;
  };


export default DayDetails;