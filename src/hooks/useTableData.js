import Detail from "../components/products/details";
import Checkbox from "../components/shared/checkbox";
import StatusPills from "../components/status-pills";
import { EyeIcon } from "../images";
import useTableSelect from "./useTableSelect";


/**
 * @description useTableData Hook
 * @param {string} name : name of table e.g orders, products, etc.
 * @param {array} headersArray : Array of table headers, should be same casing as object key e.g "productName" => "product Name".
 * @param {array} data : Array of objects representing each table row.
 * @param {function} func : Function associated with detail icons.
 * @returns headers: Array of table headers
 * @returns result: Array of objects representing each table row plus detail and checkbox.
 * @returns handleSelectAllItems: a function that performs all rows selection
 */


export const useTableData = (name, headersArray, data, func) => {

    const { selectedRows, handleSelectAllRows, handleSelectRow } = useTableSelect(
        { rows: data }
    );

    const headers = headersArray.map(header => {
        if (header === 'selection') {
            return {
                id: header,
                name: (
                    <Checkbox
                        name="all"
                        handleChange={handleSelectAllRows}
                        value={selectedRows?.length === data?.length ? "all" : ""}
                        valueOnChecked="all"
                    />
                ),
            };
        } else if (header === "detail") {
            return {
                id: header,
                name: ""
            }
        }
        else {
            return {
                id: header.replace(" ", ""),
                name: header,
            };
        }
    });


    const results = data?.map((data) => ({
        ...data,
        id: data.id,
        selection: (
            <Checkbox
                name={`checkbox_${data.id}`}

                handleChange={(payload) => {
                    handleSelectRow(data.id);
                }}
                value={selectedRows?.includes(data.id) ? data.id : ""}
                valueOnChecked={data.id}
            />
        ),
        status: (
            <div className="capitalize">
                <StatusPills status={data.status} name={name} id={data.id} deliveryOption={data.deliveryOption}/>
            </div>
        ),
        detail: name === "orders" ? (
            <EyeIcon
                className="ml-4 cursor-pointer"
                onClick={() => func(data.orderID)}
            />
        ) 
        : name === "roles" ? (
            <Detail name={name} id={data.id} goToEdit={func} param={name === "roles" ? data : data.SKU} user={data} />
        )
        : null,
    }));

    return {
        headers,
        results
    }

};

export default useTableData;