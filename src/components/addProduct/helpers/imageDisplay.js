import { Delete } from "../../../images";

export const ImageDisplay = ({ selectedFiles, onDelete }) => {
    return (
      <div className="flex flex-wrap gap-[12px]">
        {selectedFiles.map((file, index) => (
          <div  key={index} className="flex gap-[12px]">
            <div className="mb-4 relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Selected ${index + 1}`}
                className="w-[120px] h-[120px]"
              />
            </div>
            <div>
              <img src={Delete} onClick={() => onDelete(index)} />
            </div>
          </div>
        ))}
      </div>
    );
  };