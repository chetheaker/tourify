import './SuccessPage.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authenticateCheckoutSession } from '../../Utils/CheckoutService';
import Loading from '../Loading/Loading';
import { Button } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

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
      <div className="success-container">
        <div className="loader">
          <svg className="car" width="102" height="40">
            <g
              transform="translate(2 1)"
              stroke="#002742"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="car__body"
                d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
                strokeWidth="3"
              />
              <ellipse
                className="car__wheel--left"
                strokeWidth="3.2"
                fill="#c6f6e5"
                cx="83.493"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <ellipse
                className="car__wheel--right"
                strokeWidth="3.2"
                fill="#c6f6e5"
                cx="46.511"
                cy="30.25"
                rx="6.922"
                ry="6.808"
              />
              <path
                className="car__line car__line--top"
                d="M22.5 16.5H2.475"
                strokeWidth="3"
              />
              <path
                className="car__line car__line--middle"
                d="M20.5 23.5H.4755"
                strokeWidth="3"
              />
              <path
                className="car__line car__line--bottom"
                d="M25.5 9.5h-19"
                strokeWidth="3"
              />
            </g>
          </svg>
        </div>
        <h1 className="success">Success!</h1>
        <h2 className="tag">Congratulations, you are now a pro member!</h2>
        <Button
          colorScheme="green"
          onClick={() => navigate(`/dashboard?session_id=${session_id}`)}
        >
          <BsFillArrowRightCircleFill />
          <span>Go to Dashboard</span>
        </Button>
      </div>
    </div>
  );
}

export default SuccessPage;
