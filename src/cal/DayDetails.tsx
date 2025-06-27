import { useSelector } from 'react-redux'

const DayDetails = () => {
  const selectedDate = useSelector((state: any) => state.selectedDate.value)
    return <div>daydetails</div>;
  };


export default DayDetails;