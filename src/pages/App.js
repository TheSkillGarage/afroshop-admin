import { PageLayout } from "../components";
import { AfroshopLogo } from "../images";

function App() {
  return (
    <PageLayout>
      <div>
        <img src={AfroshopLogo} alt="logo"/>
        home page
      </div>
    </PageLayout>
  );
}

export default App;
