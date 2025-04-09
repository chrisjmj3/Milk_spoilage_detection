// import { useState } from "react";
// import "../App.css"; // Ensure correct path
// import defaultImage from "./image/image1.jpeg"; // Import default image

// function UploadForm() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [result, setResult] = useState(""); // State to hold result

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file); // Create preview URL
//       setSelectedImage(imageUrl); // Set image preview
//       setResult(""); // Reset result when a new image is uploaded
//     }
//   };
  

//   const handleSubmit = async () => {
//     if (!selectedImage) {
//       alert("Please select an image first.");
//       return;
//     }
  
//     const formData = new FormData();
//     console.log(document.getElementById("file-upload").files[0])
//     formData.append("image", document.getElementById("file-upload").files[0]);
  
//     try {
//       const response = await fetch("http://127.0.0.1:5000/upload", {
//         method: "POST",
//         body: formData,
//         headers : {
//           // 'Content-Type': 'multipart/form-data',
//         } 
//       });
  
//       const data = await response.json();
      
//       if (data.error) {
//         setResult("Error: " + data.error);
//       } else {
//         setResult(!data.result? "❌ Milk is Spoiled" : "✅ Milk is Fresh");
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//       setResult("Error processing image");
//     }
//   };
  

//   return (
//     <div className="container">
//       <h1 className="title">SPOILED MILK?</h1>
//       <div className="hero">
//         <div className="card">
//           {/* Default image is shown initially, replaced when an image is selected */}
//           <img src={selectedImage || defaultImage} alt="Profile" id="profile" />

//           {/* File Input for Image Selection */}
//           <input id="file-upload" type="file" name = "image" accept="image/jpeg,image/png,image/jpg" onChange={handleImageUpload} hidden />

//           {/* Single Button - Acts as "Choose Image" initially, then changes to "Submit" */}
//           <button className="upload-btn" onClick={selectedImage ? handleSubmit : () => document.getElementById('file-upload').click()}>
//             {selectedImage ? "Submit" : "Choose Image"}
//           </button>

//           {/* Display Result Below */}
//           {result && <h2 className={result.includes("Spoiled") ? "spoiled-text" : "fresh-text"}>{result}</h2>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadForm;



import { useState } from "react";
import "../App.css"; // Ensure correct path
import defaultImage from "./image/image1.jpeg"; // Import default image

function UploadForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(""); // State to hold result

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create preview URL
      setSelectedImage(imageUrl); // Set image preview
      setResult(""); // Reset result when a new image is uploaded
    }
  };

  // const handleSubmit = async () => {
  //   if (!selectedImage) {
  //     alert("Please select an image first.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   console.log(document.getElementById("file-upload").files[0]);
  //   formData.append("image", document.getElementById("file-upload").files[0]);

  //   // try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //       // mode: 'no-cors'
  //     });

  //     console.log(response)

  //     const data = await response.json();

  //       // Use the freshness message from the backend response
  //       console.log(data)
  //       setResult(
  //         data.result === "fresh milk"
  //           ? "✅ Milk is Fresh"
  //           : data.data.freshness === "spoiling"
  //           ? "⚠️ Milk is Spoiling"
  //           : "❌ Milk is Spoiled"
  //       );
      
  //   // } catch (error) {
  //   //   console.error("Error processing image:", error);
  //   //   setResult("Error processing image");
  //   // }
  // };


  const handleSubmit = async () => {
    if (!selectedImage) {
        alert("Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("image", document.getElementById("file-upload").files[0]);

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        console.log("Response status:", response.status);

        // If response is not OK, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();  // Read response as text first
        console.log("Raw response:", text);

        if (!text) {
            throw new Error("Empty response body");
        }

        const data = JSON.parse(text); // Convert to JSON manually
        console.log("Parsed JSON:", data);

        setResult(
            data.result === "fresh milk"
                ? "✅ Milk is Fresh"
                : data.result === "spoiled"
                ? "⚠️ Milk is Spoiled"
                : "❌  Milk is Spoiling"
        );
    } catch (error) {
        console.error("Error processing image:", error);
        setResult("Error processing image");
    }
};




  return (
    <div className="container">
      <h1 className="title">SPOILED MILK?</h1>
      <div className="hero">
        <div className="card">
          {/* Default image is shown initially, replaced when an image is selected */}
          <img src={selectedImage || defaultImage} alt="Profile" id="profile" />

          {/* File Input for Image Selection */}
          <input id="file-upload" type="file" name="image" accept="image/jpeg,image/png,image/jpg" onChange={handleImageUpload} hidden />

          {/* Single Button - Acts as "Choose Image" initially, then changes to "Submit" */}
          <button className="upload-btn" onClick={selectedImage ? handleSubmit : () => document.getElementById('file-upload').click()}>
            {selectedImage ? "Submit" : "Choose Image"}
          </button>

          {/* Display Result Below */}
          {result && <h2 className={result.includes("Spoiled") ? "spoiled-text" : "fresh-text"}>{result}</h2>}
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
