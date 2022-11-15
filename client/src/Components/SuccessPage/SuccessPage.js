import './SuccessPage.css';
import { useSearchParams } from 'react-router-dom';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  console.log(session_id);
  return (
    <div className="container">
      <h1>SUCCESS</h1>
    </div>
  );
}

export default SuccessPage;
