import { Delete } from "../../../images";

export const ImageDisplay = ({ selectedFiles, onDelete }) => {
    return (
      <div className="flex flex-wrap gap-[12px]">
        {selectedFiles.map((file, index) => (
          <div className="flex gap-[12px]" key={index}>
            <div key={index} className="mb-4 relative">
              <img
                src={(file instanceof File) ? URL.createObjectURL(file) : file}
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