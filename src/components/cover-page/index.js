import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/shared/button";
import { useNavigate } from "react-router-dom";
import { setStoreExistStatus, setStoreID } from "../../redux/action";
import { SearchIcon } from "../../images";
import StoreCard from "./card";

const Cover = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNewStore = (e) => {
        e.stopPropagation();
        dispatch(setStoreID(-1));
        dispatch(setStoreExistStatus(false));
        navigate("/profile");
    };

    const stores = useSelector((state) => state.stores);

    const [storeList, setStores] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (Array.isArray(stores) && stores.status !== 404) {
            const filteredStores = stores.filter((store) =>
                store.name.toLowerCase().includes(filter.toLowerCase())
            );
            setStores(filteredStores);
        } else {
            setStores([]);
        }
    }, [stores, filter]);

    const handleFilter = (e) => {
        e.stopPropagation();
        setFilter(e.target.value);
    };

    const renderStoreMessage = () => {
        if (storeList.length === 0) {
            if (filter) {
                return (
                    <div className="h-[40%] w-full flex flex-col justify-center items-center text-center">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold my-6">
                            We couldn't find the store you're looking for.
                        </p>
                        <p className="text-[#333333] w-[491px]">
                            It's easy to create new stores. Add a new store and let Afroshop help you take your products to the world.
                        </p>
                    </div>
                );
            } else {
                return (
                    <div className="h-[40%] w-full flex flex-col justify-center items-center text-center">
                        <p className="text-[20px] leading-[32px] text-[#186F3D] font-bold my-6">
                            You don't have any stores yet!
                        </p>
                        <p className="text-[#333333] w-[491px]">
                            It's easy to get started. Add a new store and let Afroshop help you take your products to the world.
                        </p>
                    </div>
                );
            }
        }
        return null; // If stores exist, it will render the list
    };

    return (
        <div className="max-w-[1300px] w-full h-full mt-[48px] p-2 flex flex-col gap-10 mx-auto min-h-[575px]">
            <Button variant="primary" className="ml-auto" onClick={handleNewStore}>
                Add a New Store
            </Button>

            <form className="w-[514px] relative">
                <SearchIcon className="absolute top-[10px] left-[18px]" />
                <input
                    type="text"
                    name="search"
                    placeholder="Text"
                    className="bg-[#F2F2F2] w-full h-[45px] rounded-[30px] text-[#999999] px-12 focus:outline-none"
                    value={filter}
                    onChange={handleFilter}
                />
            </form>

            {renderStoreMessage()}

            <div className="mx-auto">
                {storeList.length > 0 && (
                    <div className="w-full flex flex-wrap gap-[32px]">
                        {storeList.map((store, index) => (
                            <StoreCard key={store.id} store={store} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cover;
