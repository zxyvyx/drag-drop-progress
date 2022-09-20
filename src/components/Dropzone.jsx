import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react";
import {ReactComponent as Image} from "../assets/image-icon.svg";
import {ReactComponent as Close} from "../assets/close-icon.svg";
import Button from "./Button";

export default function Dropzone({setImgFile}) {
  // state functional
  const [dragActive, setDragActive] = useState(false);
  // state data
  const [tempImgFile, setTempImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  // refs
  const inputRef = useRef();
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files, e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    handleFile(e.target.files, e.target.files[0]);
  };

  const handleFile = (files, file) => {
    if (files && file) {
      if (file.type.match(/image\/(jpg|jpeg|png|pjp|pjpeg|jfif)/i)) {
        if (file.size < 5000000) {
          setTempImgFile(files && file);
          setImgFile(file);
        } else {
          alert("File size is too large");
        }
      } else {
        alert("File yang diupload harus berupa gambar jpg atau png");
      }
    } else {
      alert("Mohon pilih file gambar");
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (tempImgFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const {result} = e.target;
        if (result && !isCancel) {
          setImgFileUrl(result);
        }
      };
      fileReader.readAsDataURL(tempImgFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [tempImgFile]);

  return (
    <>
      {!imgFileUrl ? (
        <form
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
          className="relative"
        >
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            id="inputImage"
            accept="image/jpg, image/jpeg, image/png"
            name="Upload File Bukti Pembayaran"
            title="Upload File Bukti Pembayaran"
            placeholder="Upload File Bukti Pembayaran"
            ref={inputRef}
          />
          <label htmlFor="inputImage">
            <div className="flex flex-col gap-8 items-center justify-center bg-white border border-dashed border-primaryDefault rounded-lg py-20 px-24 sm:px-32 md:px-40">
              <div className="flex flex-col items-center gap-4">
                <div className="border border-dashed border-primaryDefault p-2 rounded-lg">
                  <Image className="text-5xl text-primaryDefault" />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="font-inter not-italic font-normal text-base leading-default text-center tracking-default text-neutralDark">
                    Drag and drop here to upload your image
                  </div>
                  <div className="font-inter not-italic font-normal text-sm text-center leading-5 tracking-default text-neutralDefault">
                    You only can upload jpg or png file (max 5 MB)
                  </div>
                </div>
              </div>
              <Button
                navigationType="button"
                type="secondary"
                click={() => inputRef.current.click()}
              >
                <div className="font-inter font-bold text-sm leading-5 text-center tracking-default text-neutralDark">
                  Or select file
                </div>
              </Button>
            </div>
          </label>
          {dragActive && (
            <div
              className={`absolute inset-0 rounded-lg w-full h-full ${
                dragActive ? "bg-white opacity-50" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      ) : (
        <div
          className="flex flex-col gap-8 items-center justify-center bg-neutralLight border border-dashed border-primaryDefault rounded-lg py-20 px-24 sm:px-32 md:px-40 relative"
          onDragEnter={handleDrag}
        >
          <div className="relative">
            <img src={imgFileUrl} alt="preview" />
            <button
              onClick={() => {
                setTempImgFile(null);
                setImgFile(null);
                setImgFileUrl(null);
              }}
              className="absolute -top-2 -right-2 bg-neutralDefault p-1 rounded-full"
            >
              <Close className="text-xs text-white" />
            </button>
          </div>
          {dragActive && (
            <div
              className="absolute inset-0 rounded-lg bg-white bg-opacity-80 flex justify-center items-center"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
              }}
            >
              <div className="text-neutralDark font-bold text-base not-italic">
                Clear image before update
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
