import './SuccessPage.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authenticateCheckoutSession } from '../../Utils/CheckoutService';
import Loading from '../Loading/Loading';

function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatePurchase = async () => {
      const res = await authenticateCheckoutSession(session_id);
      if (!res.authenticated) navigate('/dashboard');
      setIsLoading(false);
    };
    authenticatePurchase();
  }, [session_id, navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h1>SUCCESS</h1>
    </div>
  );
}

export default SuccessPage;
