import React, {useState} from "react";
import Button from "../components/Button";
import Dropzone from "../components/Dropzone";

export default function Form() {
  // state data
  const [imgFile, setImgFile] = useState(null);
  return (
    <>
      <div className="flex flex-col gap-3 p-6 rounded-lg shadow-lg min-w-0 max-w-3xl">
        <h1 className="font-montserrat not-italic font-bold text-xl leading-7 tracking-default text-neutralDark">
          Upload Bukti Pembayaran
        </h1>
        <Dropzone setImgFile={setImgFile} />
        <div className="flex justify-between">
          <Button navigationType="button" type="secondary">
            <div className="font-inter font-bold text-base leading-default text-center tracking-default text-neutralDark">
              Cancel
            </div>
          </Button>
          <Button
            isDisabled={!imgFile}
            navigationType="button"
            type="primary"
            identifierTitle={
              imgFile
                ? "Upload file"
                : "Can't upload before any file is selected"
            }
          >
            <div className="font-inter font-bold text-base leading-default text-center tracking-default">
              Upload
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
