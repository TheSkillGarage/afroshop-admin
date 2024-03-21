import { useDispatch, useSelector } from "react-redux";
import { PageLayout } from "../components";
import Overview from "../components/overview";
import { useEffect } from "react";
import { getStoreByUser, getUserAddress } from "../redux/action";
import { getTokenFromCookie } from "../utils";


function OverviewPage() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const token = getTokenFromCookie();

  useEffect(() => {
    dispatch(getStoreByUser(user?.id, token));
    dispatch(getUserAddress(token))
  }, []);
  
  return (
    <PageLayout>
      <Overview />
    </PageLayout>
  );
}

export default OverviewPage;
