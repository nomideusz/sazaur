export async function fetchAdsForCategories(fetch, category) {
  try {
    const response = await fetch(`api?category=${category}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok.`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data for ${category}: ${error.message}`);
  }
}



// export async function fetchAdsForCategories(fetch, ...categories) {
//   try {
//     const fetchPromises = categories.map(category =>
//       fetch(`./api/?category=${category}`).then(response => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok for category: ${category}`);
//         }
//         return response.json();
//       })
//     );

//     const results = await Promise.all(fetchPromises);
    
//     return categories.reduce((acc, category, index) => {
//       acc[category] = results[index];
//       return acc;
//     }, {});
    
//   } catch (error) {
//     throw new Error(`Error fetching data: ${error.message}`);
//   }
// }
