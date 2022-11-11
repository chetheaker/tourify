import './Stop.css';
import { GrLocation } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';

function Stop({ setStops, stop, isEdit }) {
  const deleteStop = () => {
    setStops((prev) => prev.filter((s) => s.id !== stop.id));
  };

  return (
    <div className="stop">
      <div className="left">
        <GrLocation />
        <h1>{stop.stop}</h1>
      </div>
      <AiOutlineDelete
        className={`${isEdit ? 'show' : 'hide'}`}
        onClick={deleteStop}
      />
    </div>
  );
}

export default Stop;
