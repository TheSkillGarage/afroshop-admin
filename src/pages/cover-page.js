import React from "react";
import { PageLayout } from "../components";
import { useSelector } from "react-redux";
import Cover from "../components/cover-page";
import ErrorScreen from "../components/error-screen";
import { BeatLoader } from "react-spinners";

const CoverPage = () => {
    const stores = useSelector(state => state.stores);
    const loading = useSelector(state => state.loading);

    if (loading?.stores) {
        return (
            <div className="fixed inset-0 bg-[#D3D3D3] bg-opacity-25 z-[100] flex justify-center items-center h-screen">
                <div className="mt-[250px] w-full flex justify-center items-center">
                    <BeatLoader
                        color={"#186F3D"}
                        loading={true}
                        size={25}
                        speedMultiplier={1}
                    />
                </div>
            </div>
        )
    }

    return (
        <PageLayout pageName="CoverPage">
            {
                !(Array.isArray(stores) && stores.status !== 404) ?
                    <ErrorScreen />
                    :
                    <Cover />
            }
        </PageLayout>
    );
};

export default CoverPage;
