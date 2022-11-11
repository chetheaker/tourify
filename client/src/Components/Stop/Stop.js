import './Stop.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';

function Stop({ stop, isEdit }) {
  return (
    <div className="stop">
      <div className="left">
        <GrLocation />
        <h1>{stop.stop}</h1>
      </div>
      <AiOutlineDelete className={`${isEdit ? 'show' : 'hide'}`} />
    </div>
  );
}

export default Stop;
