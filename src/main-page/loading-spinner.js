import { Grid } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="text-white bg-dark">
      <div className="container">
        <div className="App">
          <header className="pt-5 h5" testid="loading-text">
            Loading data
          </header>
          <div className="spinner" testid="loading-spinner">
            <Grid type="ThreeDots" color="#fff" height="100" width="100" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoadingSpinner;
