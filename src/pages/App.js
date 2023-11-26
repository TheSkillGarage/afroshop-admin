import { PageLayout } from "../components";
import { AfroshopLogo } from "../images";
import  ProductImage from '../components/ProductImage'
import Overview from "../components/overview";


function OverviewPage() {
  return (
    <PageLayout>
      <div>
        <AfroshopLogo/>
        home page
      </div>
       
      <Overview />
    </PageLayout>
  );
}

export default OverviewPage;
