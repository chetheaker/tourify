import './ExploreTripPreview.css';

function ExploreTripPreview({ size, stopScroll, startScroll }) {
  return (
    <div
      className="explore-trip-preview"
      style={styles[size]}
      onMouseEnter={stopScroll}
      onMouseLeave={startScroll}
    >
      <h1>EXPLORE TRIP NAME</h1>
    </div>
  );
}

const styles = {
  small: {
    gridRowEnd: 'span 18'
  },
  medium: {
    gridRowEnd: 'span 22'
  },
  large: {
    gridRowEnd: 'span 26'
  }
};

export default ExploreTripPreview;
