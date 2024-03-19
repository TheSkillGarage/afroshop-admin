import { Delete } from "../../../images";
import { renderValidUrl } from "../../../utils/constants";

export const ImageDisplay = ({ selectedFiles, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-8 pt-4">
      {selectedFiles.map((file, index) => {
        return (
          <div className="flex gap-[12px]" key={index}>
            <div key={index} className="mb-4 relative">
              <img
                src={renderValidUrl(file.url)}
                alt={`Selected ${index + 1}`}
                className="w-[120px] h-[120px]"
              />
            </div>
            <div>
              <img src={Delete} alt="delete" onClick={() => onDelete(index)} className="cursor-pointer" />
            </div>
          </div>
        )
      })}
    </div>
  );
};
