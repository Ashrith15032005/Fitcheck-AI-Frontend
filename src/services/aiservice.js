export async function generateVirtualTryOn(userPhoto, productImage) {
  await new Promise((res) => setTimeout(res, 1200)); // demo delay

  return {
    baseImage: userPhoto,
    overlayImage: productImage, // 👈 important
    analysis: {
      fitAnalysis:
        "The selected outfit complements your proportions and gives a sharp, modern silhouette.",
      stylingTips: [
        "Ensure the shoulders fit snugly for a clean look",
        "Pair with tailored trousers for balance",
        "Keep accessories minimal to highlight the outfit"
      ],
      complementaryItems: [
        "Slim-fit dark trousers",
        "Classic stainless steel wristwatch",
        "Black formal shoes"
      ],
      occasions: ["Office presentation", "Formal meeting", "Evening dinner"],
      confidence: 9
    }
  };
}
