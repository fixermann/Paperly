import { Dispatch, SetStateAction, useState, useRef } from "react";
import React from "react";

type CoverImageProps = {
    setImage: Dispatch<SetStateAction<File>>;
};
  
export function CoverImage({ setImage }: CoverImageProps) {
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInput = useRef(null);

    const handleFile = (file: any) => {
        //you can carry out any file validations here...
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleOnDragOver = (event: any) => {
        event.preventDefault();
    };
    const handleOnDrop = (event: any) => {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    };

    return (
        <div className="wrapper w-[720px] h-[360px] bg-green-900 rounded-2xl overflow-hidden relative">
        <div
            className="drop_zone px-4 py-4 flex flex-row justify-end absolute z-10 top-0 right-0"
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
            onClick={() => fileInput.current.click()}
        >
            {/* <p>Drag and drop image here....</p> */}
            <span className="material-icons self-center bg-white-100 p-2 cursor-pointer rounded-full">
            edit
            </span>
            <input
            type="file"
            accept="image/*"
            ref={fileInput}
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
        {previewUrl && (
            <img
            src={previewUrl}
            alt="image"
            className="w-full h-full absolute top-0"
            />
        )}
        </div>
    );
}