import MainPage from '../pages/main';

type AppProps = {
  CountRentOffers:number;
}

function App ({CountRentOffers}: AppProps) {
  return (
    <MainPage CountRentOffers={CountRentOffers}/>
  );
}

export default App;
