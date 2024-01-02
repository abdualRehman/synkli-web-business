import React, { useEffect } from "react";
import { PLACES_API_KEY } from "utills/globalVars";

export const PickAddress = ({ onSelect, setAddress, address }) => {
  const apiKey = PLACES_API_KEY;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const input = document.getElementById("autocomplete");
      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ["geocode"],
        strictBounds: true,
      });

      // Set a listener for when the autocomplete field is focused
      input?.addEventListener("focus", () => {
        // Style the dropdown here
        const dropdownContainer = document.querySelector(".pac-container");

        dropdownContainer.style.borderRadius = "0.5rem";
        dropdownContainer.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.1)";
        if (dropdownContainer) {
          dropdownContainer.style.borderRadius = "0.5rem";
          dropdownContainer.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.1)";
          // Add more styles as needed
        }
      });

      // Set component restrictions to Australia
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input: "Australia",
          types: ["(regions)"],
          componentRestrictions: { country: "au" },
          fields: ["address_components", "geometry", "icon", "name"],
        },
        (predictions, status) => {
          if (status === "OK" && predictions && predictions.length > 0) {
            // Use the first prediction to set bounds for autocomplete
            const firstPrediction = predictions[0];

            if (firstPrediction.geometry && firstPrediction.geometry.viewport) {
              const bounds = new window.google.maps.LatLngBounds(
                firstPrediction.geometry.viewport.getSouthWest(),
                firstPrediction.geometry.viewport.getNorthEast()
              );

              autocomplete.setBounds(bounds);
            }
          }
        }
      );

      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        if (onSelect) {
          onSelect(place);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, onSelect]);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  //   script.async = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     const autocompleteService =
  //       new window.google.maps.places.AutocompleteService();
  //     const input = document.getElementById("autocomplete");
  //     const autocomplete = new window.google.maps.places.Autocomplete(input);

  //     // Set a listener for when the autocomplete field is focused
  //     input.addEventListener("focus", () => {
  //       // Style the dropdown here
  //       const dropdownContainer = document.querySelector(".pac-container");

  //       dropdownContainer.style.borderRadius = "0.5rem";
  //       dropdownContainer.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.1)";
  //       if (dropdownContainer) {
  //         dropdownContainer.style.borderRadius = "0.5rem";
  //         dropdownContainer.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.1)";
  //         // Add more styles as needed
  //       }
  //     });

  //     autocomplete.addListener("place_changed", function () {
  //       const place = autocomplete.getPlace();

  //       if (onSelect) {
  //         onSelect(place);
  //       }
  //     });
  //   };

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, [apiKey, onSelect]);

  return (
    <div>
      {" "}
      <div className="mt-1 add-ann-form">
        <label htmlFor="autocomplete">Address</label>
        <input
          value={address}
          type="text"
          id="autocomplete"
          placeholder="Start typing..."
          className="px-3"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  );
};
