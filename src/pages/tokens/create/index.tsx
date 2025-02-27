import { useState } from "react";
import { useToken } from "../../../hooks/useToken";
import { toast } from "react-toastify";
import ImageUploader from "../../../components/ui/ImageUploader";
import Spinner from "../../../components/ui/Spinner";
import usePin from "../../../hooks/usePin";
import PinInput from "../../../components/Pin";

const CreateToken = () => {
  const { createToken, loading } = useToken();
  const [formData, setFormData] = useState({
    quantity: "",
    name: "",
    symbol: "",
    description: "",
    price: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const { togglePinPrompt, visible } = usePin();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    if (
      !formData.quantity ||
      parseInt(formData.quantity) <= 0 ||
      !formData.symbol ||
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !uploadedImage
    ) {
      toast.error("Please fill out all fields.");
      return;
    }
    togglePinPrompt();
  };

  const handleCreateToken = async (pin: string) => {
    try {
      togglePinPrompt();
      await createToken(pin, formData, uploadedImage);
    } catch (error: any) {
      console.error("Error creating token:", error);
      toast.error(`Failed to create token: ${error.message}`);
    }
  };

  const handleImageChange = (file: any) => {
    setUploadedImage(file);
  };

  return (
    <>
      {!visible && (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">SPL Token Creator</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Token Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="e.g., Galaxy Token"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Token Symbol:</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="e.g., GLXY"
                maxLength={5}
              />
              <p className="text-xs text-gray-400 mt-1">Max 5 characters, typically all caps</p>
            </div>

            <div>
              <label className="block text-sm mb-1">Quantity to Mint:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="e.g., 1000000"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Price in SOL:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="e.g., 0.01"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Token Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                placeholder="Describe your token's purpose, use case, etc."
                rows={3}
              />
            </div>

            <ImageUploader
              onImageChange={handleImageChange}
              label="Token Image"
              helperText="Recommended: 200x200px PNG or JPG"
              required={true}
              size="md"
            />
            <Spinner visible={loading} />
            <button
              onClick={handleFormSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Token..." : "Create & Mint Token"}
            </button>
          </div>
        </div>
      )}
      <PinInput visible={visible} onConfirm={handleCreateToken} confirm />
    </>
  );
};

export default CreateToken;
