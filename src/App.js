import React, { useState } from "react";

// Components
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import UploadSection from "./components/UploadSection";
import ResultSection from "./components/ResultSection";
import GenerateButton from "./components/GenerateButton";

// Demo AI Service
import { generateVirtualTryOn } from "./services/aiservice";

// Styles
import "./App.css";

function App() {
  const [userPhoto, setUserPhoto] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productUrl, setProductUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleGenerateTryOn = async () => {
    console.log("Generate button clicked");

    if (!userPhoto || !productImage) {
      alert("Please upload both your photo and a product image!");
      return;
    }

    setIsProcessing(true);

    try {
      const tryOnResult = await generateVirtualTryOn(
        userPhoto,
        productImage
      );
      setResult(tryOnResult);
    } catch (error) {
      console.error("Error generating virtual try-on:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const canGenerate = userPhoto && productImage && !isProcessing;

  return (
    <div className="app">
      <Header />

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResult={!!result}
      />

      {/* Upload Section */}
      {!result && (
        <UploadSection
          userPhoto={userPhoto}
          setUserPhoto={setUserPhoto}
          productImage={productImage}
          setProductImage={setProductImage}
          productUrl={productUrl}
          setProductUrl={setProductUrl}
          isProcessing={isProcessing}
        />
      )}

      {/* Generate Button */}
      {!result && canGenerate && (
        <GenerateButton
          onClick={handleGenerateTryOn}
          isProcessing={isProcessing}
        />
      )}

      {/* Result Section */}
      {result && <ResultSection result={result} />}
    </div>
  );
}

export default App;
