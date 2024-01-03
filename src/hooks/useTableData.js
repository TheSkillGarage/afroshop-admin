import Detail from "../components/products/details";
import Checkbox from "../components/shared/checkbox";
import StatusPills from "../components/status-pills";
import { EyeIcon } from "../images";
import useTableSelect from "./useTableSelect";


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
                        value={selectedRows.length === data.length ? "all" : ""}
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


    const results = data.map((data) => ({
        ...data,
        id: data.id,
        selection: (
            <Checkbox
                name={`checkbox_${data.id}`}

                handleChange={(payload) => {
                    handleSelectRow(data.id);
                }}
                value={selectedRows.includes(data.id) ? data.id : ""}
                valueOnChecked={data.id}
            />
        ),
        status: (
            <div className="capitalize">
                <StatusPills status={data.status} name={name} />
            </div>
        ),
        detail: name === "orders" ? (
            <EyeIcon
                className="cursor-pointer"
                onClick={() => func(data.orderID)}
            />
        ) : (
            <Detail name={name} goToEdit={func} sku={data.SKU} />
        ),
    }));

    return {
        headers,
        results
    }

};

export default useTableData;