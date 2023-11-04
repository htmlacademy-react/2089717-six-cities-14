import { Helmet } from 'react-helmet-async';

function ErrorPage () {
  return(
    <div>
      <Helmet>
        <title>6 cities - Error</title>
      </Helmet>
      <h1>Error</h1>
      <h2>404 Not Found</h2>
    </div>
  );
}

export default ErrorPage;
