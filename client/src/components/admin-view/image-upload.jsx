import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setimageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    const selectedFiles = event.target.files?.[0];
    if (selectedFiles) setImageFile(selectedFiles);
  };
  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const uploadImageToCloudinary = async () => {
    setimageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      console.log(uploadedImageUrl, "Uploaded image URL");
      setimageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  className="border-2 border-dashed rounded-lg p-4"
>
  {!imageFile && isEditMode && uploadedImageUrl ? (
    <div className="flex flex-col items-center">
      <img
        src={uploadedImageUrl}
        alt="Current Product"
        className="h-32 mb-2 rounded-lg"
      />
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={handleRemoveImage}
      >
        <XIcon className="w-4 h-4" />
        <span className="sr-only">Remove File</span>
      </Button>
    </div>
  ) : !imageFile ? (
    <Label
      htmlFor="image-upload"
      className="flex flex-col items-center justify-center h-32 cursor-pointer"
    >
      <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
      <span>Drag & drop or click to upload image</span>
    </Label>
  ) : imageLoadingState ? (
    <Skeleton className="h-10 bg-gray-100" />
  ) : (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <FileIcon className="w-8 text-primary mr-2 h-8" />
      </div>
      <p className="text-sm font-medium">{imageFile.name}</p>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={handleRemoveImage}
      >
        <XIcon className="w-4 h-4" />
        <span className="sr-only">Remove File</span>
      </Button>
    </div>
  )}
  <Input
    id="image-upload"
    type="file"
    className="hidden"
    ref={inputRef}
    onChange={handleImageFileChange}
  />
</div> 
    </div>
  );
}

export default ProductImageUpload;
